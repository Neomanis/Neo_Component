import React, { ReactElement, useEffect, useMemo, useRef, useState } from "react";
import { UseFormReturn, useController } from "react-hook-form";
import { isEqual } from "date-fns";
import DatePicker, { registerLocale } from "react-datepicker";
import { fr, enGB, enUS } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import Updater from "../updater";
import { ClockLogo, IconChevron } from "../../../img/svg";
import { getHexColorFromTailwindColor } from "../../utils";
import { useInputs } from "../../utils/hooks/useInputs";

interface Props {
    className?: string;
    inputClassName?: string;
    labelClassName?: string;
    timeInputLabel?: string;
    label?: string;
    maxDate?: Date;
    minDate?: Date;
    refForm?: string;
    required?: boolean;
    formMethods: UseFormReturn;
    isUpdateField?: boolean;
    dotClassName?: string;
    errorMessage?: string;
    isError?: boolean;
    lang?: string;
    pattern?: string;
    placeholder?: string;
    updateFunction?: (refForm: string, value: Date | [Date, Date]) => void;
    defaultValueShowMonthPicker?: boolean;
    defaultShowTimePicker?: boolean;
}

type ConditionalProps = { isRange?: true; defaultValue: [Date, Date] } | { isRange?: false; defaultValue: Date };

registerLocale("en-GB", enGB);
registerLocale("en-US", enUS);
registerLocale("fr-FR", fr);

const InputDateTime = ({
    className = "w-full",
    labelClassName = "text-white",
    inputClassName = "bg-neo-bg-B rounded py-3 px-1 text-center text-white text-xs w-full",
    timeInputLabel = "",
    defaultValue,
    dotClassName = "",
    updateFunction,
    formMethods,
    isError,
    isUpdateField = false,
    label,
    lang,
    maxDate,
    minDate,
    placeholder,
    refForm,
    required,
    errorMessage,
    defaultValueShowMonthPicker,
    defaultShowTimePicker,
    isRange = false,
}: Props & ConditionalProps): ReactElement => {
    const [showMonthPicker, setShowMonthPicker] = useState<boolean>(defaultValueShowMonthPicker);
    const [showTimePicker, setShowTimePicker] = useState<boolean>(defaultShowTimePicker);

    const [state, dispatch] = useInputs(defaultValue);
    const isLastMount = useRef(null);

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
            {!showMonthPicker && value && (
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

    function handleChange(value: Date | [Date, Date]) {
        onChange(value);
        if (isUpdateField) {
            clearTimeout(isLastMount.current);
            if (Array.isArray(value)) {
                if (!isEqual(value[0], state.previous[0]) || !isEqual(value[1], state.previous[1])) {
                    dispatch({ type: "UPDATING", payload: value });
                    isLastMount.current = setTimeout(() => {
                        updateFunction(refForm, value);
                        dispatch({ type: "UPDATE_SUCCESS" });
                        isLastMount.current = setTimeout(() => {
                            dispatch({ type: "CLEAR_SUCCESS" });
                        }, 3000);
                    }, 5000);
                } else {
                    dispatch({ type: "CANCEL_UPDATE" });
                }
            } else {
                if (!isEqual(value, state.previous as Date)) {
                    dispatch({ type: "UPDATING", payload: value });
                    isLastMount.current = setTimeout(() => {
                        updateFunction(refForm, value);
                        dispatch({ type: "UPDATE_SUCCESS" });
                        isLastMount.current = setTimeout(() => {
                            dispatch({ type: "CLEAR_SUCCESS" });
                        }, 3000);
                    }, 5000);
                } else {
                    dispatch({ type: "CANCEL_UPDATE" });
                }
            }
        } else {
            updateFunction(refForm, value);
        }
    }

    useEffect(() => {
        dispatch({ type: "RESET", payload: defaultValue });
        onChange(defaultValue === undefined ? null : defaultValue);
    }, [defaultValue]);

    useEffect(() => {
        formMethods.setValue(refForm, defaultValue);
    }, []);

    return (
        <label className={className} data-testid="inputDateTime-body">
            {(isUpdateField || isError || label) && (
                <div className={`h-6 flex justify-between`}>
                    <p className={labelClassName}>{label}</p>
                    <div className={dotClassName}>
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
                            />
                        )}
                    </div>
                </div>
            )}
            <DatePicker
                className={inputClassName}
                calendarClassName="bg-custom-date-picker"
                renderCustomHeader={customHeader}
                renderDayContents={customDay}
                placeholderText={placeholder}
                required={required}
                selected={datesValue.startDate}
                maxDate={maxDate}
                minDate={minDate}
                dateFormat="yyyy/MM/dd HH:mm"
                timeFormat="HH:mm"
                locale={lang}
                showMonthYearPicker={showMonthPicker}
                showTimeInput={showTimePicker}
                selectsRange={isRange}
                onChange={handleChange}
                startDate={datesValue.startDate}
                endDate={datesValue.endDate}
                timeInputLabel={timeInputLabel}
                ref={ref}
            />
        </label>
    );
};

export default InputDateTime;
