import React, { ReactElement } from "react";
import { getStatusText, getStatusColor, classNames } from "@/utils";
import { StatusTraductionKey, Status } from "@neomanis/neo-types";
import { useTranslation } from "@neomanis/neo-translation";

export interface TicketStatusProps {
    status: number;
}

const TicketStatus = ({ status }: TicketStatusProps): ReactElement => {
    const { t } = useTranslation();

    function getStatusDesc(status: number): string {
        switch (status) {
            case Status.New:
                return t("status.description.new");
            case Status.Assigned:
                return t("status.description.assigned");
            case Status.Planned:
                return t("status.description.planned");
            case Status.Pending:
                return t("status.description.pending");
            case Status.Solved:
                return t("status.description.solved");
            case Status.Closed:
                return t("status.description.closed");
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
                {getStatusText(status)
                    ? t(`status.${getStatusText(status) as StatusTraductionKey}` as const).toUpperCase()
                    : t("status.invalidStatus")}
            </h1>
            <p className="pl-4 pt-2 pb-4 text-neo-light-grey text-xs">{getStatusDesc(status)}</p>
        </div>
    );
};

export default TicketStatus;
