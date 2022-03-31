import React, { ReactElement, useState, useEffect } from "react";
import { FieldValues, UseFormGetValues, UseFormRegister, UseFormSetValue } from "react-hook-form";

import InputDateTime from "./inputDateTime";
import InputSelectSearchable from "./inputSelectSearchable";

interface Props {
    className?: string;
    classNameInputDate?: string;
    classNameInputSelect?: string;
    date: Date;
    getValues?: UseFormGetValues<FieldValues>;
    inputSelectPlaceholder?: string;
    isUpdateField?: boolean;
    label: string;
    maxDate?: Date;
    minDate?: Date;
    refForm: string;
    register?: UseFormRegister<FieldValues>;
    setValue?: UseFormSetValue<FieldValues>;
    tabProps: Array<{ value: number; label: string }>;
    updateFunction?: (refForm: string, value: string) => void;
}

const InputDateShift = ({
    className,
    classNameInputDate,
    classNameInputSelect,
    date,
    getValues,
    inputSelectPlaceholder,
    isUpdateField = false,
    label,
    maxDate,
    minDate,
    refForm,
    register,
    setValue,
    tabProps,
    updateFunction,
}: Props): ReactElement => {
    const [dateShift, setDateShift] = useState(date);
    const [dateAdd, setDateAdd] = useState<Date | null>();

    function updateDate(event: number): void {
        const newDate = Math.round(dateAdd ? dateAdd.getTime() / 1000 : date.getTime() / 1000) + event;
        setValue && setValue(refForm, new Date(newDate * 1000));
        setDateShift(new Date(newDate * 1000));
    }

    useEffect(() => {
        setDateShift(date);
    }, [date]);

    useEffect(() => {
        setValue && setValue("select", -1);
    }, [dateAdd]);

    return (
        <div className={`${className ? className : "flex w-full"}`} data-testid="inputDateShift-body">
            <div className={classNameInputDate ? classNameInputDate : "w-52 mr-14"}>
                <InputDateTime
                    labelClassName="text-xs font-bold text-white"
                    defaultValue={dateShift}
                    fCallBack={(data) => {
                        setDateAdd(data);
                        setValue && setValue("select-" + refForm, -1);
                    }}
                    isUpdateField={isUpdateField}
                    label={label}
                    maxDate={maxDate}
                    minDate={minDate}
                    refForm={refForm}
                    register={register}
                    setValue={setValue}
                    targetId={Math.round(dateShift.getTime() / 1000)}
                    updateFunction={updateFunction}
                />
            </div>
            <div className={classNameInputSelect ? classNameInputSelect : "w-32"}>
                <InputSelectSearchable
                    isSearchable={false}
                    data={tabProps}
                    label={" "}
                    placeholder={inputSelectPlaceholder}
                    isUpdateField={isUpdateField}
                    refForm={"select-" + refForm}
                    register={register}
                    setStateValue={(value) => updateDate(value)}
                    setValue={setValue}
                    targetId={
                        Math.round(dateAdd ? dateAdd.getTime() / 1000 : 0) ||
                        Math.round(date ? date.getTime() / 1000 : 0)
                    }
                    updateFunction={() => updateFunction && updateFunction(refForm, getValues(refForm))}
                />
            </div>
        </div>
    );
};

export default InputDateShift;
