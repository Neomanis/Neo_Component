import React, { ReactElement, useMemo } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Ticket, TicketTypeTrigram } from "@neomanis/neo-types";
import { ClockLogo } from "@/img/svg";
import {
    classNames,
    getContrastBasedOnHexColor,
    getDateFnsLocaleFromUserLang,
    getDisplayedTicketUid,
    getStatusColor,
} from "@/utils";
import { Icon } from "@/components/atoms";
import { formatDistanceStrict } from "date-fns";

export interface NeoHelperTicketProps {
    ticket: Ticket;
    categoryIcon?: IconProp;
    userLanguage: string;
}

type TypeConditionalProps = { type: "ticket"; onClick: (ticket: Ticket) => void } | { type: "banner"; onClick?: never };

const NeoHelperTicketBanner = ({
    ticket,
    categoryIcon,
    onClick,
    type,
    userLanguage,
}: NeoHelperTicketProps & TypeConditionalProps): ReactElement => {
    const now = useMemo(() => Date.now(), []);

    return (
        <div
            className={classNames(
                "bg-neo-bg-B",
                type === "ticket" &&
                    "rounded overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
            )}
            onClick={(): void => onClick(ticket)}
        >
            <div
                className={classNames(
                    "font-bold flex items-center px-3",
                    type === "banner" ? "h-[40px]" : "h-[50px]",
                    getStatusColor(ticket.status, false, "bg"),
                    getContrastBasedOnHexColor(getStatusColor(ticket.status, true)) === "black"
                        ? "text-neo-bg-B"
                        : "text-white"
                )}
                data-testid="NHticket-blockTitle"
            >
                <p
                    className={classNames("py-1 line-clamp-2", type === "banner" ? "leading-[18px]" : "leading-[20px]")}
                    data-testid="NHticket-title"
                >
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
                    {getDisplayedTicketUid(ticket.uid, TicketTypeTrigram[ticket.type])}
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
                            {formatDistanceStrict(now, new Date(ticket.createdAt), {
                                locale: getDateFnsLocaleFromUserLang(userLanguage),
                            })}
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

export default NeoHelperTicketBanner;
