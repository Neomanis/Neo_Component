import React, { ReactElement, useMemo, useState } from "react";
import { classNames, decorateMessagePart } from "@/utils/tools";
import Linkify from "../Linkify";
import { IconTrash } from "@/img/svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload, faFileCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { ValidationCard } from "@/components/molecules";
import { useTranslation } from "@neomanis/neo-translation";
import { Title, formatDateToNow } from "@/index";
import { MessageType } from "@neomanis/neo-types";

export interface AttachmentChatProps {
    attachmentId?: string;
    bgColor?: string;
    border?: string;
    content: string | ReactElement;
    isValidate?: boolean;
    deleteDate?: string;
    downloadCallback: (attachmentId: string) => void;
    deleteCallback: (attachmentId: string) => void;
    readOnly?: boolean;
    type: MessageType;
}

const BubbleChat = ({
    attachmentId,
    bgColor,
    border,
    content,
    isValidate = true,
    readOnly = false,
    type,
    deleteDate,
    downloadCallback,
    deleteCallback,
}: AttachmentChatProps): ReactElement => {
    const { t, i18n } = useTranslation();
    const [openValidationCard, setOpenValidationCard] = useState<boolean>(false);

    const readOnlyOrDelete = useMemo(() => Boolean(readOnly || deleteDate), [readOnly]);

    if (openValidationCard) {
        return (
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
                    attachmentId && deleteCallback(attachmentId);
                }}
                text={`${t("global.deleteThis")} ${t("ticket.attachment", { count: 1 }).toLocaleLowerCase()} ?`}
                id="delete-button"
            />
        );
    }
    return (
        <div
            data-testid="bubbleChat-body"
            className={classNames(
                "flex items-center justify-between rounded-md p-2 relative",
                bgColor,
                border,
                border && "border-2",
                !isValidate && "opacity-50",
                deleteDate && "opacity-50",
                type === MessageType.ATTACHMENT && !deleteDate && "cursor-pointer"
            )}
        >
            <div
                data-testid="on-click-download"
                className={classNames(
                    "flex items-center",
                    type === MessageType.ATTACHMENT ? (!readOnlyOrDelete ? "w-[90%]" : "w-full") : "w-full",
                    !deleteDate && "group"
                )}
                onClick={() => !deleteDate && attachmentId && downloadCallback(attachmentId)}
            >
                {type === MessageType.ATTACHMENT && (
                    <FontAwesomeIcon
                        icon={!deleteDate ? faFileDownload : faFileCircleXmark}
                        className="text-neo-link text-2xl group-hover:text-neo-blue transition-all opacity-50 group-hover:opacity-100 w-[10%]"
                    />
                )}
                <div
                    data-testid="bubbleChat-content"
                    className={classNames(type === MessageType.ATTACHMENT ? "w-[90%]" : "w-full")}
                >
                    {deleteDate && (
                        <div className="text-xxs text-neo-blue font-bold px-2">
                            <Title type="h2" data={t("ticket.attachmentDeleted")} />
                            <p data-testid="bubbleChat-deleteDate">{formatDateToNow(deleteDate, i18n.language)}</p>
                        </div>
                    )}
                    <div className={classNames("text-white break-words transition-all px-2")}>
                        <Linkify>
                            {typeof content === "string"
                                ? decorateMessagePart(content, new RegExp(/(\[(\w){3}\])\s(INC|DEM)\s\d+/g), "b")
                                : content}
                        </Linkify>
                    </div>
                </div>
            </div>

            {type === MessageType.ATTACHMENT && !readOnlyOrDelete && (
                <div className="w-[10%]">
                    <IconTrash
                        data-testid="attachment-chat-delete-icon"
                        className="fill-neo-link hover:fill-neo-red cursor-pointer transition-all opacity-50 hover:opacity-100 max-w-[20px] mx-auto"
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenValidationCard(true);
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default BubbleChat;
