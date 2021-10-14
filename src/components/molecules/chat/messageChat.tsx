import React, { ReactElement } from "react";
import { BubbleChat } from "../../atoms";
import Img from "../../atoms/img";
interface Props {
    content: string;
    date: string;
    isMe: boolean;
    name: string;
}

const MessageChat = ({ name, isMe, date, content }: Props): ReactElement => {
    return (
        <div className={`${isMe && " flex-row-reverse"} w-full flex items-start`}>
            <Img type="imgProfile" className={"rounded-full w-11"} />
            <div className="ml-3">
                <BubbleChat
                    content={content}
                    name={name}
                    date={date}
                    bgColor={isMe ? "bg-neo_blue" : ""}
                    border={!isMe}
                />
            </div>
        </div>
    );
};
export default MessageChat;
