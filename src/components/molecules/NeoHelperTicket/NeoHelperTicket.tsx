import { Icon } from "@/components/atoms";
import { ClockLogo } from "@/img/svg";
import { getContrastBasedOnHexColor, getStatusColor, getTimeToNowWithTranslation } from "@/utils";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { i18n } from "@neomanis/neo-translation";
import { Ticket } from "@neomanis/neo-types";
import React, { ReactElement } from "react";

export interface NeoHelperTicketProps {
    ticket: Ticket;
    categoryIcon?: IconProp;
    fCallBack?: (ticket: Ticket) => void;
}

const NeoHelperTicket = ({ ticket, categoryIcon, fCallBack }: NeoHelperTicketProps): ReactElement => {
    return (
        <div
            className="rounded bg-neo-bg-B overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
            onClick={(): void => fCallBack(ticket)}
            data-testid="NHticket-body"
        >
            <div
                className={`${getStatusColor(ticket.status, false, "bg")} ${
                    getContrastBasedOnHexColor(getStatusColor(ticket.status, true)) === "black"
                        ? "text-neo-bg-B"
                        : "text-white"
                } font-bold flex items-center px-3`}
                style={{ height: 50 }}
                data-testid="NHticket-blockTitle"
            >
                <p className="py-1 line-clamp-2" style={{ lineHeight: "13px" }} data-testid="NHticket-title">
                    {ticket.name}
                </p>
            </div>
            <div
                className={`${getStatusColor(
                    ticket.status,
                    false,
                    "text"
                )} flex items-center justify-between py-2 px-3`}
                data-testid="NHticket-blockDesc"
            >
                <p className="font-bold uppercase text-xs" data-testid="NHticket-ticketUid">
                    {ticket.uid}
                </p>
                <div className="flex items-center space-x-6">
                    <div className="flex justify-center item-center">
                        <div className="w-[15px] h-[15px] mr-2">
                            <ClockLogo fill={getStatusColor(ticket.status, true)} />
                        </div>
                        <p className="text-xs font-bold" data-testid="NHticket-ticketCreationDate">
                            {ticket.date_creation && getTimeToNowWithTranslation(ticket.date_creation, i18n.language)}
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
