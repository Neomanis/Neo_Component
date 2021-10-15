import React, { ReactElement } from "react";

import { BubbleChat, Img } from "../../atoms";
interface Props {
    content: string;
    date: string;
    isMe: boolean;
    name: string;
}

const MessageChat = ({ content, date, isMe, name }: Props): ReactElement => {
    return (
        <div className={`${isMe && " flex-row-reverse"} w-full flex items-start`}>
            <Img type="imgProfile" className={"rounded-full w-11"} />
            <div className="ml-3">
                <BubbleChat
                    bgColor={isMe ? "bg-neo_blue" : ""}
                    border={!isMe}
                    content={content}
                    date={date}
                    name={name}
                />
            </div>
        </div>
    );
};
export default MessageChat;
