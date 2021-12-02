import React, { ReactElement } from "react";
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { ReactComponent as AddFile } from "../../../img/svg/nm_ico_addFile.svg";
import { Input, Button } from "../../atoms";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";

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
    buttonSub = false,
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
            <div className="p-2">
                <AddFile fill="#7daab7" />
            </div>
            <div className="flex items-center ">
                <Input
                    disabled={cardOpen}
                    inputClassName={`${
                        inputClassName
                            ? inputClassName
                            : "bg-transparent w-full border-none text-neo-light-grey focus:outline-none p-2"
                    }`}
                    isUpdateField={false}
                    placeholder={placeholder}
                    refForm={refForm}
                    register={register}
                    required
                    setValue={setValue}
                    typeInput="text"
                />
                {buttonSub && (
                    <div className="pr-2 transform hover:scale-105">
                        <Button className="text-2xl" type="submit" fontIcon={faPaperPlane} />
                    </div>
                )}
            </div>
        </div>
    );
};
export default InputChat;
