import React, { ReactElement, useEffect } from "react";
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";

interface Props {
    className?: string;
    data: { label: string; value: string }[];
    defaultValue?: string;
    label?: string;
    labelClassName?: string;
    onChangeCallBack?: (e: string) => void;
    optionClassName?: string;
    placeholder?: string;
    refForm?: string;
    register?: UseFormRegister<FieldValues>;
    required?: boolean;
    selectClassName?: string;
    setValue?: UseFormSetValue<FieldValues>;
}

const InputSimpleSelect = ({
    className,
    data,
    defaultValue,
    label,
    labelClassName,
    onChangeCallBack,
    optionClassName,
    placeholder,
    refForm,
    register,
    required,
    selectClassName,
    setValue,
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
            {label && <div className={`text-white text-xs font-bold w-2/4 ${labelClassName}`}>{label}</div>}
            <select
                {...inputRegister}
                className={`w-full bg-neo-bg-B p-2 rounded truncate text-white  ${selectClassName}`}
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
