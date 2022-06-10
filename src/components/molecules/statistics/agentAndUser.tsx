import { useTranslation } from "@neomanis/neo-translation";
import React, { ReactElement } from "react";
import { Pill } from "../../atoms";

interface Props {
    agentNumber: number;
    userNumber: number;
    className?: string;
}

const AgentAndUser = ({ agentNumber, userNumber, className }: Props): ReactElement => {
    const { t } = useTranslation();

    return (
        <div
            className={`${className} flex nowrap rounded-md py-4 px-6 justify-between w-full`}
            data-testid="user-and-agent-body"
        >
            <div className="flex items-center">
                <p className="font-bold">{t("global.user", { count: userNumber })}</p>
                <Pill
                    data={userNumber}
                    className="bg-neo-bg-B  text-xl rounded-full px-5 ml-3 font-extrabold"
                    data-testid="user-and-agent-pill-2"
                />
            </div>
            <div className="flex items-center">
                <p className="font-bold">{t("statistic.onlineAgent", { count: agentNumber })}</p>
                <Pill
                    data={agentNumber}
                    className="bg-neo-bg-B text-xl rounded-full px-5 mx-3 font-extrabold"
                    data-testid="user-and-agent-pill-1"
                />
            </div>
        </div>
    );
};

export default AgentAndUser;