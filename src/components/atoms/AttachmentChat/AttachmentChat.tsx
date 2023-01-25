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
}

const AttachmentChat = ({
    attachmentId,
    bgColor,
    border,
    content,
    isValidate = true,
    downloadCallback,
    deleteCallback,
}: AttachmentChatProps): ReactElement => {
    const { t } = useTranslation();
    const [openValidationCard, setOpenValidationCard] = useState<boolean>(false);

    return (
        <div data-testid="attachmentChat-body">
            {!openValidationCard ? (
                <div
                    className={classNames(
                        "flex items-center justify-around rounded-md p-2 relative",
                        bgColor,
                        border,
                        border && "border-2",
                        !isValidate && "opacity-50"
                    )}
                >
                    <FontAwesomeIcon icon={faFileDownload} className="mr-1 text-2xl text-neo-blue mr-2" />
                    <div
                        className="text-xxs break-words line-clamp-2 hover:underline cursor-pointer w-4/5"
                        onClick={() => downloadCallback(attachmentId)}
                    >
                        <p>{content}</p>
                    </div>
                    <IconTrash
                        className={classNames(
                            "fill-neo-link opacity-20 w-3 ml-2 cursor-pointer",
                            "hover:fill-neo-red hover:opacity-100"
                        )}
                        onClick={() => setOpenValidationCard(true)}
                    />
                </div>
            ) : (
                <ValidationCard
                    classNames={{
                        container: classNames(
                            "flex flex-row justify-between items-center relative rounded-md p-2",
                            border,
                            border && "border-2",
                            bgColor
                        ),
                        buttonContainer: "flex justify-around w-1/4 ml-1",
                        text: "text-xxs text-white",
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
