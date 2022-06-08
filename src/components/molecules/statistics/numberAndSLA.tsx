import { useTranslation } from "@neomanis/neo-translation";
import React, { ReactElement } from "react";
import { Pill } from "../../atoms";

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
        <div
            className={`${className} flex flex-col justify-between nowrap rounded-md py-4 px-6 pb-8 w-full h-full`}
            data-testid="number-and-SLA-body"
        >
            <div data-testid="number-and-SLA-titles">
                <p className="font-bold text-xl text-white">{title}</p>
                <p className="text-neo-stats-grey">{subtitle}</p>
            </div>
            <div className="flex items-center">
                {(ticketNumber || diagnosticNumber) && (
                    <div className="flex" data-testid="number-and-SLA-ticket-diag-body">
                        <Pill
                            data={ticketNumber ? ticketNumber : diagnosticNumber}
                            className="bg-neo-bg-B text-xl rounded-full py-1 w-20 mr-4 font-extrabold text-white"
                        />
                        <div data-testid="number-and-SLA-svg">{svg}</div>
                    </div>
                )}
                {TTO && TTR && (
                    <div
                        className="flex flex-col text-white font-semibold text-sm"
                        data-testid="number-and-SLA-TTO-TTR-body"
                    >
                        <div className="flex items-center mb-2">
                            <Pill
                                data={TTO}
                                className="bg-neo-stats-TTO text-xl rounded-full py-1 w-16 mr-4 font-extrabold text-white"
                            />
                            <p>{t("ticket.tto")}</p>
                        </div>
                        <div className="flex items-center">
                            <Pill
                                data={TTR}
                                className="bg-neo-stats-TTR text-xl rounded-full py-1 w-16 mr-4 font-extrabold text-white"
                            />
                            <p>{t("ticket.ttr")}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NumberAndSLA;
