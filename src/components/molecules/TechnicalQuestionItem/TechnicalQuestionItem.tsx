import React, { ReactElement } from "react";
import { useTranslation } from "@neomanis/neo-translation";
import { Title } from "@/components/atoms";
import { classNames, getContrastBasedOnHexColor, getFormatDateOrTimeToNow, getStatusColor } from "@/utils";
import { TicketLogo } from "@/img/svg";
export interface TechnicalQuestionItemProps {
    answerAmount: number;
    createDate: string;
    id: number;
    selectedQuestion?: number;
    openTechnicalQuestion: () => void;
    solved: boolean;
    ticket?: { id: number; priority: number; status: number; uid: string };
    title: string;
}

const TechnicalQuestionItem = ({
    answerAmount,
    createDate,
    id,
    selectedQuestion,
    openTechnicalQuestion,
    solved,
    ticket,
    title,
}: TechnicalQuestionItemProps): ReactElement => {
    const { t } = useTranslation();

    const isSelected = selectedQuestion ? id == selectedQuestion : true;
    return (
        <li
            key={id}
            className={classNames(
                "m-4 relative list-none text-white cursor-pointer flex justify-between items-stretch z-10",
                !isSelected && "transform hover:scale-105 transition-transform duration-[90ms]"
            )}
            onClick={() => {
                openTechnicalQuestion();
            }}
            data-testid="tq-body"
        >
            <div
                data-testid="tq-pill"
                className={classNames(
                    "absolute h-1/2 w-2 rounded-lg my-auto top-0 bottom-0 left-0 z-10 transform -translate-x-1/2",
                    solved ? "bg-neo-green" : "bg-neo-red"
                )}
            ></div>
            <div
                data-testid="tq-middle"
                className={classNames(
                    "bg-neo-bg-B px-4 flex flex-col justify-center flex-grow py-3 rounded-l-lg",
                    !isSelected ? "opacity-50" : "opacity-100",
                    !ticket && "rounded-r-lg"
                )}
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
                    className="text-neo-blue-secondary flex w-full space-x-3 items-center text-xs font-bold"
                >
                    {createDate && <p data-testid="tq-date">{getFormatDateOrTimeToNow(createDate, 2678400000)}</p>}

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
                    className={`flex justify-between px-2 rounded-r-lg ${getStatusColor(ticket.status, false, "bg")}`}
                >
                    <div data-testid="tq-svg" className="flex items-center">
                        {
                            <TicketLogo
                                fill={getContrastBasedOnHexColor(getStatusColor(ticket.status, true))}
                                width={32}
                            />
                        }
                    </div>
                </div>
            )}
        </li>
    );
};

export default TechnicalQuestionItem;
