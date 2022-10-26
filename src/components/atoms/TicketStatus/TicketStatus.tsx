import React, { ReactElement } from "react";
import { getStatusText, getStatusColor, classNames } from "@/utils";
import { StatusTraductionKey } from "@neomanis/neo-types";
import { useTranslation } from "@neomanis/neo-translation";

export interface TicketStatusProps {
    status: number;
}

const TicketStatus = ({ status }: TicketStatusProps): ReactElement => {
    const { t } = useTranslation();

    function getStatusDesc(status: number): string {
        switch (status) {
            case 2 || 3:
                return t("ticket.inProgress");
            case 4:
                return t("ticket.pending");
            default:
                return t("neoHelper.waitTechnician");
        }
    }

    return (
        <div className="w-full flex flex-col rounded-md bg-neo-bg-B">
            <h1
                className={classNames(
                    "pl-4 pt-4 text-neo-light-grey font-extrabold",
                    getStatusColor(status, false, "text")
                )}
            >
                {t(`status.${getStatusText(status) as StatusTraductionKey}` as const).toUpperCase()}
            </h1>
            <p className="pl-4 pt-2 pb-4 text-neo-light-grey text-xs">{getStatusDesc(status)}</p>
        </div>
    );
};

export default TicketStatus;
