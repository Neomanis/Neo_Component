import React, { ReactElement } from "react";
import { UseFormRegister, FieldValues, UseFormSetValue, UseFormReset } from "react-hook-form";
import { CloseLogo, IconSearch } from "@/img/svg";
import { Button, Input } from "@/components/atoms";

export interface SearchFieldProps {
    placeholder: string;
    refForm: string;
    containerClassName?: string;
    inputClassName?: string;
    showClearButton?: boolean;
    iconSearchColor?: string;
    iconResetColor?: string;
    register: UseFormRegister<FieldValues>;
    setValue: UseFormSetValue<FieldValues>;
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
}: SearchFieldProps): ReactElement => {
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
                    showLabelAndUpdater={false}
                />
            </div>
            <div className="w-3 mr-4 flex items-center transform hover:scale-110 transition-transform">
                {showClearButton && (
                    <Button
                        svg={<CloseLogo className="w-3 h-3" fill={iconResetColor} />}
                        fCallback={() => reset && reset()}
                    />
                )}
            </div>
            <IconSearch fill={iconSearchColor} className="w-5 mr-3" />
        </div>
    );
};

export default SearchField;
