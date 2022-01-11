import React, { ReactElement } from "react";
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { IconAdd } from "../../../img/svg";
import { ButtonSwitch, Input, Tooltip } from "../../atoms";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { i18n } from "../../../i18n";

interface Props {
    buttonSub?: boolean;
    cardOpen?: boolean;
    className?: string;
    fCallbackPrivateMessage?: () => void;
    inputClassName?: string;
    languageUser?: string;
    placeholder: string;
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
    languageUser = "en_US",
    placeholder,
    privateMessage,
    refForm,
    register,
    setValue,
}: Props): ReactElement => {
    const myLanguage = i18n.getFixedT(languageUser);

    return (
        <div
            className={`${
                className
                    ? className
                    : "flex items-center bg-neo-bg-B relative text-white rounded-md divide-x-2 divide-neo-link"
            }`}
        >
            <div className="p-2 opacity-50 w-10">
                <IconAdd fill="#7daab7" />
            </div>
            <div className="flex items-center ">
                <Input
                    disabled={cardOpen}
                    inputClassName={`${
                        inputClassName
                            ? inputClassName
                            : "bg-transparent w-full border-none text-neo-light-grey focus:outline-none py-2 px-3"
                    }`}
                    isUpdateField={false}
                    placeholder={placeholder}
                    refForm={refForm}
                    register={register}
                    required
                    setValue={setValue}
                    typeInput="text"
                />
            </div>
            {privateMessage && (
                <div className="p-2 w-10">
                    <Tooltip
                        data={myLanguage("chat.privateMessage")}
                        className="pt-3 text-xs"
                        component={
                            <ButtonSwitch
                                activeFontIcon={faLock}
                                inactiveFontIcon={faLockOpen}
                                activeClassName="flex text-neo-green"
                                inactiveClassName="flex text-neo-light-grey opacity-50"
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
