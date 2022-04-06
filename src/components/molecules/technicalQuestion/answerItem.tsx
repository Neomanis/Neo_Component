import React, { ReactElement, useState } from "react";
import { faArrowUp, faCheck, faEdit } from "@fortawesome/free-solid-svg-icons";

import { formatDate } from "../../utils";
import AnswerForm from "./answerForm";
import { Button } from "../../atoms";

interface Props {
    acceptAnswer: (answerId: number) => void;
    author: string;
    authorLevel: string | null;
    connectedUserUid?: string;
    creationDate: string;
    id: number;
    isAccepted: boolean;
    questionAuthor: string;
    text: string;
    updateAnswer: (id: number, text: string) => void;
    upvote: (id: number) => void;
    upvoters: string[];
}

const AnswerItem = ({
    acceptAnswer,
    author,
    authorLevel,
    connectedUserUid,
    creationDate,
    id,
    isAccepted,
    questionAuthor,
    text,
    updateAnswer,
    upvote,
    upvoters,
}: Props): ReactElement => {
    const [update, setUpdate] = useState(false);

    return (
        <div className={`bg-neo-blue-extraDark rounded-lg p-4 ${isAccepted && "border-4 border-neo-green"}`}>
            <div className="flex justify-between mb-9 items-center">
                <div className="flex">
                    <div className="text-white font-bold text-lg mr-2">{upvoters.length}</div>
                    <Button
                        fontIcon={faArrowUp}
                        fCallback={() => upvote(id)}
                        className={`cursor-pointer text-xl -mt-0.5 hover:text-neo-blue ${
                            connectedUserUid && upvoters.includes(connectedUserUid) ? "text-neo-blue" : "text-neo-link"
                        } `}
                    />
                    {!isAccepted && connectedUserUid === questionAuthor && (
                        <Button
                            fontIcon={faCheck}
                            className="ml-2 text-xl -mt-0.5 cursor-pointer text-neo-link hover:text-neo-green"
                            fCallback={() => acceptAnswer(id)}
                        />
                    )}
                    {author === connectedUserUid && (
                        <Button
                            fontIcon={faEdit}
                            className="ml-2 text-xl -mt-0.5 cursor-pointer text-neo-link hover:text-neo-blue"
                            fCallback={() => setUpdate((oldUpdate) => !oldUpdate)}
                        />
                    )}
                    <div className="flex text-neo-blue-secondary font-bold ml-11">
                        <p className="mr-2">{author}</p>
                        {authorLevel ?? <p className="text-white text-opacity-80 mr-2">{authorLevel}</p>}
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
