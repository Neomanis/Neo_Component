import React, { ReactElement, useState } from "react";
import { classNames } from "@/utils/tools";
import { IconTrash } from "@/img/svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { ValidationCard } from "@/components/molecules";
import { useTranslation } from "@neomanis/neo-translation";

export interface AttachmentChatProps {
    attachmentId: string;
    bgColor?: string;
    border?: string;
    content: string | ReactElement;
    isValidate?: boolean;
    downloadCallback: (attachmentId: string) => void;
    deleteCallback: (attachmentId: string) => void;
    readOnly?: boolean;
}

const AttachmentChat = ({
    attachmentId,
    bgColor,
    border,
    content,
    isValidate = true,
    downloadCallback,
    deleteCallback,
    readOnly = false,
}: AttachmentChatProps): ReactElement => {
    const { t } = useTranslation();
    const [openValidationCard, setOpenValidationCard] = useState<boolean>(false);

    return (
        <div data-testid="attachmentChat-body">
            {!openValidationCard ? (
                <div
                    data-testid="attachment-content"
                    className={classNames(
                        "flex items-center justify-between rounded-md py-2 px-4 relative",
                        bgColor,
                        border,
                        border && "border-2",
                        !isValidate && "opacity-50"
                    )}
                >
                    <div
                        data-testid="on-click-download"
                        className="flex items-center group cursor-pointer w-4/5"
                        onClick={() => downloadCallback(attachmentId)}
                    >
                        <FontAwesomeIcon
                            icon={faFileDownload}
                            className="text-neo-link mr-2 text-2xl group-hover:text-neo-blue transition-all opacity-50 group-hover:opacity-100"
                        />
                        <p className="text-white break-words line-clamp-2 transition-all">{content}</p>
                    </div>
                    {!readOnly && (
                        <IconTrash
                            data-testid="attachment-chat-delete-icon"
                            className="fill-neo-link hover:fill-neo-red w-3 cursor-pointer transition-all opacity-50 hover:opacity-100"
                            onClick={() => setOpenValidationCard(true)}
                        />
                    )}
                </div>
            ) : (
                <ValidationCard
                    classNames={{
                        container: classNames(
                            "flex items-center justify-between rounded-md py-2 px-4 relative",
                            border,
                            border && "border-2",
                            bgColor
                        ),
                        buttonContainer: "flex gap-2",
                        text: "text-white",
                    }}
                    fCallBackCancel={() => setOpenValidationCard(false)}
                    fCallBackValidate={() => {
                        setOpenValidationCard(false);
                        deleteCallback(attachmentId);
                    }}
                    text={`${t("global.deleteThis")} ${t("ticket.attachment", { count: 1 }).toLocaleLowerCase()} ?`}
                    id="delete-button"
                />
            )}
        </div>
    );
};

export default AttachmentChat;
