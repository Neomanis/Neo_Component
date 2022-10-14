import React, { ReactElement } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Ticket } from "@neomanis/neo-types";
import { useTranslation } from "@neomanis/neo-translation";
import { ClockLogo } from "@/img/svg";
import {
    classNames,
    getContrastBasedOnHexColor,
    getDisplayedTicketUid,
    getStatusColor,
    getTimeToNowWithTranslation,
} from "@/utils";
import { Icon } from "@/components/atoms";

export interface NeoHelperTicketProps {
    ticket: Ticket;
    onClick: (ticket: Ticket) => void;
    categoryIcon?: IconProp;
}

const NeoHelperTicket = ({ ticket, categoryIcon, onClick: fCallBack }: NeoHelperTicketProps): ReactElement => {
    const { i18n } = useTranslation();
    return (
        <div
            className="rounded bg-neo-bg-B overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
            onClick={(): void => fCallBack(ticket)}
        >
            <div
                className={classNames(
                    "font-bold flex items-center px-3 h-[50px]",
                    getStatusColor(ticket.status, false, "bg"),
                    getContrastBasedOnHexColor(getStatusColor(ticket.status, true)) === "black"
                        ? "text-neo-bg-B"
                        : "text-white"
                )}
                data-testid="NHticket-blockTitle"
            >
                <p className="py-1 line-clamp-2 leading-[13px]" data-testid="NHticket-title">
                    {ticket.name}
                </p>
            </div>
            <div
                className={classNames(
                    "flex items-center justify-between py-2 px-3",
                    getStatusColor(ticket.status, false, "text")
                )}
                data-testid="NHticket-blockDesc"
            >
                <p className="font-bold uppercase text-xs" data-testid="NHticket-ticketUid">
                    {getDisplayedTicketUid(ticket.uid)}
                </p>
                <div className="flex items-center space-x-6">
                    <div className="flex justify-center item-center">
                        <ClockLogo
                            className={classNames(
                                "w-[15px] h-[15px] mr-2",
                                getStatusColor(ticket.status, false, "fill")
                            )}
                        />
                        <p className="text-xs font-bold" data-testid="NHticket-ticketCreationDate">
                            {getTimeToNowWithTranslation(ticket.date_creation, i18n.language)}
                        </p>
                    </div>
                    <div className="h-6 flex items-center" data-testid="NHticket-categoryIcon">
                        {categoryIcon && <Icon fontIcon={categoryIcon} className="text-xl" />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NeoHelperTicket;
