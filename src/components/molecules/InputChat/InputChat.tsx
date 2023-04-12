import React, { ReactElement } from "react";
import { UseFormRegister, FieldValues, UseFormSetValue } from "react-hook-form";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "@neomanis/neo-translation";
import { Tooltip, ButtonSwitch, Input, Button } from "@/components/atoms";
import { classNames } from "@/utils/tools";
import { IconAdd } from "@/img/svg";

export interface InputChatProps {
    enableAttachment?: boolean;
    cardOpen?: boolean;
    className?: string;
    fCallbackPrivateMessage?: () => void;
    inputClassName?: string;
    languageUser?: string;
    onClickAddAttachment: () => void;
    placeholder?: string;
    privateMessage?: boolean;
    refForm: string;
    register?: UseFormRegister<FieldValues>;
    setValue?: UseFormSetValue<FieldValues>;
}

const InputChat = ({
    enableAttachment = true,
    cardOpen,
    className,
    fCallbackPrivateMessage,
    inputClassName,
    onClickAddAttachment,
    placeholder,
    privateMessage,
    refForm,
    register,
    setValue,
}: InputChatProps): ReactElement => {
    const { t } = useTranslation();

    return (
        <div
            className={classNames(
                className
                    ? className
                    : "flex items-center bg-neo-bg-B text-white rounded-md divide-x-2 divide-neo-bg-A h-11"
            )}
        >
            {enableAttachment && (
                <div className="w-16 flex justify-center">
                    <Tooltip position="top" text={t("ticket.attachment_one")}>
                        <Button
                            onClick={() => onClickAddAttachment()}
                            startIcon={<IconAdd className="w-5 fill-neo-link" />}
                            className="px-0"
                            variant="none"
                        />
                    </Tooltip>
                </div>
            )}
            <Input
                readOnly={cardOpen}
                inputClassName={classNames(
                    inputClassName
                        ? inputClassName
                        : "bg-transparent w-full border-none text-neo-link focus:outline-none py-3 px-4 text-sm placeholder-neo-link"
                )}
                isUpdateField={false}
                placeholder={placeholder}
                refForm={refForm}
                register={register}
                required
                setValue={setValue}
                typeInput="text"
                showLabelAndUpdater={false}
            />
            {privateMessage && (
                <div className="py-3 px-2 w-10">
                    <Tooltip position="top" text={t("chat.private")}>
                        <ButtonSwitch
                            activeFontIcon={faLock}
                            inactiveFontIcon={faLockOpen}
                            activeClassName="flex text-neo-red"
                            inactiveClassName="flex text-neo-link opacity-50"
                            fCallback={fCallbackPrivateMessage}
                        />
                    </Tooltip>
                </div>
            )}
        </div>
    );
};

export default InputChat;
