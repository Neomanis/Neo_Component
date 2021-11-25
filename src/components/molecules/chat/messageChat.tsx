import React, { ReactElement, useState } from "react";

import { BubbleChat, Img } from "../../atoms";
interface Props {
    content: string;
    date: string;
    isMe: boolean;
    name: string;
}

const MessageChat = ({ content, date, isMe, name }: Props): ReactElement => {
    const [hover, setHover] = useState(false);
    return (
        <div>
            <div
                className={`
                ${isMe && " flex-row-reverse"} 
                overflow-hidden h-4 text-xxs flex text-neo_blue_secondary font-bold`}
                style={{ marginBottom: 1 }}
            >
                <div
                    className={`flex transform duration-300 transition-transform 
                    ${isMe && "flex-row-reverse"} 
                    ${!hover && "translate-y-4"}
                    `}
                >
                    <p>{name}</p>
                    <p className="px-2">{date}</p>
                </div>
            </div>
            <div
                className={`
                ${isMe && "flex-row-reverse"} 
                w-full flex items-center`}
            >
                <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="min-w-max">
                    <Img type="imgProfile" className={"rounded-full w-11"} />
                </div>
                <div className="mx-3">
                    <BubbleChat bgColor={isMe && " bg-neo_bg_B"} border={!isMe} content={content} />
                </div>
            </div>
        </div>
    );
};
export default MessageChat;
