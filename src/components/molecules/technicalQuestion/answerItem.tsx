import React, { ReactElement, useState } from "react";
import { faArrowUp, faEdit, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

import { formatDate } from "../../utils";
import AnswerForm from "./answerForm";
import { Button } from "../../atoms";

interface Props {
    acceptAnswer: (answerId: number) => void;
    accepted: boolean;
    createDate: string;
    createLevel: string | null;
    createUser: string;
    createUserQuestion: string;
    id: number;
    isQuestionSolved: boolean;
    languageUser: string;
    text: string;
    updateAnswer: (id: number, text: string) => void;
    upvote: (id: number) => void;
    upvoters: string[];
    userUid?: string;
}

const AnswerItem = ({
    acceptAnswer,
    accepted,
    createDate,
    createLevel,
    createUser,
    createUserQuestion,
    id,
    isQuestionSolved,
    languageUser,
    text,
    updateAnswer,
    upvote,
    upvoters,
    userUid,
}: Props): ReactElement => {
    const [update, setUpdate] = useState(false);

    if (update) {
        return (
            <AnswerForm
                closeCallback={() => setUpdate(false)}
                isUpdateField
                languageUser={languageUser}
                text={text}
                updateFunction={(refForm, value) => {
                    setUpdate(false);
                    updateAnswer(id, value);
                }}
            />
        );
    }
    return (
        <div className={`text-white bg-neo_bg_B p-2 rounded-xl mb-4 ${accepted && "border-2 border-neo_green"}`}>
            <div className="flex justify-between">
                <div className="flex">
                    <div>{formatDate(createDate)}</div>
                    {!isQuestionSolved && userUid === createUserQuestion && (
                        <div>
                            <Button fontIcon={faThumbsUp} className="ml-4" fCallback={() => acceptAnswer(id)} />
                        </div>
                    )}
                </div>
                <div className="flex items-center">
                    <p className="mr-2">{createUser}</p>
                    {createLevel ?? <p className="text-white text-opacity-80 mr-2">{createLevel}</p>}
                    {createUser === userUid && (
                        <Button fontIcon={faEdit} className="mr-2" fCallback={() => setUpdate(true)} />
                    )}
                    <div className="flex flex-col items-center">
                        <Button
                            fontIcon={faArrowUp}
                            fCallback={() => upvote(id)}
                            className={`${userUid && upvoters.includes(userUid) && "text-neo_blue"} cursor-pointer`}
                        />
                        <div>{upvoters.length}</div>
                    </div>
                </div>
            </div>
            <div className="text-white" dangerouslySetInnerHTML={{ __html: text }}></div>
        </div>
    );
};

export default AnswerItem;
