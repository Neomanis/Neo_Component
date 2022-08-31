import React, { ReactElement } from "react";
import { useTranslation } from "@neomanis/neo-translation";
import { formatDate } from "@/utils/dateTools";
import { getTicketLogoByStatus } from "@/utils/ticketLogoByStatus";
import { getContrastBasedOnHexColor, getStatusOrPriorityColor } from "@/utils/tools";
import NeoColors from "@/utils/neoColors";
import { Title } from "@/components/atoms";

export interface TechnicalQuestionItemProps {
    answerAmount: number;
    createDate: string;
    id: number;
    isSelected: boolean;
    openTechnicalQuestion: () => void;
    solved: boolean;
    ticket?: { id: number; priority: number; status: number; uid: string };
    title: string;
}

const TechnicalQuestionItem = ({
    answerAmount,
    createDate,
    id,
    isSelected = false,
    openTechnicalQuestion,
    solved,
    ticket,
    title,
}: TechnicalQuestionItemProps): ReactElement => {
    const { t } = useTranslation();

    return (
        <li
            key={id}
            className={`m-4 relative list-none text-white cursor-pointer flex justify-between items-stretch z-10
            ${!isSelected && "transform hover:scale-105 transition-transform duration-[90ms]"}`}
            onClick={() => {
                openTechnicalQuestion();
            }}
            data-testid="tq-body"
        >
            <div
                data-testid="tq-pill"
                className={`absolute w-1.5 h-11 rounded-lg my-auto top-0 bottom-0 left-0 transform -translate-x-1/2 ${
                    solved ? "bg-neo-green" : "bg-neo-red"
                }`}
            ></div>
            <div
                data-testid="tq-middle"
                className={`${
                    isSelected ? "bg-neo-blue" : "bg-neo-bg-B"
                } px-4 flex flex-col justify-center flex-grow py-3 rounded-l-lg ${!ticket && "rounded-r-lg"}`}
            >
                <div data-testid="tq-middle-top" className="flex justify-between items-center w-full">
                    <Title
                        type={"h2"}
                        data={title}
                        className="font-bold text-lg mr-2 truncate text-white max-w-[220px]"
                    />
                </div>
                <div
                    data-testid="tq-middle-bottom"
                    className={` ${
                        isSelected ? "text-white" : "text-neo-blue-secondary"
                    } flex w-full space-x-3 items-center text-xs font-bold`}
                >
                    {createDate && <p data-testid="tq-date">{formatDate(createDate)}</p>}

                    {answerAmount > 0 && (
                        <p data-testid="tq-answer">
                            {t("technicalQuestion.answer.withCount", { count: answerAmount })}
                        </p>
                    )}
                </div>
            </div>
            {ticket && (
                <div
                    data-testid="tq-end"
                    className={`flex justify-between px-2 rounded-r-lg ${getStatusOrPriorityColor(
                        ticket.status,
                        ticket.priority,
                        false,
                        "bg"
                    )}`}
                >
                    <div data-testid="tq-svg" className="flex items-center">
                        {getTicketLogoByStatus(
                            ticket.status,
                            getContrastBasedOnHexColor(
                                getStatusOrPriorityColor(ticket.status, ticket.priority, true)
                            ) === "black"
                                ? NeoColors.blue.extraDark
                                : "#FFFFFF"
                        )}
                    </div>
                </div>
            )}
        </li>
    );
};

export default TechnicalQuestionItem;
