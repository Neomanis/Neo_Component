import React, { ReactElement, useEffect, useMemo, useRef, useState } from "react";
import { UseFormReturn, useController } from "react-hook-form";
import { isEqual, startOfDay, endOfDay, format } from "date-fns";
import { enGB, enUS, fr } from "date-fns/locale";
import DatePicker, { ReactDatePickerCustomHeaderProps, registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "@neomanis/neo-translation";
import { IconChevron } from "@/img/svg";
import { useInputs } from "@/utils/hooks/useInputs";
import "@/styles/reactDatePicker.css";
import Updater from "../Updater";
import {
    locales,
    getTimeList,
    insertElementInList,
    createHourListElement,
    getListIndexBetweenDates,
} from "./InputDateTimeHelper";
import { classNames } from "@/utils";

export interface InputDateTimeProps {
    formMethods: UseFormReturn;
    refForm: string;
    className?: string;
    inputClassName?: string;
    labelClassName?: string;
    timeInputLabel?: string;
    label?: string;
    maxDate?: Date;
    minDate?: Date;
    maxTime?: Date;
    minTime?: Date;
    required?: boolean;
    updaterClassName?: string;
    errorMessage?: string;
    id?: string;
    isError?: boolean;
    lang?: string;
    pattern?: string;
    placeholder?: string;
    defaultValueShowMonthPicker?: boolean;
    svg?: ReactElement;
    showNowButton?: boolean;
    showTimePicker?: boolean;
    datePickerElementWrapperClassName?: string;
    disabled?: boolean;
    isUpdateField?: boolean;
    updateFunction?: (refForm: string, value: Date | [Date, Date]) => void;
}

type RangeConditionalProps = { isRange?: true; defaultValue?: [Date, Date] } | { isRange?: false; defaultValue?: Date };

registerLocale("en-GB", enGB);
registerLocale("en-US", enUS);
registerLocale("fr-FR", fr);

const InputDateTime = ({
    className = "w-full",
    labelClassName = "text-neo-link uppercase ml-2 font-bold",
    inputClassName = "bg-neo-bg-B font-bold rounded py-3 pl-4 text-white text-sm w-full text-bold",
    defaultValue,
    updaterClassName = "",
    updateFunction,
    formMethods,
    id,
    isError,
    isUpdateField = false,
    label,
    lang,
    maxDate,
    minDate,
    minTime,
    maxTime,
    placeholder,
    refForm,
    required,
    errorMessage,
    defaultValueShowMonthPicker = false,
    isRange = false,
    svg,
    showNowButton = true,
    showTimePicker = true,
    datePickerElementWrapperClassName = "",
    disabled = false,
}: InputDateTimeProps & RangeConditionalProps): ReactElement => {
    const [showMonthPicker, setShowMonthPicker] = useState<boolean>(defaultValueShowMonthPicker);
    const [state, dispatch] = useInputs(defaultValue);
    const timer = useRef<NodeJS.Timeout | null>(null);
    const [isCalendarOpen, setIsCalenderOpen] = useState(false);

    const { t, i18n } = useTranslation();

    const {
        field: { ref, value, onChange },
    } = useController({
        control: formMethods.control,
        name: refForm,
        rules: { required },
        shouldUnregister: true,
        defaultValue,
    });

    const datesValue = useMemo(() => {
        if (!Array.isArray(value)) {
            return { startDate: value, endDate: null };
        } else {
            return { startDate: value[0], endDate: value[1] };
        }
    }, [value]);

    const customHeader = ({
        monthDate,
        decreaseMonth,
        increaseMonth,
        decreaseYear,
        increaseYear,
    }: ReactDatePickerCustomHeaderProps) => (
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

            <IconChevron
                onClick={() => (!showMonthPicker ? increaseMonth() : increaseYear())}
                width={12}
                className="transform -rotate-90 hover:scale-110 transition-all hover:cursor-pointer"
                fill="#FFF"
            />
        </div>
    );

    function filteredTime(date: Date) {
        if (!minTime && !maxTime) {
            return true;
        } else if (!minTime && maxTime) {
            return date.getTime() < maxTime.getTime();
        } else if (minTime && !maxTime) {
            return date.getTime() > minTime.getTime();
        } else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return date.getTime() > minTime!.getTime() && date.getTime() < maxTime!.getTime();
        }
    }

    function handleChangeSingle(value: Date) {
        onChange(value);
        if (isUpdateField) {
            timer.current !== null && clearTimeout(timer.current);
            if (!isEqual(value, state.previous as Date)) {
                dispatch({ type: "UPDATING", payload: value });
                timer.current = setTimeout(() => {
                    updateFunction && updateFunction(refForm, value);
                    dispatch({ type: "UPDATE_SUCCESS" });
                    timer.current = setTimeout(() => {
                        dispatch({ type: "CLEAR_SUCCESS" });
                    }, 3000);
                }, 5000);
            } else {
                dispatch({ type: "CANCEL_UPDATE" });
            }
        }
    }

    function handleChangeArray(value: [Date, Date]) {
        const start = startOfDay(value[0]);
        const end = value[1] === null ? value[1] : endOfDay(value[1]);
        onChange([start, end]);
        if (isUpdateField && Array.isArray(state.previous)) {
            timer.current !== null && clearTimeout(timer.current);
            if (!isEqual(start, state.previous[0]) || !isEqual(end, state.previous[1])) {
                dispatch({ type: "UPDATING", payload: value });
                timer.current = setTimeout(() => {
                    updateFunction && updateFunction(refForm, [start, end]);
                    dispatch({ type: "UPDATE_SUCCESS" });
                    timer.current = setTimeout(() => {
                        dispatch({ type: "CLEAR_SUCCESS" });
                    }, 3000);
                }, 5000);
            } else {
                dispatch({ type: "CANCEL_UPDATE" });
            }
        }
    }

    function handleNowButton() {
        handleTimeValue(new Date());
        onChange(isRange ? [new Date(), new Date()] : new Date());
    }

    const dateTimeFormat = i18n.language === "en-GB" ? "h:mm a" : "HH:mm";
    function handleTimeValue(value: Date) {
        const date = format(value, dateTimeFormat, { locale: locales[i18n.language as keyof typeof locales] });
        const { dates, timeList } = getTimeList();
        if (!dates.includes(date) && timeList) {
            const indexToInsert = getListIndexBetweenDates(
                dates,
                value,
                dateTimeFormat,
                i18n.language as keyof typeof locales
            );
            if (indexToInsert !== undefined) {
                insertElementInList(timeList, createHourListElement(date), indexToInsert);
            }
        }
    }

    useEffect(() => {
        if (isCalendarOpen && defaultValue && !Array.isArray(defaultValue) && isEqual(defaultValue, value)) {
            handleTimeValue(defaultValue);
        }
        const nowButton = document.querySelector(".react-datepicker__today-button");
        if (nowButton) {
            nowButton.addEventListener("click", handleNowButton);

            return () => {
                nowButton.removeEventListener("click", handleNowButton);
            };
        }
    }, [isCalendarOpen, defaultValue, value]);

    useEffect(() => {
        dispatch({ type: "RESET", payload: defaultValue });
        onChange(defaultValue === undefined ? null : defaultValue);
    }, [defaultValue]);

    const inputForm: Date | [Date, Date] = formMethods.watch(refForm);
    useEffect(() => {
        if (inputForm) {
            if (Array.isArray(inputForm)) {
                handleChangeArray(inputForm);
            } else {
                handleChangeSingle(inputForm);
                handleTimeValue(inputForm);
            }
        }
    }, [inputForm]);

    useEffect(() => {
        return () => {
            timer.current && clearTimeout(timer.current);
        };
    }, []);

    return (
        <label className={classNames(className)} data-testid="inputDateTime-body">
            {(isUpdateField || isError || label) && (
                <div className="h-6 flex justify-between">
                    <p className={labelClassName}>{label}</p>
                    <div className={updaterClassName}>
                        {(isUpdateField || isError) && (
                            <Updater
                                errorMessage={errorMessage}
                                isCancelable={state.isCancelable}
                                isUpdate={state.isCooldown}
                                isSuccess={state.isSuccess}
                                isError={isError}
                                trigger={state.trigger}
                                fCallBackCancel={(): void => {
                                    formMethods.setValue(refForm, state.previous);
                                    clearTimeout(state.timeoutId);
                                    dispatch({ type: "CANCEL_UPDATE" });
                                }}
                                id={"updater-" + id}
                            />
                        )}
                    </div>
                </div>
            )}
            <div className={classNames(datePickerElementWrapperClassName)}>
                {svg && svg}
                <DatePicker
                    {...(showNowButton && { todayButton: t("global.now") })}
                    className={inputClassName}
                    calendarClassName="bg-custom-date-picker"
                    renderCustomHeader={customHeader}
                    timeClassName={() => "bg-neo-stats-black"}
                    timeCaption={t("date.hour_one")}
                    showTimeSelect={!isRange && showTimePicker}
                    timeIntervals={30}
                    placeholderText={placeholder}
                    required={required}
                    selected={datesValue.startDate}
                    maxDate={maxDate}
                    minDate={minDate}
                    filterTime={filteredTime}
                    dateFormat={isRange ? "P" : "Pp"}
                    timeFormat="p"
                    locale={lang}
                    showMonthYearPicker={showMonthPicker}
                    selectsRange={isRange}
                    onChange={(dates: Date | [Date, Date]) => {
                        if (Array.isArray(dates)) {
                            handleChangeArray(dates);
                        } else {
                            handleChangeSingle(dates);
                            handleTimeValue(dates);
                        }
                    }}
                    onCalendarOpen={() => setIsCalenderOpen(true)}
                    onCalendarClose={() => setIsCalenderOpen(false)}
                    startDate={datesValue.startDate}
                    endDate={datesValue.endDate}
                    ref={ref}
                    disabled={disabled}
                    id={id}
                />
            </div>
        </label>
    );
};

export default InputDateTime;
