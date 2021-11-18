import React, { ReactElement } from "react";
import { faUserCheck, faUserTimes } from "@fortawesome/free-solid-svg-icons";
import i18next from "i18next";

import { formatDate } from "../../utils";
import { Icon, Title } from "../../atoms";

interface Props {
    content: string;
    createDate: string;
    createLevel: string | null;
    createUser: string;
    id: number;
    languageUser: string;
    openTechnicalQuestion: () => void;
    solved: boolean;
    ticketId: number;
    title: string;
}

const TechnicalQuestionItem = ({
    content,
    createDate,
    createLevel,
    createUser,
    id,
    languageUser,
    openTechnicalQuestion,
    solved,
    ticketId,
    title,
}: Props): ReactElement => {
    const myLanguage = i18next.getFixedT(languageUser);

    return (
        <li
            key={id}
            className="list-none bg-neo_blue m-4 py-2 px-4 text-neo_lite rounded-md cursor-pointer useOnClickOutsideException"
            onClick={openTechnicalQuestion}
        >
            <div className="flex justify-between items-center">
                <div>
                    <div className="flex">
                        <Title type={"h2"} data={title} className=" font-bold text-xl mr-2" />
                        <Icon
                            fontIcon={solved ? faUserCheck : faUserTimes}
                            className={`${solved ? "text-neo_green-base" : "text-neo_red"}`}
                        />
                    </div>
                    {createDate && (
                        <p className="text-neo_blue-light text-opacity-80 text-xs">{formatDate(createDate)}</p>
                    )}
                </div>
                <div>
                    <div className="flex">
                        <p className="mr-2">{createUser}</p>
                        <p className="text-neo_blue-light text-opacity-80">{createLevel}</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-between mt-2">
                <div className="truncate w-4/5">{content}</div>
                <p>
                    {myLanguage("tQuestion.forTicket")} {ticketId}
                </p>
            </div>
        </li>
    );
};

export default TechnicalQuestionItem;
