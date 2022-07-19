import React, { ReactElement } from "react";
import { Hexagon, IconTicketCategorie, Title } from "../../atoms";
import { Ticket as ITicket, Status, Type, CompactTicket, GridIds } from "@neomanis/neo-types";
import { getStatusColor } from "../../utils/statusTools";
import { getDateCompletionPercentage, getTimeToNowWithTranslation } from "../../utils/dateTools";
import { CautionLogoFull, ClockLogo, IconTicketClosed, IconTicketSolved, TicketLogo } from "../../../img/svg";
import { getTicketTitle, getPriorityColor } from "../../utils/tools";
import { useTranslation } from "@neomanis/neo-translation";

export interface TicketProps {
    currentTicket?: CompactTicket;
    fCallBackClick?: (ticket: ITicket) => void;
    fCallBackHover?: (ticket?: CompactTicket) => void;
    ticket?: ITicket;
    ticketBG?: boolean;
    gridId?: GridIds;
    isOpacity?: boolean;
}

const Ticket = ({
    currentTicket,
    fCallBackClick,
    fCallBackHover,
    ticket,
    ticketBG,
    gridId,
    isOpacity,
}: TicketProps): ReactElement => {
    const { t, i18n } = useTranslation();

    function getOpacity(): string {
        if ((currentTicket && currentTicket.id !== ticket?.id && gridId === currentTicket?.gridId) || isOpacity) {
            return "30";
        }
        return "";
    }

    function isTTOorTTRStale(): boolean {
        return (
            getDateCompletionPercentage(
                ticket.date_creation,
                ticket.status === Status.New ? (ticket as ITicket).time_to_own : ticket.time_to_resolve
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
                    className={`transition-all duration-75 flex flex-col justify-around text-center items-center relative w-[135px] h-[135px] opacity-${getOpacity()}
                        ${!isOpacity ? "cursor-pointer transform hover:scale-105" : ""}`}
                    onClick={(): void => fCallBackClick && !isOpacity && fCallBackClick(ticket)}
                    onMouseEnter={(): void => fCallBackHover && !isOpacity && fCallBackHover({ ...ticket, gridId })}
                    onMouseLeave={(): void => fCallBackHover && !isOpacity && fCallBackHover()}
                    data-testid="ticket-body"
                >
                    <div className="absolute w-full" style={{ zIndex: 3 }}>
                        {ticket.type !== Type["Problem"] && isTTOorTTRStale() && (
                            <div className="h-8 w-8 absolute right-4 top-1" data-testid="ticket-tto-ttr-warning">
                                <CautionLogoFull
                                    width={30}
                                    fill={`${
                                        getDateCompletionPercentage(
                                            ticket.date_creation,
                                            ticket.status === Status.New ? ticket.time_to_own : ticket.time_to_resolve
                                        ) <= 99
                                            ? "#ED943B"
                                            : "#F7284F"
                                    }`}
                                    className="absolute left-0 transform scale-110"
                                />
                            </div>
                        )}
                        <Hexagon
                            isSelected={currentTicket === ticket}
                            strokeColor={ticket.status && getStatusColor(ticket.status, true)}
                        />
                    </div>
                    <div
                        className="flex flex-col items-center justify-center w-full h-full absolute transform -translate-y-1"
                        style={{ zIndex: 2 }}
                        data-testid="ticket-title"
                    >
                        <div className="text-neo-bg-A">
                            <IconTicketCategorie id={ticket.itilcategories_id} className="text-xl" />
                            <div className="font-extrabold text-xs">
                                <Title type="h3" data={getTicketTitle(ticket, t)} />
                            </div>
                        </div>
                        <div
                            className={`text-center flex items-center justify-center mb-2 mt-[6px]
                            ${
                                (ticket.status === 1 || ticket.status === 2) &&
                                ticket.priority &&
                                getPriorityColor(ticket.priority, false, "bg")
                            }`}
                            style={{ width: "95%", height: 45 }}
                        >
                            <p
                                className={`mx-2 line-clamp-3 font-bold text-[11px]
                                ${ticket.status === 1 || ticket.status === 2 ? "text-white" : "text-neo-bg-A"}`}
                                style={{ lineHeight: "13px" }}
                            >
                                {ticket.name}
                            </p>
                        </div>
                        <div>
                            {ticket && ticket.status !== 5 && ticket.status !== 6 && (
                                <div className="flex justify-center item-center">
                                    <div className="w-3 h-3 mr-1 mt-[2px]">
                                        <ClockLogo fill="#fff" />
                                    </div>
                                    <p className="text-xxs text-white font-extrabold">
                                        {ticket.date_creation &&
                                            getTimeToNowWithTranslation(ticket.date_creation, i18n.language)}
                                    </p>
                                </div>
                            )}
                            {ticket && ticket.status === 5 && (
                                <IconTicketSolved
                                    width={25}
                                    fill="#152535"
                                    className="-mt-[10px]"
                                    data-testid="ticket-icon-solved"
                                />
                            )}
                            {ticket && ticket.status === 6 && (
                                <IconTicketClosed
                                    width={25}
                                    fill="#152535"
                                    className="-mt-[10px]"
                                    data-testid="ticket-icon-closed"
                                />
                            )}
                        </div>
                    </div>
                    {ticket && ticket.status !== 5 && ticket.status !== 6 && (
                        <svg
                            version="1.1"
                            viewBox="-3 140 180 80"
                            className="absolute -bottom-[22px] opacity-20"
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
                <div
                    className="absolute w-[135px] h-[135px] flex items-center justify-center"
                    data-testid="ticket-empty-body"
                >
                    <div className="absolute">
                        <TicketLogo width={32} fill={ticketBG ? "#152535" : "#0E3864"} />
                    </div>
                    <Hexagon bgColor={ticketBG && "#172f4b"} />
                </div>
            )}
        </>
    );
};

export default React.memo(Ticket);
