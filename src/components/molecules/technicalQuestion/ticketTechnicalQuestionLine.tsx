import React, { ReactElement } from "react";
import { faUserCheck, faUserTimes } from "@fortawesome/free-solid-svg-icons";
import i18next from "i18next";

import { Icon } from "../../atoms";

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

    return (
        <div
            className="bg-neo_blue m-1 grid grid-cols-6 gap-2 rounded-full text-base cursor-pointer text-neo_blue-light"
            onClick={() => openTechnicalQuestion()}
        >
            <div className="col-span-4 ml-1 ">{title}</div>
            <div className="text-opacity-80 ">{`${answersNumber ?? 0} ${myLanguage("ticketModalInfo.answer")}`}</div>
            <div
                className={`${
                    solved ? "bg-neo_green-base" : "bg-neo_red"
                } flex justify-center items-center col-end-7 rounded-r-full text-white`}
            >
                <Icon fontIcon={solved ? faUserCheck : faUserTimes} />
            </div>
        </div>
    );
};

export default TicketTechnicalQuestionLine;
