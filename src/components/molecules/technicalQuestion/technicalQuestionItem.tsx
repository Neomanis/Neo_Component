import React, { ReactElement } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { formatDate, getPriorityColor } from "../../utils";
import { Title, Tooltip } from "../../atoms";
import { useTranslation } from "../../../i18n";
import { IconTechnicalQuestions, TicketLogo } from "../../../img/svg";

interface Props {
    createDate: string;
    createLevel: string | null;
    createUser: string;
    followed: boolean;
    followTechnicalQuestion: (id: number) => void;
    id: number;
    isSelected: boolean;
    openTechnicalQuestion: () => void;
    solved: boolean;
    ticketId: number | null;
    ticketPriority: number;
    title: string;
}

const TechnicalQuestionItem = ({
    createDate,
    createLevel,
    createUser,
    followed = false,
    followTechnicalQuestion,
    id,
    isSelected = false,
    openTechnicalQuestion,
    solved,
    ticketId,
    ticketPriority,
    title,
}: Props): ReactElement => {
    const { t } = useTranslation();

    return (
        <li
            key={id}
            className="list-none m-4 text-white cursor-pointer useOnClickOutsideException z-10 flex justify-between items-stretch"
            onClick={() => {
                openTechnicalQuestion();
            }}
            data-testid="tq-body"
        >
            <div
                data-testid="tq-head"
                className={`${isSelected ? "bg-neo-blue" : "bg-neo-link"} p-4 rounded-l-lg relative`}
            >
                <IconTechnicalQuestions fill={`${isSelected ? "#FFFFFF" : "#15304C"}`} />
                <div
                    data-testid="tq-pill"
                    className={`absolute w-1.5 h-11 rounded-lg my-auto top-0 bottom-0 right-0 transform translate-x-1/2 ${
                        solved ? "bg-neo-green" : "bg-neo-red"
                    }`}
                ></div>
            </div>
            <div
                data-testid="tq-middle"
                className={`${
                    isSelected ? "bg-neo-blue" : "bg-neo-bg-B"
                }  px-4 flex flex-col justify-center flex-grow py-3`}
            >
                <div data-testid="tq-middle-top" className="flex justify-between items-center w-full">
                    <Title
                        type={"h2"}
                        data={title}
                        className="font-bold text-lg mr-2 truncate text-white"
                        style={{ maxWidth: "265px" }}
                    />
                    <Tooltip
                        position="top"
                        className="z-20 px-4 py-1 text-white bg-neo-bg-A rounded text-xs"
                        data={followed ? t("global.follow") : t("global.unfollow")}
                        fCallback={(e) => {
                            e.stopPropagation();
                            followTechnicalQuestion(id);
                        }}
                        fontIcon={followed ? faEye : faEyeSlash}
                        fontIconClassName={isSelected ? "text-white" : "text-neo-link"}
                    />
                </div>
                <div
                    data-testid="tq-middle-bottom"
                    className={` ${
                        isSelected ? "text-white" : "text-neo-blue-secondary"
                    }  flex w-full justify-between items-center text-xs`}
                >
                    {createDate && (
                        <p data-testid="tq-date" className="font-bold">
                            {formatDate(createDate)}
                        </p>
                    )}
                    <div className="flex font-bold">
                        <p data-testid="tq-user" className="pr-3">
                            {createUser}
                        </p>
                        <p data-testid="tq-level">{createLevel}</p>
                    </div>
                </div>
            </div>

            <div
                data-testid="tq-end"
                className={`flex justify-between px-4 rounded-r-lg ${getPriorityColor(ticketPriority, false, "bg")}`}
            >
                <div className="flex items-center">
                    <TicketLogo fill={`${ticketPriority >= 1 && ticketPriority <= 6 ? "#FFFFFF" : "#152535"}`} />
                    <div data-testid="tq-ticket-infos">
                        {ticketId && (
                            <p
                                data-testid="tq-ticket-related"
                                className={` ${
                                    ticketPriority >= 1 && ticketPriority <= 6
                                        ? "text-white"
                                        : "text-neo-blue-secondary"
                                }  font-bold pl-4 text-xs`}
                            >
                                {t("technicalQuestion.relatedTicket")}
                                <p
                                    data-testid="tq-ticketId"
                                    className={`${
                                        ticketPriority >= 1 && ticketPriority <= 6
                                            ? "text-white"
                                            : "text-neo-blue-extraDark"
                                    }  font-extrabold text-lg`}
                                >
                                    {ticketId}
                                </p>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </li>
    );
};

export default TechnicalQuestionItem;
