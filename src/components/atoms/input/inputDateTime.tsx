import React, { ReactElement, useEffect, useReducer, useRef, useState } from "react";
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { format, isEqual, isAfter } from "date-fns";
import DatePicker, { registerLocale } from "react-datepicker";
import { fr, enGB, enUS } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import inputReducer from "../../utils/reducers/inputReducer";
import Updater from "../updater";

interface Props {
    className?: string;
    defaultValue: Date;
    dotClassName?: string;
    errorMessage?: string;
    fCallBack?: (date: Date | null) => void;
    inputClassName?: string;
    isError?: boolean;
    isUpdateField?: boolean;
    label?: string;
    labelClassName?: string;
    lang?: string;
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

registerLocale("en-GB", enGB);
registerLocale("en-US", enUS);
registerLocale("fr-FR", fr);

const InputDateTime = ({
    className,
    defaultValue,
    dotClassName,
    fCallBack,
    inputClassName,
    isError,
    isUpdateField = false,
    label,
    labelClassName,
    lang,
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
    errorMessage,
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
    }, [state.updated, state.previous]);

    return (
        <label className={`${className ? className : "w-full"}`} data-testid="inputDateTime-body">
            {(isUpdateField || isError || label) && (
                <div className={`h-6 flex justify-between`}>
                    <p className={`${labelClassName ? labelClassName : "text-white"}`}>{label}</p>
                    <div className={`${dotClassName ? dotClassName : ""}`}>
                        {(isUpdateField || isError) && (
                            <Updater
                                errorMessage={errorMessage}
                                isCancelable={state.isCancelable}
                                isUpdate={state.isCooldown}
                                isSuccess={state.isSuccess}
                                isError={isError}
                                trigger={state.trigger}
                                fCallBackCancel={(): void => {
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
            )}
            <DatePicker
                className={`
                    ${
                        inputClassName
                            ? inputClassName
                            : "bg-neo-bg-B rounded py-3 px-1 text-center text-white text-xs w-full"
                    }`}
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
                locale={lang}
            />
        </label>
    );
};

export default InputDateTime;
