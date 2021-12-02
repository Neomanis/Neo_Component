import React, { ReactElement } from "react";
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { ReactComponent as AddFile } from "../../../img/svg/nm_ico_addFile.svg";
import { Input } from "../../atoms";

interface Props {
    cardOpen?: boolean;
    className?: string;
    inputClassName?: string;
    buttonSub?: boolean;
    placeholder: string;
    refForm: string;
    register?: UseFormRegister<FieldValues>;
    setValue?: UseFormSetValue<FieldValues>;
}

const InputChat = ({
    cardOpen,
    className,
    inputClassName,
    placeholder,
    refForm,
    register,
    setValue,
}: Props): ReactElement => {
    return (
        <div
            className={`${
                className
                    ? className
                    : "flex items-center bg-neo-bg-B relative text-white rounded-md divide-x-2 divide-neo-link"
            }`}
        >
            <div className="flex items-center ">
                <Input
                    disabled={cardOpen}
                    inputClassName={`${
                        inputClassName
                            ? inputClassName
                            : "bg-transparent w-full border-none text-neo-light-grey focus:outline-none py-1 px-3"
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
            <div className="p-2 opacity-50">
                <AddFile fill="#7daab7" />
            </div>
        </div>
    );
};
export default InputChat;
