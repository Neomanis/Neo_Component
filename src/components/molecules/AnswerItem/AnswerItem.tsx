import React, { ReactElement, useState } from "react";
import { faArrowUp, faCheck, faEdit } from "@fortawesome/free-solid-svg-icons";
import { NeoUser } from "@neomanis/neo-types";
import { formatDate } from "@/utils/dateTools";
import { Button } from "@/components/atoms";
import AnswerForm from "../AnswerForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface AnswerItemProps {
    acceptAnswer: (answerId: number) => void;
    author?: NeoUser;
    authorLevel: string | null;
    connectedUserNeoId?: number;
    creationDate: string;
    id: number;
    isAccepted: boolean;
    questionAuthorNeoId: number;
    text: string;
    updateAnswer: (id: number, text: string) => void;
    upvote: (id: number) => void;
    upvoters: number[];
}

const AnswerItem = ({
    acceptAnswer,
    author,
    authorLevel,
    connectedUserNeoId,
    creationDate,
    id,
    isAccepted,
    questionAuthorNeoId,
    text,
    updateAnswer,
    upvote,
    upvoters,
}: AnswerItemProps): ReactElement => {
    const [update, setUpdate] = useState(false);

    return (
        <div className={`bg-neo-blue-extraDark rounded-lg p-4 ${isAccepted && "border-4 border-neo-green"}`}>
            <div className="flex justify-between mb-9 items-center">
                <div className="flex">
                    <div className="text-white font-bold text-lg mr-2">{upvoters.length}</div>
                    <Button
                        data-testid="tq-answer-upvote"
                        startIcon={<FontAwesomeIcon icon={faArrowUp} />}
                        onClick={() => upvote(id)}
                        variant="none"
                        size="none"
                        rounded="none"
                        className={`cursor-pointer text-xl -mt-0.5 hover:text-neo-blue ${
                            connectedUserNeoId && upvoters.includes(connectedUserNeoId)
                                ? "text-neo-blue"
                                : "text-neo-link"
                        } `}
                    />
                    {!isAccepted && connectedUserNeoId === questionAuthorNeoId && (
                        <Button
                            data-testid="tq-answer-accept"
                            startIcon={<FontAwesomeIcon icon={faCheck} />}
                            className="ml-2 text-xl -mt-0.5 cursor-pointer text-neo-link hover:text-neo-green"
                            onClick={() => acceptAnswer(id)}
                            variant="none"
                            size="none"
                            rounded="none"
                        />
                    )}
                    {author && author.neoId === questionAuthorNeoId && (
                        <Button
                            data-testid="tq-answer-update"
                            startIcon={<FontAwesomeIcon icon={faEdit} />}
                            className="ml-2 text-xl -mt-0.5 cursor-pointer text-neo-link hover:text-neo-blue"
                            onClick={() => setUpdate((oldUpdate) => !oldUpdate)}
                            variant="none"
                            size="none"
                            rounded="none"
                        />
                    )}
                    <div className="flex text-neo-blue-secondary font-bold ml-11">
                        <p className="mr-2">{author?.name}</p>
                        <p className="text-white text-opacity-80 mr-2">{authorLevel}</p>
                    </div>
                </div>
                <div className="text-neo-blue-secondary font-bold">{formatDate(creationDate)}</div>
            </div>
            {update ? (
                <AnswerForm
                    isUpdateField
                    text={text}
                    updateFunction={(refForm, value) => {
                        setUpdate(false);
                        updateAnswer(id, value);
                    }}
                />
            ) : (
                <div className="text-white" dangerouslySetInnerHTML={{ __html: text }}></div>
            )}
        </div>
    );
};

export default AnswerItem;
