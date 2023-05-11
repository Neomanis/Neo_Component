import React, { ReactElement, useState } from "react";
import { MessageType } from "@neomanis/neo-types";
import { classNames as classFunction } from "@/utils";
import { BubbleChat, Icon, Img, Loader } from "@/components/atoms";
import { faCircleExclamation, faLock } from "@fortawesome/free-solid-svg-icons";

export interface MessageChatProps {
    classNames?: { hoverInformations?: string; icon?: string; message?: string };
    content: string | ReactElement;
    date: string;
    deleteDate?: string;
    privateMessage?: boolean;
    isMe: boolean;
    avatar?: string | null;
    name: string;
    type: MessageType;
    attachmentId?: string;
    downloadAttachmentCallback: (attachmentId: string) => void;
    deleteAttachmentCallback: (attachmentId: string) => void;
    isFailed?: boolean;
    isValidate?: boolean;
    isLoading?: boolean;
    bubbleChatWidth?: number;
    attachmentReadOnly: boolean;
}

const MessageChat = ({
    classNames,
    content,
    date,
    isMe,
    privateMessage,
    attachmentId,
    downloadAttachmentCallback,
    deleteAttachmentCallback,
    isFailed,
    isValidate = true,
    isLoading,
    deleteDate,
    name,
    avatar,
    type,
    attachmentReadOnly = false,
}: MessageChatProps): ReactElement => {
    const [hover, setHover] = useState(false);
    console.log(avatar);

    return (
        <div className="w-full" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <div className={classFunction("overflow-hidden h-auto flex mb-px", isMe && "flex-row-reverse")}>
                <div
                    data-testid="message-hover-information"
                    className={classFunction(
                        "flex transform duration-300 transition-transform",
                        isMe && "flex-row-reverse",
                        !hover && "translate-y-full",
                        classNames?.hoverInformations ?? "text-xxs text-neo-blue-secondary font-bold"
                    )}
                >
                    <p>{name}</p>
                    <p className="px-2">{date}</p>
                </div>
            </div>
            <div
                data-testid="message-icon-container"
                className={classFunction(isMe && "flex-row-reverse", "w-full flex items-center")}
            >
                <div
                    data-testid="message-icon"
                    className={classFunction(classNames?.icon ?? "w-1/6", deleteDate && "opacity-50")}
                >
                    {avatar ? (
                        <Img
                            type="imgProfile"
                            data={{
                                src: "fakeuser.jpg",
                                alt: "avatar",
                            }}
                            className="rounded-full w-full select-none"
                        />
                    ) : (
                        <Img type="imgProfile" className="rounded-full w-full select-none" />
                    )}
                </div>
                <div
                    data-testid="message-content"
                    className={classFunction(classNames?.message ?? "w-5/6 px-2 text-xxs", "relative")}
                >
                    {isLoading && !isValidate && (
                        <div
                            data-testid="message-is-loading"
                            className="absolute transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
                        >
                            <Loader type="circleOnly" className="text-white text-base" />
                        </div>
                    )}
                    {!isFailed && privateMessage && (
                        <Icon
                            data-testid="private-message-icon"
                            className={classFunction(
                                isMe ? "left-1" : "right-1",
                                "text-neo-red absolute -top-1 drop-shadow-md z-50 text-xs"
                            )}
                            fontIcon={faLock}
                        />
                    )}
                    {isFailed && (
                        <Icon
                            data-testid="error-message-icon"
                            fontIcon={faCircleExclamation}
                            className={classFunction(
                                isMe ? "left-0" : "right-0",
                                "text-neo-red bg-white rounded-full ring ring-neo-red ring-inset absolute -top-2 z-50 text-base"
                            )}
                        />
                    )}
                    <div className={classFunction(isLoading && "opacity-50")}>
                        <BubbleChat
                            attachmentId={attachmentId}
                            bgColor={isMe && "bg-neo-bg-B"}
                            border={!isMe && "border-neo-bg-B"}
                            content={content}
                            downloadCallback={downloadAttachmentCallback}
                            deleteCallback={deleteAttachmentCallback}
                            readOnly={attachmentReadOnly}
                            deleteDate={deleteDate}
                            isValidate={isValidate}
                            type={type}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageChat;
