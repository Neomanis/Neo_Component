import React, { ReactElement, useState, useEffect } from "react";
import { FieldValues, UseFormGetValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { GroupBase, StylesConfig } from "react-select";

import InputDateTime from "./inputDateTime";
import InputSelectSearchable from "./inputSelectSearchable";

interface Props {
    classNames?: {
        container?: string;
        inputDateTime?: string;
        inputDateTimeDot?: string;
        inputDateTimeInput?: string;
        inputDateTimeLabel?: string;
        inputSelect?: string;
        inputSelectCustomStyle?: StylesConfig<
            { label: string; value: number },
            boolean,
            GroupBase<{ label: string; value: number }>
        >;
        inputSelectDot?: string;
    };
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
    classNames,
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dateAdd]);

    return (
        <div className={`${classNames?.container}`} data-testid="inputDateShift-body">
            <InputDateTime
                className={`${classNames?.inputDateTime}`}
                inputClassName={`${classNames?.inputDateTimeInput}`}
                labelClassName={`${classNames?.inputDateTimeLabel}`}
                dotClassName={`${classNames?.inputDateTimeDot}`}
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
            <InputSelectSearchable
                dotClassName={`${classNames?.inputSelectDot}`}
                containerClassName={`${classNames?.inputSelect}`}
                customStyleOverride={classNames?.inputSelectCustomStyle}
                isSearchable={false}
                data={tabProps}
                placeholder={inputSelectPlaceholder}
                isUpdateField={isUpdateField}
                refForm={"select-" + refForm}
                register={register}
                setStateValue={(value) => updateDate(value)}
                setValue={setValue}
                targetId={
                    Math.round(dateAdd ? dateAdd.getTime() / 1000 : 0) || Math.round(date ? date.getTime() / 1000 : 0)
                }
                updateFunction={() => updateFunction && updateFunction(refForm, getValues(refForm))}
            />
        </div>
    );
};

export default InputDateShift;
