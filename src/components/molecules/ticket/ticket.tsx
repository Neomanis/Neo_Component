import React, { ReactElement, useState, useEffect, useRef } from "react";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { Hexagon, Icon, IconTicketCategorie, Title } from "../../atoms";
import { ITicket } from "../../../interface";
import { getPriorityColor, getStatusColor } from "../../utils/ticketColorSelector";
import { getFormatedTimeToNow } from "../../utils/getFormatedTimeToNow";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import { ReactComponent as TicketLogo } from "../../../img/svg/nm_ico_ticket_normal.svg";

interface Props {
    ticket?: ITicket;
    labelTicket?: string;
    currentTicket?: ITicket;
    iconBG?: IconProp;
    fOverCallBack?: (val: { ticket: ITicket; position: React.RefObject<HTMLHeadingElement> }) => void;
    fOpenModalCurrentTicket?: (ticket: ITicket) => void;
}

const Ticket = ({
    ticket,
    fOverCallBack,
    currentTicket,
    fOpenModalCurrentTicket,
    labelTicket,
    iconBG,
}: Props): ReactElement => {
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
    const ref = useRef<HTMLHeadingElement>(null);

    //settings variable ready

    function onMouseEnterHandler(): void {
        const timeout = setTimeout(() => {
            fOverCallBack && fOverCallBack({ ticket: ticket, position: ref });
        }, 500);
        setTimeoutId(timeout);
    }

    function onMouseLeaveHandler(): void {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
    }

    function isSameStatus(): boolean {
        // currentTicket.status && ticket.status are only here for typescript in the first place
        // currentTicket.id !== ticket.id is checking if current context ticket is different than ticket element
        // we are also checking if showCurrentTicket is true in order to validate that we have selected an item
        if (currentTicket && currentTicket.status && ticket.status && currentTicket.id !== ticket.id) {
            if (currentTicket.status === 1 && ticket.status === 1) {
                // here we check if we are in the inbox grid wich only has status equal 1
                // here we want to check if current ticket status is superior to one to refer only
                // to Inventory tickets
                return true;
            } else if (currentTicket.status > 1 && ticket.status > 1) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }

    function getOpacity(): string {
        // if selected ticket id is different than ticket id we return a string value equal to a number
        // reflecting opacity tailwind value, that will be reused in hexagon as well
        if (currentTicket) {
            return currentTicket.id !== ticket.id && isSameStatus() ? "30" : "";
        }
        return "";
    }

    useEffect(() => {
        return (): void => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    });

    return (
        <>
            {ticket ? (
                <div
                    className="useOnClickOutsideException w-40 h-40 cursor-pointer transform hover:scale-105 transition-all duration-75 flex flex-col justify-around text-center items-center isolation-auto"
                    onClick={(): void => fOpenModalCurrentTicket && fOpenModalCurrentTicket(ticket)}
                    onMouseEnter={(): void => onMouseEnterHandler()}
                    onMouseLeave={(): void => onMouseLeaveHandler()}
                    ref={ref}
                >
                    <div className="absolute w-full" style={{ zIndex: 3 }}>
                        <Hexagon
                            isSelected={currentTicket === ticket}
                            strokeColor={ticket.status && getStatusColor(ticket.status, true)}
                        />
                    </div>
                    <div className={`flex flex-col items-center w-full opacity-${getOpacity()}`} style={{ zIndex: 2 }}>
                        <div className="mx-1">
                            <div className="mx-2">
                                <IconTicketCategorie id={ticket.itilcategories_id} />
                            </div>
                            <div className="font-bold">
                                <Title type="h3" data={labelTicket + " " + ticket.id.toString()} />
                            </div>
                        </div>
                        <div
                            className={`h-8 w-32 text-white text-center text-xs flex items-center justify-center mt-1 mb-2 ${
                                ticket.priority && getPriorityColor(ticket.priority, false)
                            }`}
                        >
                            <p className="truncate mx-2">{ticket.name}</p>
                        </div>
                        <div className="text-white text-center text-sm flex justify-center">
                            <div className="text-base mx-1">
                                <Icon fontIcon={faClock} />
                            </div>
                            <p>{ticket.date_creation && getFormatedTimeToNow(ticket.date_creation)}</p>
                        </div>
                    </div>
                    <div
                        className="absolute"
                        style={{
                            width: "135px",
                            bottom: "13px",
                            left: "13px",
                            borderTop: "40px solid rgba(0,0,0, 0.15)",
                            borderRight: "50px solid transparent",
                            borderLeft: "50px solid transparent",
                            zIndex: 1,
                        }}
                    ></div>
                    <div className="absolute w-full" style={{ zIndex: 0 }}>
                        <Hexagon
                            type="ticket"
                            bgColor={ticket.status && getStatusColor(ticket.status, true)}
                            isSelected={currentTicket === ticket}
                            opacity={getOpacity()}
                        />
                    </div>
                </div>
            ) : (
                <div className="w-40 h-40 transform">
                    <div className="absolute w-full flex items-center justify-center">
                        {iconBG ? (
                            <>
                                <div className="absolute w-16">
                                    <TicketLogo viewBox="0 0 50 50" fill="#152535" />
                                </div>
                                <Hexagon bgColor="#172f4b" />
                            </>
                        ) : (
                            <Hexagon />
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Ticket;
