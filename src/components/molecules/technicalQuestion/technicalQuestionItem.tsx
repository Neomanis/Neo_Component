import React, { ReactElement } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { formatDate, getContrastBasedOnHexColor, getStatusOrPriorityColor, NeoColors } from "../../utils";
import { Icon, Title, Tooltip } from "../../atoms";
import { IconTechnicalQuestions } from "../../../img/svg";
import { getTicketLogoByStatus } from "../../utils/ticketLogoByStatus";
import { useTranslation } from "@neomanis/neo-translation";

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
    ticket?: { id: number; priority: number; status: number; uid: string };
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
    ticket,
    title,
}: Props): ReactElement => {
    const { t } = useTranslation();

    return (
        <li
            key={id}
            className={`m-4 list-none text-white cursor-pointer flex justify-between items-stretch z-10
            ${!isSelected && "transform hover:scale-105 transition-transform duration-[90ms]"}`}
            onClick={() => {
                openTechnicalQuestion();
            }}
            data-testid="tq-body"
        >
            <div
                data-testid="tq-head"
                className={`${isSelected ? "bg-neo-blue" : "bg-neo-link"} p-4 rounded-l-lg relative`}
            >
                <IconTechnicalQuestions width={35} fill={`${isSelected ? "#FFFFFF" : "#0E3864"}`} />
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
                }  px-4 flex flex-col justify-center flex-grow py-3 ${!ticket && "rounded-r-lg"}`}
            >
                <div data-testid="tq-middle-top" className="flex justify-between items-center w-full">
                    <Title
                        type={"h2"}
                        data={title}
                        className="font-bold text-lg mr-2 truncate text-white"
                        style={{ maxWidth: "265px" }}
                    />
                    <Tooltip position="top" text={followed ? t("global.follow") : t("global.unfollow")}>
                        <Icon
                            fontIcon={followed ? faEye : faEyeSlash}
                            fCallBack={(e) => {
                                e.stopPropagation();
                                followTechnicalQuestion(id);
                            }}
                        />
                    </Tooltip>
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
            {ticket && (
                <div
                    data-testid="tq-end"
                    className={`flex justify-between px-4 rounded-r-lg ${getStatusOrPriorityColor(
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

                        <div data-testid="tq-ticket-infos">
                            {ticket && (
                                <div
                                    data-testid="tq-ticket-related"
                                    className={` ${
                                        getContrastBasedOnHexColor(
                                            getStatusOrPriorityColor(ticket.status, ticket.priority, true)
                                        ) === "white"
                                            ? "text-white"
                                            : "text-neo-blue-secondary"
                                    }  font-bold pl-4 text-xs`}
                                >
                                    {t("technicalQuestion.relatedTicket")}
                                    <p
                                        data-testid="tq-ticketId"
                                        className={`${
                                            getContrastBasedOnHexColor(
                                                getStatusOrPriorityColor(ticket.status, ticket.priority, true)
                                            ) === "white"
                                                ? "text-white"
                                                : "text-neo-blue-extraDark"
                                        }  font-extrabold text-lg`}
                                    >
                                        {ticket.uid}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </li>
    );
};

export default TechnicalQuestionItem;
