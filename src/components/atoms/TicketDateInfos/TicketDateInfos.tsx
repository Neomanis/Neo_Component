import React, { ReactElement } from "react";
import { useTranslation } from "@neomanis/neo-translation";
import { ClockLogo } from "@/img/svg";
import Icon from "../Icon";
import { formatDateToNow } from "../../../utils/dateTools";

export interface TicketDateInfosProps {
    createdAt: string;
    updatedAt: string;
    userLanguage: string;
}

const TicketDateInfos = ({ createdAt, updatedAt, userLanguage }: TicketDateInfosProps): ReactElement => {
    const { t } = useTranslation();
    return (
        <div className={`w-full flex rounded-md border border-neo-blue-secondary border-2`}>
            <div className="w-1/12 flex-col p-2">
                <div className="h-1/2"></div>
                <div className="h-1/2">
                    <Icon
                        svg={<ClockLogo viewBox="0 0 15 15" width="15" height="15" />}
                        className="w-4 fill-neo-light-grey"
                    />
                </div>
            </div>
            <div className="w-5/12 flex-col p-2">
                <h4 className="text-neo-blue-secondary text-xs font-bold mr-4 uppercase whitespace-nowrap">
                    {t("ticket.createdAt")}
                </h4>
                <h4 className="text-neo-light-grey text-xs mt-1">{formatDateToNow(createdAt, userLanguage)}</h4>
            </div>
            <div className="w-6/12 flex-col p-2">
                <h4 className="text-neo-blue-secondary text-xs font-bold mr-4 uppercase whitespace-nowrap">
                    {t("ticket.updatedAt")}
                </h4>
                <h4 className="text-neo-light-grey text-xs mt-1">{formatDateToNow(updatedAt, userLanguage)}</h4>
            </div>
        </div>
    );
};

export default TicketDateInfos;
