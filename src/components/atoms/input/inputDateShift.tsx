import React, { ReactElement, useState, useEffect } from "react";
import { FieldValues, UseFormGetValues, UseFormRegister, UseFormSetValue } from "react-hook-form";

import InputDateTime from "./inputDateTime";
import InputSelect from "./inputSelect";

interface Props {
    register: UseFormRegister<FieldValues>;
    setValue?: UseFormSetValue<FieldValues>;
    getValues: UseFormGetValues<FieldValues>;
    refForm: string;
    required: boolean;
    tabProps: Array<{ id: number; value: string }>;
    label: string;
    date: Date;
    isUpdateField?: boolean;
    updateFunction?: (refForm: string, value: string) => void;
    maxDate?: Date;
    minDate?: Date;
}

const InputDateShift = ({
    register,
    setValue,
    getValues,
    tabProps,
    label,
    date,
    refForm,
    isUpdateField = false,
    updateFunction,
    maxDate,
    minDate,
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
        <div className="flex justify-between items-center w-full text-neo_blue-light text-xs font-bold">
            <div className="w-1/2 flex justify-between">
                <InputDateTime
                    defaultValue={dateShift}
                    label={label}
                    refForm={refForm}
                    register={register}
                    setValue={setValue}
                    targetId={Math.round(dateShift.getTime() / 1000)}
                    fCallBack={(data) => {
                        setDateAdd(data);
                        setValue && setValue("select-" + refForm, -1);
                    }}
                    isUpdateField={isUpdateField}
                    updateFunction={updateFunction}
                    maxDate={maxDate}
                    minDate={minDate}
                />
            </div>
            <div className="w-1/2">
                <InputSelect
                    data={tabProps}
                    setStateValue={(value) => updateDate(value)}
                    refForm={"select-" + refForm}
                    defaultValue={-1}
                    setValue={setValue}
                    register={register}
                    targetId={
                        Math.round(dateAdd ? dateAdd.getTime() / 1000 : 0) ||
                        Math.round(date ? date.getTime() / 1000 : 0)
                    }
                    isUpdateField={isUpdateField}
                    updateFunction={() => updateFunction && updateFunction(refForm, getValues(refForm))}
                />
            </div>
        </div>
    );
};

export default InputDateShift;
