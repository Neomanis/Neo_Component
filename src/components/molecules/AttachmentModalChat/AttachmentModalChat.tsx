import { Icon, Input } from "@/components/atoms";
import { useTranslation } from "@neomanis/neo-translation";
import { classNames, transformBytes } from "@/utils";
import { faCheck, faPenToSquare, faTimes } from "@fortawesome/free-solid-svg-icons";
import React, { ReactElement } from "react";

export interface AttachmentModalChatProps {
    title?: string;
    file?: File;
    isEmpty?: boolean;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onValidate: () => void;
    onCancel: () => void;
}

const AttachmentModalChat = ({
    title,
    file,
    isEmpty,
    onInputChange,
    onValidate,
    onCancel,
}: AttachmentModalChatProps): ReactElement => {
    const { t } = useTranslation();

    return (
        <div className="bg-neo-bg-B px-4 py-3 w-full rounded-lg">
            <div className="flex items-center font-bold mb-2 items-center">
                <Icon fontIcon={faPenToSquare} className="text-neo-link transition-all text-2xl" />
                <p className="mx-4 font-bold bg-neo-link text-white px-2 rounded-full text-sm">
                    {transformBytes(file?.size)}
                </p>
                <p className="font-bold bg-neo-link text-white px-2 rounded-full text-sm">
                    .{file?.name.split(".").at(-1)}
                </p>
            </div>
            <Input
                value={title}
                inputClassName={classNames(
                    "outline-none text-white font-bold bg-neo-bg-A my-2 rounded px-2 py-1 border-2",
                    isEmpty ? "border-neo-red" : "border-neo-bg-A"
                )}
                showLabelAndUpdater={false}
                placeholder={t("global.title")}
                refForm="title_attachment"
                typeInput="text"
                onChange={(e): void => {
                    onInputChange(e);
                }}
            />
            <div className="flex justify-center gap-4">
                <Icon
                    onClick={(): void => onValidate()}
                    fontIcon={faCheck}
                    className="text-2xl text-neo-link hover:text-neo-green hover:scale-105 transition-all cursor-pointer"
                />
                <Icon
                    onClick={(): void => onCancel()}
                    fontIcon={faTimes}
                    className="text-2xl text-neo-link hover:text-neo-red hover:scale-105 transition-all cursor-pointer"
                />
            </div>
        </div>
    );
};

export default AttachmentModalChat;
