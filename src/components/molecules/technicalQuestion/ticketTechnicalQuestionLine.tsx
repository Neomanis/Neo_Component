import React, { ReactElement, useEffect, useRef } from "react";
import { faUserCheck, faUserTimes } from "@fortawesome/free-solid-svg-icons";
import i18next from "i18next";

import { Icon } from "../../atoms";
import { useTranslation } from "react-i18next";

interface Props {
    answersNumber: number | undefined;
    openTechnicalQuestion: () => void;
    languageUser: string;
    solved: boolean;
    title: string;
}

const TicketTechnicalQuestionLine = ({
    answersNumber,
    openTechnicalQuestion,
    languageUser,
    solved,
    title,
}: Props): ReactElement => {
    const myLanguage = i18next.getFixedT(languageUser);
    const { t } = useTranslation();
    const titleRef = useRef<HTMLDivElement>(null);

    return (
        <div
            className={`h-20 w-full bg-neo-bg-B rounded-md border-r-8 p-4 flex flex-col justify-between ${
                solved ? "border-neo-green" : "border-neo-red"
            }`}
            onClick={() => openTechnicalQuestion()}
        >
            <div
                ref={titleRef}
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
                {t("ticketModalInfo.answer", { count: answersNumber })}
            </div>
        </div>
    );
};

export default TicketTechnicalQuestionLine;
