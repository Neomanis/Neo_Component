import React, { ReactElement, useMemo } from "react";
import { CompactTicket, GridIds, Status, Type, Ticket as ITicket, MembershipInfo } from "@neomanis/neo-types";
import { useTranslation } from "@neomanis/neo-translation";
import { CautionLogoFull, ClockLogo, IconTicketSolved, IconTicketClosed, TicketLogo, IconWatcherBlue } from "@/img/svg";
import { classNames, getContrastBasedOnHexColor, getDisplayedTicketUid, getPriorityColor } from "@/utils/tools";
import { getDateCompletionPercentage, getTimeToNowWithTranslation } from "@/utils/dateTools";
import { getStatusColor } from "@/utils/statusTools";
import NeoColors from "@/utils/neoColors";
import { Hexagon, Icon, Title } from "@/components/atoms";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { motion } from "framer-motion";
export interface TicketProps {
    currentTicket?: CompactTicket;
    fCallBackClick?: (ticket: ITicket) => void;
    ticket?: ITicket & { isPositionLoading?: boolean };
    ticketBG?: boolean;
    gridId?: GridIds;
    isOpacity?: boolean;
    userGroups?: MembershipInfo[];
    userNeoId?: number;
    categoryIcon?: IconProp;
}

function getStatusDataAttribute(ticketStatus: number) {
    return (
        Status[ticketStatus] === Status[Status.Planned] ? Status[Status.Assigned] : Status[ticketStatus]
    ).toLowerCase();
}

const Ticket = ({
    currentTicket,
    fCallBackClick,
    ticket,
    ticketBG,
    gridId,
    isOpacity,
    userGroups,
    userNeoId,
    categoryIcon,
}: TicketProps): ReactElement => {
    const { i18n } = useTranslation();

    const opacified = useMemo(
        () => (currentTicket && currentTicket.uid !== ticket?.uid && gridId === currentTicket?.gridId) || isOpacity,
        [currentTicket, isOpacity]
    );

    function isTTOorTTRStale() {
        return (
            getDateCompletionPercentage(
                ticket.createdAt,
                ticket.status === Status.New ? (ticket as ITicket).tto : ticket.ttr
            ) >= 75 &&
            ticket.status !== Status.Pending &&
            ticket.status !== Status.Solved &&
            ticket.status !== Status.Closed
        );
    }

    function checkIsWatcher() {
        if (ticket && userNeoId && ticket.userWatcher.find((watcherNeoId) => watcherNeoId === userNeoId)) {
            return true;
        }
        if (
            ticket &&
            userGroups &&
            userGroups.find(
                (userGroup) =>
                    Boolean(ticket.groupWatcher.map((group) => group.id).includes(userGroup.id)) &&
                    Boolean(ticket.groupWatcher.map((group) => group.name).includes(userGroup.name)) &&
                    Boolean(ticket.groupWatcher.map((group) => group.itsmCode).includes(userGroup.itsmCode))
            )
        ) {
            return true;
        }
        return false;
    }

    if (!ticket) {
        return (
            <div
                className="absolute w-[135px] h-[135px] flex items-center justify-center"
                data-testid="ticket-empty-body"
                data-grid-id={gridId}
                data-is-ticket={false}
            >
                <div className="absolute">
                    <TicketLogo width={32} fill={NeoColors.bg.B} />
                </div>
                <Hexagon bgColor={ticketBG && NeoColors.bg.A} strokeColor={NeoColors.bg.B} />
            </div>
        );
    }

    return (
        <motion.div
            animate={opacified ? "opacified" : "visible"}
            variants={{ opacified: { opacity: 0.3 }, visible: { opacity: 1 } }}
            className="flex flex-col justify-around text-center items-center relative w-[135px] h-[135px]"
            onClick={(): void => fCallBackClick && !isOpacity && fCallBackClick(ticket)}
            data-testid="ticket-body"
            id={ticket.uid}
            data-grid-id={gridId}
            data-is-ticket={true}
            data-ticket-status={getStatusDataAttribute(ticket.status)}
            data-ticket-category={ticket.category.toLowerCase()}
        >
            <div className="absolute w-full" style={{ zIndex: 3 }}>
                {checkIsWatcher() && (
                    <div className="h-8 w-8 absolute left-6 top-3" data-testid="ticket-icon-watcher">
                        <IconWatcherBlue className="absolute left-0 transform scale-110 w-6 fill-white" />
                    </div>
                )}
                {ticket.type !== Type["Problem"] && isTTOorTTRStale() && (
                    <div className="h-8 w-8 absolute right-4 top-[10px]" data-testid="ticket-tto-ttr-warning">
                        <CautionLogoFull
                            width={30}
                            fill={`${
                                getDateCompletionPercentage(
                                    ticket.createdAt,
                                    ticket.status === Status.New ? ticket.tto : ticket.ttr
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
            >
                <div className="text-neo-bg-A">
                    <div className="h-6">{categoryIcon && <Icon fontIcon={categoryIcon} className="text-xl" />}</div>
                    <div data-testid="ticket-title">
                        <Title type="h3" data={getDisplayedTicketUid(ticket.uid)} className="font-extrabold text-xs" />
                    </div>
                </div>
                <div
                    className={classNames(
                        "text-center flex items-center justify-center mb-2",
                        getPriorityColor(ticket.priority, false, "bg")
                    )}
                    style={{ width: "95%", height: 45, marginTop: 7 }}
                >
                    <p
                        className={classNames(
                            "mx-2 line-clamp-3 font-bold text-[11px]",
                            getContrastBasedOnHexColor(getPriorityColor(ticket.priority, true)) === "white"
                                ? "text-white"
                                : "text-neo-expanded"
                        )}
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
                                {ticket.createdAt && getTimeToNowWithTranslation(ticket.createdAt, i18n.language)}
                            </p>
                        </div>
                    )}
                    {ticket && ticket.status === 5 && (
                        <IconTicketSolved className="w-5 fill-neo-bg-A -mb-1" data-testid="ticket-icon-solved" />
                    )}
                    {ticket && ticket.status === 6 && (
                        <IconTicketClosed className="w-5 fill-neo-bg-A -mb-1" data-testid="ticket-icon-closed" />
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
                />
            </div>
        </motion.div>
    );
};

export default Ticket;
