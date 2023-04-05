import React, { ReactElement } from "react";
import { UseFormRegister, FieldValues, UseFormSetValue, UseFormReset } from "react-hook-form";
import { CloseLogo, IconSearch } from "@/img/svg";
import { Button, Input } from "@/components/atoms";
import { classNames } from "@/utils";

export interface SearchFieldProps {
    placeholder: string;
    refForm: string;
    containerClassName?: string;
    disabled?: boolean;
    inputClassName?: string;
    showClearButton?: boolean;
    iconSearchColor?: string;
    iconResetColor?: string;
    register: UseFormRegister<FieldValues>;
    setValue: UseFormSetValue<FieldValues>;
    reset?: UseFormReset<FieldValues>;
    id?: string;
}

const SearchField = ({
    placeholder,
    refForm,
    disabled,
    register,
    setValue,
    reset,
    showClearButton = true,
    iconSearchColor = "#FFFFFF",
    iconResetColor = "#FFFFFF",
    inputClassName = "w-full bg-transparent text-white placeholder-white border-none focus:outline-none",
    containerClassName = "bg-neo-bg-B h-12 flex items-center rounded-md overflow-hidden w-full justify-between",
    id,
}: SearchFieldProps): ReactElement => {
    function onEscape(e: React.KeyboardEvent<HTMLDivElement>) {
        if (e.code === "Escape") {
            reset && reset();
        }
    }
    return (
        <div className={classNames(containerClassName, "group transition-all", disabled && "opacity-50")}>
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
                    showLabelAndUpdater={false}
                    id={id}
                    disabled={disabled}
                />
            </div>
            <div
                className={classNames(
                    "w-3 mr-4 flex items-center transform transition-transform",
                    !disabled && "hover:scale-110"
                )}
            >
                {showClearButton && (
                    <Button
                        startIcon={
                            <CloseLogo
                                className={classNames("w-3 h-3 transition-all", !disabled && "hover:fill-neo-red")}
                                fill={iconResetColor}
                            />
                        }
                        onClick={() => !disabled && reset && reset()}
                        variant="none"
                        size="none"
                        id={`${id}-clear`}
                    />
                )}
            </div>
            <div className={classNames("transition-all", !disabled && "group-hover:scale-105")}>
                <IconSearch fill={iconSearchColor} className="w-4 mr-3 group-hover:animate-swing" />
            </div>
        </div>
    );
};

export default SearchField;
