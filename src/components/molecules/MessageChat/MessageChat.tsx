import React, { ReactElement, useState } from "react";
import { faCircleExclamation, faLock } from "@fortawesome/free-solid-svg-icons";
import { Img, Icon, BubbleChat, Loader } from "@/components/atoms";
import { classNames } from "@/utils/tools";

export interface MessageChatProps {
    content: string | ReactElement;
    date: string;
    isMe: boolean;
    privateMessage?: boolean;
    name: string;
    isFailed?: boolean;
    isValidate?: boolean;
    isLoading?: boolean;
    avatar?: {
        encodedAvatar: string;
        mimetype: string;
        originalname: string;
    };
}

const MessageChat = ({
    content,
    date,
    isMe,
    privateMessage,
    isFailed,
    isValidate = true,
    isLoading,
    name,
    avatar,
}: MessageChatProps): ReactElement => {
    const [hover, setHover] = useState(false);

    return (
        <div>
            <div
                className={classNames(
                    "overflow-hidden h-4 text-xxs flex text-neo-blue-secondary font-bold",
                    isMe && "flex-row-reverse"
                )}
                style={{ marginBottom: 1 }}
            >
                <div
                    className={classNames(
                        "flex transform duration-300 transition-transform ",
                        isMe && "flex-row-reverse",
                        !hover && "translate-y-4"
                    )}
                >
                    <p>{name}</p>
                    <p className="px-2">{date}</p>
                </div>
            </div>
            <div
                className={classNames(isMe && "flex-row-reverse", "w-full flex items-center relative")}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <div className="min-w-max ">
                    {avatar && avatar.encodedAvatar !== null ? (
                        <Img
                            type="imgProfile"
                            data={{
                                src: avatar.encodedAvatar,
                                alt: avatar.originalname,
                            }}
                            className="rounded-full w-11 h-11"
                        />
                    ) : (
                        <Img type="imgProfile" className="rounded-full w-11" />
                    )}
                </div>
                <div className="mx-3 relative">
                    {!isFailed && privateMessage && (
                        <Icon
                            className={classNames(
                                !isMe ? "-left-2" : "-right-2",
                                "text-neo-red absolute -top-1 drop-shadow-md z-50"
                            )}
                            fontIcon={faLock}
                        />
                    )}
                    {isFailed && (
                        <>
                            <Icon
                                fontIcon={faCircleExclamation}
                                className={classNames(
                                    !isMe ? "-left-2" : "-right-2",
                                    "text-neo-red text-base absolute -top-1 z-50"
                                )}
                            />
                            <div
                                className={classNames(
                                    !isMe ? "-left-2" : "-right-1",
                                    !isMe ? "-left-1" : "-right-1",
                                    "bg-white h-[10px] w-2 absolute top-0 z-40 "
                                )}
                            ></div>
                        </>
                    )}
                    {isLoading && !isValidate && (
                        <div className="absolute transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
                            <Loader type="circleOnly" className="text-white" />
                        </div>
                    )}
                    <BubbleChat
                        bgColor={isMe && "bg-neo-bg-B "}
                        border={!isMe && "border-neo-bg-B"}
                        content={content}
                        isValidate={isValidate}
                    />
                </div>
            </div>
        </div>
    );
};

export default MessageChat;
