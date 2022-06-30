import { isNotNullOrUndefined, Pill } from "@neomanis/neo-component";
import { useTranslation } from "@neomanis/neo-translation";
import React, { ReactElement } from "react";

interface Props {
    title: string;
    subtitle: string;
    className?: string;
    svg?: ReactElement;
    TTO?: number;
    TTR?: number;
    ticketNumber?: number;
    diagnosticNumber?: number;
}

const NumberAndSLA = ({
    title,
    subtitle,
    className,
    svg,
    TTO,
    TTR,
    ticketNumber,
    diagnosticNumber,
}: Props): ReactElement => {
    const { t } = useTranslation();

    return (
        <div className={`${className} flex flex-col justify-between nowrap rounded-md py-4 px-6 pb-8 w-full h-full`}>
            <div data-testid="number-and-SLA-titles">
                <p className="font-bold text-white">{title}</p>
                <p className="text-neo-stats-grey text-xs">{subtitle.toUpperCase()}</p>
            </div>
            <div className="flex items-center">
                {isNotNullOrUndefined(ticketNumber) && (
                    <div className="flex items-center">
                        <Pill
                            data={ticketNumber!}
                            className="bg-neo-bg-B rounded-full w-20 h-10 mr-4 font-extrabold text-white text-2xl"
                        />
                        <div>{svg}</div>
                    </div>
                )}
                {isNotNullOrUndefined(diagnosticNumber) && (
                    <div className="flex items-center">
                        <Pill
                            data={diagnosticNumber!}
                            className="bg-neo-bg-B rounded-full w-20 h-10 mr-4 font-extrabold text-white text-2xl"
                        />
                        <div>{svg}</div>
                    </div>
                )}
                {isNotNullOrUndefined(TTO) && isNotNullOrUndefined(TTR) && (
                    <div className="flex flex-col text-white font-semibold text-sm">
                        <div className="flex items-center mb-2">
                            <Pill
                                data={TTO!}
                                className="bg-neo-stats-TTO rounded-full w-16 h-8 mr-4 font-extrabold text-white"
                            />
                            <p className="text-xs">{t("ticket.tto")}</p>
                        </div>
                        <div className="flex items-center">
                            <Pill
                                data={TTR!}
                                className="bg-neo-stats-TTR rounded-full w-16 h-8 mr-4 font-extrabold text-white"
                            />
                            <p className="text-xs">{t("ticket.ttr")}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NumberAndSLA;
