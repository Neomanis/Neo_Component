import React, { ReactElement, useState } from "react";
import { faLock } from "@fortawesome/free-solid-svg-icons";

import { BubbleChat, Icon, Img } from "../../atoms";
interface Props {
    content: string;
    date: string;
    isMe: boolean;
    messagePrivate?: boolean;
    name: string;
    avatar?: {
        encodedAvatar: string;
        mimetype: string;
        originalname: string;
    };
}

const MessageChat = ({ content, date, isMe, messagePrivate, name, avatar }: Props): ReactElement => {
    const [hover, setHover] = useState(false);
    return (
        <div>
            <div
                className={`
                ${isMe && " flex-row-reverse"} 
                overflow-hidden h-4 text-xxs flex text-neo-blue-secondary font-bold`}
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
                    {messagePrivate && <Icon fontIcon={faLock} />}
                </div>
            </div>
            <div
                className={`
                ${isMe && "flex-row-reverse"} 
                w-full flex items-center`}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <div className="min-w-max">
                    {avatar ? (
                        <Img
                            type="imgProfile"
                            data={{
                                src: `data:${avatar?.mimetype};base64,${avatar.encodedAvatar}`,
                                alt: `${avatar?.originalname}`,
                            }}
                            className={"rounded-full w-11"}
                        />
                    ) : (
                        <Img type="imgProfile" className={"rounded-full w-11"} />
                    )}
                </div>
                <div className="mx-3">
                    <BubbleChat
                        bgColor={isMe && !messagePrivate ? "bg-neo-bg-B" : "bg-neo-blue"}
                        // bgColor={isMe ? (isMe && !messagePrivate ? "bg-neo-bg-B" : "bg-neo-blue") : ""}
                        border={!isMe}
                        content={content}
                        privateBorder={messagePrivate}
                    />
                </div>
            </div>
        </div>
    );
};
export default MessageChat;
