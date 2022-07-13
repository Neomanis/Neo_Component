import React, { ReactElement } from "react";
import { Button, Input } from "../atoms";

import {
    FieldValues,
    UseFormRegister,
    UseFormReset,
    UseFormSetValue,
} from "../../../node_modules/react-hook-form/dist";
import { CloseLogo, IconSearch } from "../../img/svg";

interface Props {
    placeholder: string;
    refForm: string;
    containerClassName?: string;
    inputClassName?: string;
    showClearButton?: boolean;
    iconSearchColor?: string;
    iconResetColor?: string;
    register?: UseFormRegister<FieldValues>;
    setValue?: UseFormSetValue<FieldValues>;
    reset?: UseFormReset<FieldValues>;
}

const SearchField = ({
    placeholder,
    refForm,
    register,
    setValue,
    reset,
    showClearButton = true,
    iconSearchColor = "#FFFFFF",
    iconResetColor = "#FFFFFF",
    inputClassName = "w-full bg-transparent text-white placeholder-white border-none focus:outline-none",
    containerClassName = "bg-neo-bg-B h-12 flex items-center rounded-md overflow-hidden w-full justify-between",
}: Props): ReactElement => {
    function onEscape(e: React.KeyboardEvent<HTMLDivElement>) {
        if (e.code === "Escape") {
            reset && reset();
        }
    }
    return (
        <div className={containerClassName}>
            <div className="ml-4 pr-2 w-full" onKeyDown={(e) => onEscape(e)}>
                <Input
                    inputClassName={inputClassName}
                    isUpdateField={false}
                    placeholder={placeholder}
                    refForm={refForm}
                    register={register}
                    required={false}
                    setValue={setValue}
                    typeInput="text"
                />
            </div>
            {showClearButton && (
                <Button
                    className="mr-4"
                    svg={<CloseLogo className=" w-2 h-2 " fill={iconResetColor} />}
                    fCallback={() => reset && reset()}
                />
            )}
            <div className="w-4 mr-4">
                <IconSearch fill={iconSearchColor} />
            </div>
        </div>
    );
};

export default SearchField;
