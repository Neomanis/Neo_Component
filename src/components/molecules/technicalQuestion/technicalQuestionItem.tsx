import React, { ReactElement } from "react";
import { faEye, faEyeSlash, faUserCheck, faUserTimes } from "@fortawesome/free-solid-svg-icons";
import i18next from "i18next";

import { formatDate } from "../../utils";
import { Icon, Title, Tooltip } from "../../atoms";

interface Props {
    content: string;
    createDate: string;
    createLevel: string | null;
    createUser: string;
    followed: boolean;
    followTechnicalQuestion: (id: number) => void;
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
    followed = false,
    followTechnicalQuestion,
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
            className="list-none bg-neo_blue m-4 py-2 px-4 text-neo_lite rounded-md cursor-pointer useOnClickOutsideException w-1/2 z-10"
            onClick={() => {
                openTechnicalQuestion();
            }}
        >
            <div className="flex justify-between items-center">
                <div className="w-3/5">
                    <div className="flex">
                        <Title type={"h2"} data={title} className="font-bold text-xl mr-2 truncate" />
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
                        <p>{createUser}</p>
                        <p className="text-neo_blue-light text-opacity-80 mx-2">{createLevel}</p>
                        <p>
                            {myLanguage("tQuestion.forTicket")} {ticketId}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex justify-between mt-2">
                <div className="truncate w-4/5" dangerouslySetInnerHTML={{ __html: content }}></div>
                <div className="flex items-center">
                    <Tooltip
                        className="z-20"
                        data={followed ? myLanguage("tQuestion.follow") : myLanguage("tQuestion.unfollow")}
                        fCallback={(e) => {
                            e.stopPropagation();
                            followTechnicalQuestion(id);
                        }}
                        fontIcon={followed ? faEye : faEyeSlash}
                    />
                </div>
            </div>
        </li>
    );
};

export default TechnicalQuestionItem;
