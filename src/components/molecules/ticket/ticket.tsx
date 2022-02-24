import React, { ReactElement } from "react";
import { Hexagon, Icon, IconTicketCategorie, Title } from "../../atoms";
import { ITicket } from "../../../interface";
import { getStatusColor } from "../../utils/statusTools";
import { getPriorityColor } from "../../utils/priorityTools";
import { getDateCompletionPercentage, getTimeToNowWithTranslation } from "../../utils/dateTools";
import { ClockLogo, IconTicketClosed, IconTicketSolved, TicketLogo } from "../../../img/svg";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { Status } from "../../../enumeration";
import { useTranslation } from "../../../i18n";

interface Props {
    currentTicket?: ITicket;
    fCallBackClick?: (ticket: ITicket) => void;
    fCallBackHover?: (ticket?: ITicket) => void;
    languageUser?: string;
    ticket?: ITicket;
    ticketBG?: boolean;
}

const Ticket = ({
    currentTicket,
    fCallBackClick,
    fCallBackHover,
    languageUser,
    ticket,
    ticketBG,
}: Props): ReactElement => {
    const { t } = useTranslation();

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
            return isSameStatus() ? "30" : "";
        }
        return "";
    }

    function isTTOorTTRStale(): boolean {
        return (
            getDateCompletionPercentage(
                ticket.date_creation,
                ticket.status === Status.New ? ticket.time_to_own : ticket.time_to_resolve
            ) >= 75 &&
            ticket.status !== Status.Pending &&
            ticket.status !== Status.Solved &&
            ticket.status !== Status.Closed
        );
    }

    return (
        <>
            {ticket ? (
                <div
                    className="useOnClickOutsideException w-40 h-40 cursor-pointer transform hover:scale-105 transition-all duration-75 flex flex-col justify-around text-center items-center isolation-auto"
                    onClick={(): void => fCallBackClick && fCallBackClick(ticket)}
                    onMouseEnter={(): void => fCallBackHover && fCallBackHover(ticket)}
                    onMouseLeave={(): void => fCallBackHover && fCallBackHover()}
                    data-testid="ticket-body"
                >
                    <div className="absolute w-full" style={{ zIndex: 3 }}>
                        {isTTOorTTRStale() && (
                            <div
                                className={`h-5 absolute top-4 right-14 
                                    ${
                                        getDateCompletionPercentage(
                                            ticket.date_creation,
                                            ticket.status === Status.New ? ticket.time_to_own : ticket.time_to_resolve
                                        ) <= 99
                                            ? "text-neo-urgency"
                                            : "text-neo-urgency-major"
                                    }`}
                                data-testid="ticket-tto-ttr-warning"
                            >
                                <div
                                    className="w-2 h-4 bg-white absolute"
                                    style={{ width: 5, height: 14, top: 5, left: 9 }}
                                ></div>
                                <Icon className="text-xl absolute left-0" fontIcon={faExclamationTriangle} />
                            </div>
                        )}

                        <Hexagon
                            isSelected={currentTicket === ticket}
                            strokeColor={ticket.status && getStatusColor(ticket.status, true)}
                        />
                    </div>
                    <div
                        className={`flex flex-col items-center relative w-full 
                        opacity-${getOpacity()}`}
                        style={{ zIndex: 2 }}
                        data-testid="ticket-opacity"
                    >
                        <div className="text-neo-bg-A">
                            <IconTicketCategorie id={ticket.itilcategories_id} />
                            <div className="font-extrabold text-xs">
                                <Title type="h3" data={t("ticket.id") + " " + ticket.id.toString()} />
                            </div>
                        </div>
                        <div
                            className={`text-center text-xs flex items-center justify-center mt-1 mb-3
                            ${
                                (ticket.status === 1 || ticket.status === 2) &&
                                ticket.priority &&
                                getPriorityColor(ticket.priority, false, "bg")
                            }`}
                            style={{ width: 125, height: 45 }}
                        >
                            <p
                                className={`mx-2 text-xxs text-line-2 font-bold 
                                ${ticket.status === 1 || ticket.status === 2 ? "text-white" : "text-neo-bg-A"}`}
                            >
                                {ticket.name}
                            </p>
                        </div>
                        <div>
                            {ticket && ticket.status !== 5 && ticket.status !== 6 && (
                                <div className="text-white text-xxs flex justify-center item-center transform -translate-y-1">
                                    <div className="w-3 h-3 mr-1" style={{ marginTop: 2 }}>
                                        <ClockLogo fill="#fff" />
                                    </div>
                                    <p>
                                        {ticket.date_creation &&
                                            getTimeToNowWithTranslation(ticket.date_creation, languageUser)}
                                    </p>
                                </div>
                            )}
                            {ticket && ticket.status === 5 && (
                                <IconTicketSolved
                                    fill="#152535"
                                    className="w-7 h-7 -mt-3"
                                    data-testid="ticket-icon-solved"
                                />
                            )}
                            {ticket && ticket.status === 6 && (
                                <IconTicketClosed
                                    fill="#152535"
                                    className="w-7 h-7 -mt-3"
                                    data-testid="ticket-icon-closed"
                                />
                            )}
                        </div>
                    </div>
                    {ticket && ticket.status !== 5 && ticket.status !== 6 && (
                        <svg
                            version="1.1"
                            viewBox="-23 140 220 80"
                            className="absolute -bottom-2 opacity-20"
                            style={{ zIndex: 1 }}
                            data-testid="ticket-fill-svg"
                        >
                            <path
                                d="M78.80 4.50Q86.60 0 94 4.50L165.41 45.5Q173.21 50 173.21 59L173.21 141Q173.21 150 165.42 154.5L94.40 195.5Q86.61 200 78.81 195.5L7.80 154.5Q0 150 0 141L0 59Q0 50 7.80 45.5Z"
                                fill="#000"
                                fillOpacity="1"
                                strokeLinejoin="round"
                            ></path>
                        </svg>
                    )}
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
                <div className="w-40 h-40 transform" data-testid="ticket-empty-body">
                    <div className="absolute w-full flex items-center justify-center">
                        <div className="absolute">
                            <TicketLogo fill={ticketBG ? "#152535" : "#15304C"} />
                        </div>
                        <Hexagon bgColor={ticketBG && "#172f4b"} />
                    </div>
                </div>
            )}
        </>
    );
};

export default Ticket;
