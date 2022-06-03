import React, { ReactElement } from "react";
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { IconAdd } from "../../../img/svg";
import { ButtonSwitch, Input, Tooltip } from "../../atoms";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "@neomanis/neo-translation";

interface Props {
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
}: Props): ReactElement => {
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
                disabled={cardOpen}
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
            />
            {privateMessage && (
                <div className="py-3 px-2 w-10">
                    <Tooltip
                        data={t("chat.private")}
                        className="pt-3 text-xs"
                        component={
                            <ButtonSwitch
                                activeFontIcon={faLock}
                                inactiveFontIcon={faLockOpen}
                                activeClassName="flex text-neo-red"
                                inactiveClassName="flex text-neo-link opacity-50"
                                fCallback={fCallbackPrivateMessage}
                            />
                        }
                    />
                </div>
            )}
        </div>
    );
};
export default InputChat;
