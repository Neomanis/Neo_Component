import React, { ReactElement, useEffect, useReducer, useRef, useState } from "react";
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { format, isEqual, isAfter } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Dot from "../dot";
import inputReducer from "../../utils/reducers/inputReducer";
interface Props {
    defaultValue: Date;
    dotPosition?: string;
    errorMessage?: string;
    fCallBack?: (date: Date | null) => void;
    isError?: boolean;
    isUpdateField?: boolean;
    label?: string;
    maxDate?: Date;
    minDate?: Date;
    pattern?: string;
    placeholder?: string;
    refForm: string;
    register?: UseFormRegister<FieldValues>;
    required?: boolean;
    setValue?: UseFormSetValue<FieldValues>;
    showTimeInput?: boolean;
    targetId?: number | undefined;
    timerSetting?: number;
    updateFunction?: (refForm: string, value: string) => void;
}

const InputDateTime = ({
    defaultValue,
    dotPosition,
    errorMessage,
    fCallBack,
    isError,
    isUpdateField = false,
    label,
    maxDate,
    minDate,
    placeholder,
    refForm,
    register,
    required,
    setValue,
    showTimeInput,
    targetId,
    timerSetting = 5000,
    updateFunction,
}: Props): ReactElement => {
    const [startDate, setStartDate] = useState<Date | null>(defaultValue);
    const [state, dispatch] = useReducer(inputReducer, {
        isCancelable: false,
        isCooldown: false,
        isSuccess: false,
        previous: defaultValue,
        timeoutId: undefined,
        trigger: false,
        updated: defaultValue,
    });

    const isLastMount = useRef(false);

    useEffect(() => {
        register &&
            register(refForm, {
                required,
                validate: (value: Date) => (maxDate ? (isAfter(value, maxDate) ? false : true) : true),
            });
        dispatch({ type: "RESET", payload: defaultValue as Date });
        setValue && setValue(refForm, defaultValue);
        setStartDate(defaultValue);
        return () => {
            isLastMount.current = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [targetId]);

    useEffect(() => {
        if (
            state.updated &&
            isUpdateField &&
            state.updated !== state.previous &&
            (maxDate ? !isAfter(state.updated as Date, maxDate) : true)
        ) {
            const newTimeout = setTimeout((): void => {
                if (updateFunction) {
                    updateFunction(refForm, `${format(state.updated as Date, "yyyy-MM-dd HH:mm")}:00`);
                    dispatch({ type: "UPDATE_SUCCESS" });
                    setTimeout(() => {
                        dispatch({ type: "CLEAR_SUCCESS" });
                    }, 3000);
                }
            }, timerSetting);
            dispatch({ type: "SET_TIMEOUT", payload: newTimeout });
            return () => {
                if (isLastMount.current) {
                    clearTimeout(newTimeout);
                    updateFunction &&
                        updateFunction(refForm, `${format(state.updated as Date, "yyyy-MM-dd HH:mm")}:00`);
                    isLastMount.current = false;
                }
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.updated, state.previous]);

    return (
        <div className="flex items-center w-full">
            <label className="flex items-center justify-between w-full">
                <div className="text-white text-xs font-bold w-full">{label}</div>
                <DatePicker
                    className="mx-3 bg-neo_bg_B text-white border-2 border-neo_light_grey rounded py-1 w-32 text-center text-xs"
                    placeholderText={placeholder}
                    required={required}
                    selected={startDate}
                    showTimeSelect
                    showTimeInput={showTimeInput ? showTimeInput : false}
                    onChange={(date: Date | null): void => {
                        fCallBack && fCallBack(date);
                        setStartDate(date);
                        setValue && setValue(refForm, date, { shouldValidate: true });
                        if (isUpdateField) {
                            if (date && !isError) {
                                if (!isEqual(state.previous as Date, date)) {
                                    dispatch({ type: "UPDATING", payload: date });
                                } else {
                                    dispatch({ type: "CANCEL_UPDATE" });
                                }
                            } else {
                                dispatch({ type: "SHOW_DOT" });
                            }
                            if (state.timeoutId) {
                                clearTimeout(state.timeoutId);
                            }
                        }
                    }}
                    maxDate={maxDate}
                    minDate={minDate}
                    dateFormat="yyyy/MM/dd HH:mm"
                    timeFormat="HH:mm"
                    timeIntervals={15}
                />
            </label>
            <div className="w-5">
                {(isError || state.isCancelable || state.isSuccess) && (
                    <Dot
                        errorMessage={errorMessage}
                        isCancelable={state.isCancelable}
                        isCooldown={state.isCooldown}
                        isSuccess={state.isSuccess}
                        isUpdateField={isUpdateField}
                        isError={isError}
                        positionClassname={dotPosition}
                        trigger={state.trigger}
                        onClickCallback={(): void => {
                            if (setValue && state.previous) {
                                setValue(refForm, state.previous);
                                setStartDate(state.previous as Date);
                            }
                            if (state.timeoutId) {
                                clearTimeout(state.timeoutId);
                            }
                            dispatch({ type: "CANCEL_UPDATE" });
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default InputDateTime;
