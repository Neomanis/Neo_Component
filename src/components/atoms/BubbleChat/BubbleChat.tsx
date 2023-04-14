import React, { ReactElement, useMemo, useState } from "react";
import { classNames } from "@/utils/tools";
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

    return (
        <div data-testid="attachmentChat-body">
            {!openValidationCard ? (
                <div
                    data-testid="on-click-download"
                    className={classNames(
                        "flex items-center justify-between rounded-md p-2 relative",
                        bgColor,
                        border,
                        border && "border-2",
                        !isValidate && "opacity-50",
                        deleteDate && "opacity-50",
                        !deleteDate && "group",
                        "flex items-center",
                        type === MessageType.ATTACHMENT && !deleteDate && "cursor-pointer"
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
                        className={classNames(
                            type === MessageType.ATTACHMENT ? (!readOnlyOrDelete ? "w-[80%]" : "w-[90%]") : "w-full"
                        )}
                    >
                        {deleteDate && (
                            <div className="text-xxs text-neo-blue font-bold px-2">
                                <Title type="h2" data={t("ticket.attachmentDeleted")} />
                                <p>{formatDateToNow(deleteDate, i18n.language)}</p>
                            </div>
                        )}
                        <p className={classNames("text-white break-words transition-all px-2")}>
                            <Linkify>{content}</Linkify>
                        </p>
                    </div>
                    {type === MessageType.ATTACHMENT && !readOnlyOrDelete && (
                        <IconTrash
                            data-testid="attachment-chat-delete-icon"
                            className="fill-neo-link hover:fill-neo-red cursor-pointer transition-all opacity-50 hover:opacity-100 w-[8%]"
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpenValidationCard(true);
                            }}
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
                        attachmentId && deleteCallback(attachmentId);
                    }}
                    text={`${t("global.deleteThis")} ${t("ticket.attachment", { count: 1 }).toLocaleLowerCase()} ?`}
                    id="delete-button"
                />
            )}
        </div>
    );
};

export default BubbleChat;
