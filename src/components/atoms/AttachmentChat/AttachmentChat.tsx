import React, { ReactElement } from "react";
import { classNames } from "@/utils/tools";
import { IconTrash } from "@/img/svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";

export interface AttachmentChatProps {
    attachmentId: number;
    bgColor?: string;
    border?: string;
    content: string | ReactElement;
    isValidate?: boolean;
    onClickCallback: (data: boolean) => void;
    onDeleteCallback: (data: boolean) => void;
}

const AttachmentChat = ({
    bgColor,
    border,
    content,
    isValidate = true,
    onClickCallback,
    onDeleteCallback,
}: AttachmentChatProps): ReactElement => {
    return (
        <div
            className={classNames(
                "flex items-center text-xxs rounded-md p-2 text-neo-blue break-words",
                bgColor,
                border,
                !isValidate && "opacity-50"
            )}
            data-testid="bubbleChat-body"
            onClick={() => onClickCallback}
        >
            <FontAwesomeIcon icon={faFileDownload} className="mr-1" />
            <p className="hover:underline cursor-pointer">{content}</p>
            <IconTrash
                className={classNames(
                    "fill-neo-link opacity-20 w-3 ml-2 cursor-pointer",
                    "hover:fill-neo-red hover:opacity-100"
                )}
                onClick={() => {
                    console.log();
                }}
            />
        </div>
    );
};

export default AttachmentChat;
