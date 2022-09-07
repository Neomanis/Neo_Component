import React, { ReactElement } from "react";
import { UseFormRegister, FieldValues, UseFormSetValue } from "react-hook-form";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "@neomanis/neo-translation";
import { IconAdd } from "@/img/svg";
import { Tooltip, ButtonSwitch, Input } from "@/components/atoms";

export interface InputChatProps {
    buttonSub?: boolean;
    cardOpen?: boolean;
    className?: string;
    fCallbackPrivateMessage?: () => void;
    inputClassName?: string;
    languageUser?: string;
    placeholder?: string;
    privateMessage?: boolean;
    refForm: string;
    register?: UseFormRegister<FieldValues>;
    setValue?: UseFormSetValue<FieldValues>;
}

const InputChat = ({
    cardOpen,
    className,
    fCallbackPrivateMessage,
    inputClassName,
    placeholder,
    privateMessage,
    refForm,
    register,
    setValue,
}: InputChatProps): ReactElement => {
    const { t } = useTranslation();

    return (
        <div
            className={`${
                className
                    ? className
                    : "flex items-center bg-neo-bg-B text-white rounded-md divide-x-2 divide-neo-bg-A h-11 "
            }`}
        >
            <div className="p-2 opacity-50 w-10 flex justify-center" style={{ minWidth: 40 }}>
                <IconAdd width={40} fill="#7daab7" />
            </div>
            <Input
                readOnly={cardOpen}
                inputClassName={`${
                    inputClassName
                        ? inputClassName
                        : "bg-transparent w-full border-none text-neo-link focus:outline-none py-3 px-4 text-sm placeholder-neo-link"
                }`}
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
                    <Tooltip position="bottom" text={t("chat.private")}>
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
