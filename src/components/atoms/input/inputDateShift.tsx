import React, { ReactElement, useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { fr, enGB, enUS } from "date-fns/locale";

import InputDateTime from "./inputDateTime";
import { registerLocale } from "react-datepicker";
import InputSelect from "./inputSelect";

interface Props {
    className?: string;
    classNameInputDate?: string;
    classNameInputSelect?: string;
    date: Date;
    formMethods: UseFormReturn;
    inputSelectPlaceholder?: string;
    isUpdateField?: boolean;
    label: string;
    lang?: string;
    maxDate?: Date;
    minDate?: Date;
    refForm: string;
    tabProps: Array<{ value: number; label: string }>;
    updateFunctionDateTime?: (refForm: string, value: Date | [Date, Date]) => void;
    updateFunctionDateShift?: (refForm: string, value: string) => void;
}

registerLocale("en-GB", enGB);
registerLocale("en-US", enUS);
registerLocale("fr-FR", fr);

const InputDateShift = ({
    className,
    classNameInputDate,
    classNameInputSelect,
    date,
    formMethods,
    inputSelectPlaceholder,
    isUpdateField = false,
    label,
    lang,
    maxDate,
    minDate,
    refForm,
    tabProps,
    updateFunctionDateTime,
    updateFunctionDateShift,
}: Props): ReactElement => {
    const [dateShift, setDateShift] = useState(date);
    const [dateAdd, setDateAdd] = useState<Date | null>();
    const { setValue, register, getValues, watch } = formMethods;

    function updateDate(event: number): void {
        const newDate = Math.round(dateAdd ? dateAdd.getTime() / 1000 : date.getTime() / 1000) + event;
        setValue && setValue(refForm, new Date(newDate * 1000));
        setDateShift(new Date(newDate * 1000));
    }

    useEffect(() => {
        const subscription = watch((data, { name, type }) => {
            if (name === `select-${refForm}` && type === "change") {
                updateDate(data[`select-${refForm}`].value);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    useEffect(() => {
        setDateShift(date);
    }, [date]);

    useEffect(() => {
        setValue && setValue("select", -1);
    }, [dateAdd]);

    return (
        <div className={`${className ? className : "flex w-full"}`} data-testid="inputDateShift-body">
            <div className={classNameInputDate ? classNameInputDate : "w-52 mr-14"}>
                {/* <InputDateTime
                    // labelClassName="text-xs font-bold text-white"
                    formMethods={formMethods}
                    // isUpdateField={isUpdateField}
                    // label={label}
                    // maxDate={maxDate}
                    // minDate={minDate}
                    refForm={refForm}
                    // updateFunction={updateFunctionDateTime}
                    // lang={lang}
                /> */}
            </div>
            <div className={classNameInputSelect ? classNameInputSelect : "w-32"}>
                <InputSelect
                    placeholder={inputSelectPlaceholder}
                    isUpdateField={isUpdateField}
                    refForm={"select-" + refForm}
                    formMethods={formMethods}
                    updateFunction={() => updateFunctionDateShift(refForm, getValues(refForm))}
                    options={tabProps}
                />
            </div>
        </div>
    );
};

export default InputDateShift;
