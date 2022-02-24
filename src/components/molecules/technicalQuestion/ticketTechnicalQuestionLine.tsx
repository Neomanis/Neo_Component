import React, { ReactElement } from "react";
import { useTranslation } from "../../../i18n";

interface Props {
    answersNumber: number | undefined;
    openTechnicalQuestion: () => void;
    solved: boolean;
    title: string;
}

const TicketTechnicalQuestionLine = ({ answersNumber, openTechnicalQuestion, solved, title }: Props): ReactElement => {
    const { t } = useTranslation();

    return (
        <div
            className={`h-20 w-full bg-neo-bg-B rounded-md border-r-8 p-4 flex flex-col justify-between cursor-pointer 
                ${solved ? "border-neo-green" : "border-neo-red"}
            `}
            onClick={() => openTechnicalQuestion()}
        >
            <div
                className={`text-neo-light-grey font-bold text-xs`}
                style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                }}
            >
                {title}
            </div>
            <div className="font-bold text-xxs text-neo-blue-secondary">
                {answersNumber > 1
                    ? t("ticketModalInfo.answer_other", { count: answersNumber })
                    : t("ticketModalInfo.answer_one", { count: answersNumber })}
            </div>
        </div>
    );
};

export default TicketTechnicalQuestionLine;
