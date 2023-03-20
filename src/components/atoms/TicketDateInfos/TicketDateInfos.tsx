import React, { ReactElement } from "react";
import { useTranslation } from "@neomanis/neo-translation";
import { formatDateToNow } from "../../../utils/dateTools";

export interface TicketDateInfosProps {
    createdAt: string;
    updatedAt: string;
    userLanguage: string;
    userAssigned?: string;
}

const TicketDateInfos = ({ createdAt, updatedAt, userLanguage, userAssigned }: TicketDateInfosProps): ReactElement => {
    const { t } = useTranslation();

    const title = (title) => {
        return <h4 className="text-neo-blue-secondary text-xs font-bold uppercase whitespace-nowrap mb-1">{title}</h4>;
    };
    const subTitle = (subTitle) => {
        return <p className="text-neo-light-grey text-xs font-bold">{subTitle}</p>;
    };

    return (
        <div className="w-full rounded-md border border-neo-blue-secondary border-2 p-2 px-3 grid grid-cols-2 grid-rows-2 gap-y-2">
            <div>
                {title(t("ticket.createdAt"))}
                {subTitle(formatDateToNow(createdAt, userLanguage))}
            </div>
            <div>
                {title(t("ticket.updatedAt"))}
                {subTitle(formatDateToNow(updatedAt, userLanguage))}
            </div>
            {userAssigned && (
                <div>
                    {title(t("ticket.assigned"))}
                    {subTitle(userAssigned)}
                </div>
            )}
        </div>
    );
};

export default TicketDateInfos;
