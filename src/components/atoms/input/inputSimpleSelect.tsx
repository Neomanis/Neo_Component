import React, { ReactElement, useEffect } from "react";
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";

interface Props {
    data: { label: string; value: string }[];
    defaultValue?: string;
    label?: string;
    className?: string;
    labelClassName?: string;
    optionClassName?: string;
    refForm?: string;
    register?: UseFormRegister<FieldValues>;
    required?: boolean;
    selectClassName?: string;
    setValue?: UseFormSetValue<FieldValues>;
    onChangeCallBack?: (e: string) => void;
    placeholder?: string;
}

const InputSimpleSelect = ({
    data,
    defaultValue,
    label,
    className,
    labelClassName,
    optionClassName,
    refForm,
    register,
    required,
    setValue,
    selectClassName,
    onChangeCallBack,
    placeholder,
}: Props): ReactElement => {
    const inputRegister =
        refForm &&
        register &&
        register(refForm, {
            required,
            validate: (value) => (required ? value !== "" : true),
        });

    useEffect(() => {
        refForm && setValue && setValue(refForm, defaultValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <label className={`flex items-center w-full my-1 ${className}`}>
            {label && <div className={`text-neo_blue-light text-xs font-bold w-2/4 ${labelClassName}`}>{label}</div>}
            <select
                {...inputRegister}
                className={`w-full bg-neo_blue p-2 rounded truncate ${selectClassName}`}
                defaultValue={defaultValue}
                onChange={(e): void => {
                    onChangeCallBack && onChangeCallBack(e.target.value);
                    refForm && inputRegister && inputRegister.onChange(e);
                }}
            >
                {defaultValue === undefined && (
                    <option className={`${optionClassName}`} value={""} key={-1}>
                        {placeholder}
                    </option>
                )}
                {data
                    ? data.map((data, key) => (
                          <option className={`${optionClassName}`} key={key} value={data.value}>
                              {data.label}
                          </option>
                      ))
                    : null}
            </select>
        </label>
    );
};

export default InputSimpleSelect;
