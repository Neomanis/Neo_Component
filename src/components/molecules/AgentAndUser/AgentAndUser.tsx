import React, { ReactElement } from "react";
import { useTranslation } from "@neomanis/neo-translation";
import Pill from "@/components/atoms/Pill";

export interface AgentAndUserProps {
    agentNumber: number;
    userNumber: number;
    className?: string;
}

const AgentAndUser = ({ agentNumber, userNumber, className }: AgentAndUserProps): ReactElement => {
    const { t } = useTranslation();

    return (
        <div
            className={`${className} flex justify-around bg-neo-blue-extraDark border-4 rounded-lg border-neo-bg-B text-white p-2`}
            data-testid="user-and-agent-body"
        >
            <div className="flex items-center">
                <p className="font-bold">{t("global.user", { count: userNumber })}</p>
                <Pill
                    data={userNumber}
                    className="bg-neo-bg-B text-xl rounded-full px-7 ml-3 font-extrabold"
                    data-testid="user-and-agent-pill-1"
                />
            </div>
            <div className="flex items-center">
                <p className="font-bold">{t("statistic.onlineAgent", { count: agentNumber })}</p>
                <Pill
                    data={agentNumber}
                    className="bg-neo-bg-B text-xl rounded-full px-7 mx-3 font-extrabold"
                    data-testid="user-and-agent-pill-2"
                />
            </div>
        </div>
    );
};

export default AgentAndUser;
