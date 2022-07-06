import React, { ReactElement, useEffect, useMemo, useRef, useState } from "react";
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { format, isEqual, isAfter, isBefore } from "date-fns";
import DatePicker, { registerLocale } from "react-datepicker";
import { fr, enGB, enUS } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import Updater from "../updater";
import { ClockLogo, IconChevron } from "../../../img/svg";
import { getHexColorFromTailwindColor } from "../../utils";
import { useInputs } from "../../utils/hooks/useInputs";

interface Props {
    className?: string;
    dotClassName?: string;
    errorMessage?: string;
    fCallBack?: (date: Date | [Date, Date]) => void;
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
    refForm?: string;
    register?: UseFormRegister<FieldValues>;
    required?: boolean;
    setValue?: UseFormSetValue<FieldValues>;
    targetId?: number | undefined;
    timerSetting?: number;
    updateFunction?: (refForm: string, value: string) => void;
    defaultValueShowMonthPicker?: boolean;
    defaultShowTimePicker?: boolean;
}

type ConditionalProps = { isRange?: true; defaultValue: [Date, Date] } | { isRange?: false; defaultValue: Date };

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
    targetId,
    timerSetting = 5000,
    updateFunction,
    errorMessage,
    defaultValueShowMonthPicker,
    defaultShowTimePicker,
    isRange,
}: Props & ConditionalProps): ReactElement => {
    const typedDefaultValue = useMemo(() => {
        if (isRange === true) {
            return defaultValue[0];
        }
        if (isRange === false) {
            return defaultValue;
        }
    }, [defaultValue]);

    const [showMonthPicker, setShowMonthPicker] = useState<boolean>(defaultValueShowMonthPicker);
    const [showTimePicker, setShowTimePicker] = useState<boolean>(defaultShowTimePicker);
    const [startDate, setStartDate] = useState<Date>(typedDefaultValue);
    const [endDate, setEndDate] = useState<Date | null>(isRange ? defaultValue[1] : null);

    const [state, dispatch] = useInputs(defaultValue);

    const isLastMount = useRef(false);

    useEffect(() => {
        register &&
            register(refForm, {
                required,
                validate: {
                    maxDate: (value) => {
                        if (!maxDate) {
                            return true;
                        }
                        if (isRange) {
                            return isBefore(value[0], maxDate) && isBefore(value[1], maxDate);
                        } else {
                            return isBefore(value, maxDate);
                        }
                    },
                    minDate: (value) => {
                        if (!minDate) {
                            return true;
                        }
                        if (isRange) {
                            return isAfter(value[0], minDate);
                        } else {
                            return isAfter(value, minDate);
                        }
                    },
                },
            });
        dispatch({ type: "RESET", payload: defaultValue });
        setValue && setValue(refForm, defaultValue);
        setStartDate(typedDefaultValue);
        isRange && setEndDate(defaultValue[1]);
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
                    if (isRange) {
                        updateFunction(
                            refForm,
                            `${format(state.updated[0] as Date, "yyyy-MM-dd HH:mm")}:00` +
                                `${format(state.updated[1] as Date, "yyyy-MM-dd HH:mm")}:00`
                        );
                    } else {
                        updateFunction(refForm, `${format(state.updated as Date, "yyyy-MM-dd HH:mm")}:00`);
                    }
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
                    if (updateFunction) {
                        if (isRange) {
                            updateFunction(
                                refForm,
                                `${format(state.updated[0] as Date, "yyyy-MM-dd HH:mm")}:00` +
                                    `${format(state.updated[1] as Date, "yyyy-MM-dd HH:mm")}:00`
                            );
                        } else {
                            updateFunction(refForm, `${format(state.updated as Date, "yyyy-MM-dd HH:mm")}:00`);
                        }
                    }
                    isLastMount.current = false;
                }
            };
        }
    }, [state.updated, state.previous]);

    const customHeader = ({ monthDate, decreaseMonth, increaseMonth, decreaseYear, increaseYear }) => (
        <div className="text-white flex items-center justify-between bg-neo-stats-black px-4">
            <IconChevron
                onClick={() => (!showMonthPicker ? decreaseMonth() : decreaseYear())}
                width={12}
                className="transform rotate-90 hover:scale-110 transition-all hover:cursor-pointer"
                fill="#FFF"
            />
            <div
                onClick={() => {
                    setShowMonthPicker(!showMonthPicker);
                    setShowTimePicker(false);
                }}
                className="relative text-base mx-4 hover:cursor-pointer hover:text-neo-red transform hover:scale-110 transition-all"
            >
                {!showMonthPicker && (
                    <span className="mr-2">
                        {monthDate.toLocaleString(lang, {
                            month: "short",
                        })}
                    </span>
                )}
                <span>
                    {monthDate.toLocaleString(lang, {
                        year: "numeric",
                    })}
                </span>
            </div>
            {!showMonthPicker && startDate && (
                <ClockLogo
                    onClick={() => setShowTimePicker(!showTimePicker)}
                    fill={showTimePicker ? getHexColorFromTailwindColor("neo-red") : "#FFF"}
                    width={12}
                    className="absolute transform right-12 hover:scale-110 transition-all hover:cursor-pointer"
                />
            )}
            <IconChevron
                onClick={() => (!showMonthPicker ? increaseMonth() : increaseYear())}
                width={12}
                className="transform -rotate-90 hover:scale-110 transition-all hover:cursor-pointer"
                fill="#FFF"
            />
        </div>
    );
    const customDay = (day: number) => <p onClick={() => setShowTimePicker(false)}>{day}</p>;

    const onChange = (dates: Date | [Date, Date]) => {
        fCallBack && fCallBack(dates);
        setValue && setValue(refForm, dates, { shouldValidate: true });
        if (Array.isArray(dates)) {
            setStartDate(dates[0]);
            setEndDate(dates[1]);
            if (isUpdateField) {
                if (!isError) {
                    if (dates[1]) {
                        if (!isEqual(state.previous[0], dates[0]) && !isEqual(state.previous[1], dates[1])) {
                            dispatch({ type: "UPDATING", payload: [dates[0], dates[1]] });
                        } else {
                            dispatch({ type: "CANCEL_UPDATE" });
                        }
                    } else {
                        dispatch({ type: "CANCEL_UPDATE" });
                    }
                } else {
                    dispatch({ type: "SHOW_DOT" });
                }
            }
        } else {
            setStartDate(dates);
            if (isUpdateField) {
                if (!isEqual(state.previous as Date, dates)) {
                    dispatch({ type: "UPDATING", payload: dates });
                } else {
                    dispatch({ type: "CANCEL_UPDATE" });
                }
            }
        }
        if (state.timeoutId) {
            clearTimeout(state.timeoutId);
        }
    };

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
                                        if (isRange) {
                                            setStartDate(state.previous[0] as Date);
                                            setEndDate(state.previous[1] as Date);
                                        } else {
                                            setStartDate(state.previous as Date);
                                        }
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
                calendarClassName="bg-custom-date-picker"
                renderCustomHeader={customHeader}
                renderDayContents={customDay}
                placeholderText={placeholder}
                required={required}
                selected={startDate}
                maxDate={maxDate}
                minDate={minDate}
                dateFormat="yyyy/MM/dd HH:mm"
                timeFormat="HH:mm"
                locale={lang}
                showMonthYearPicker={showMonthPicker}
                showTimeInput={showTimePicker}
                selectsRange={isRange}
                onChange={onChange}
                onCalendarClose={() => {
                    if (isRange && endDate === null) {
                        setStartDate(defaultValue[0]);
                        setEndDate(defaultValue[1]);
                    }
                }}
                startDate={startDate}
                endDate={endDate}
                timeInputLabel=""
            />
        </label>
    );
};

export default InputDateTime;
