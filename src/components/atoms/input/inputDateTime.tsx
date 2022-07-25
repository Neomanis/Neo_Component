import React, { ReactElement, useEffect, useMemo, useRef, useState } from "react";
import { UseFormReturn, useController } from "react-hook-form";
import { isEqual, startOfDay, endOfDay } from "date-fns";
import DatePicker, { registerLocale } from "react-datepicker";
import { fr, enGB, enUS } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import "./inputDateTime.css";
import Updater from "../updater";
import { IconChevron } from "../../../img/svg";
import { useInputs } from "../../utils/hooks/useInputs";
import { useTranslation } from "@neomanis/neo-translation";
interface Props {
    formMethods: UseFormReturn;
    refForm: string;
    updateFunction: (refForm: string, value: Date | [Date, Date]) => void;
    className?: string;
    inputClassName?: string;
    labelClassName?: string;
    timeInputLabel?: string;
    label?: string;
    maxDate?: Date;
    minDate?: Date;
    required?: boolean;
    isUpdateField?: boolean;
    dotClassName?: string;
    errorMessage?: string;
    isError?: boolean;
    lang?: string;
    pattern?: string;
    placeholder?: string;
    defaultValueShowMonthPicker?: boolean;
    svg?: ReactElement;
    datePickerElementWrapper?: string;
}

type ConditionalProps = { isRange?: true; defaultValue: [Date, Date] } | { isRange?: false; defaultValue: Date };

registerLocale("en-GB", enGB);
registerLocale("en-US", enUS);
registerLocale("fr-FR", fr);

const InputDateTime = ({
    className = "w-full",
    labelClassName = "text-neo-link uppercase ml-2 font-bold",
    inputClassName = "bg-neo-bg-B font-bold rounded py-3 pl-4 text-white text-sm w-full text-bold",
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
    isRange = false,
    svg,
    datePickerElementWrapper = "",
}: Props & ConditionalProps): ReactElement => {
    const [showMonthPicker, setShowMonthPicker] = useState<boolean>(defaultValueShowMonthPicker);
    const [state, dispatch] = useInputs(defaultValue);
    const isLastMount = useRef(null);

    const { t } = useTranslation();

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

    function handleChangeSingle(value: Date) {
        onChange(value);
        if (isUpdateField) {
            clearTimeout(isLastMount.current);
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
        } else {
            updateFunction(refForm, value);
        }
    }

    function handleChangeArray(value: [Date, Date]) {
        const start = startOfDay(value[0]);
        const end = value[1] === null ? value[1] : endOfDay(value[1]);
        onChange([start, end]);
        if (isUpdateField) {
            clearTimeout(isLastMount.current);
            if (!isEqual(start, state.previous[0]) || !isEqual(end, state.previous[1])) {
                dispatch({ type: "UPDATING", payload: value });
                isLastMount.current = setTimeout(() => {
                    updateFunction(refForm, [start, end]);
                    dispatch({ type: "UPDATE_SUCCESS" });
                    isLastMount.current = setTimeout(() => {
                        dispatch({ type: "CLEAR_SUCCESS" });
                    }, 3000);
                }, 5000);
            } else {
                dispatch({ type: "CANCEL_UPDATE" });
            }
        } else {
            updateFunction(refForm, [start, end]);
        }
    }

    useEffect(() => {
        dispatch({ type: "RESET", payload: defaultValue });
        onChange(defaultValue === undefined ? null : defaultValue);
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
            <div className={datePickerElementWrapper}>
                {svg && svg}
                <DatePicker
                    className={inputClassName}
                    calendarClassName="bg-custom-date-picker"
                    renderCustomHeader={customHeader}
                    timeClassName={() => "bg-neo-stats-black text-neo-link"}
                    timeCaption={t("date.hour_one")}
                    timeInputLabel={"neo-link"}
                    showTimeSelect={!isRange}
                    placeholderText={placeholder}
                    required={required}
                    selected={datesValue.startDate}
                    maxDate={maxDate}
                    minDate={minDate}
                    dateFormat={isRange ? "P" : "Pp"}
                    timeFormat="p"
                    locale={lang}
                    showMonthYearPicker={showMonthPicker}
                    selectsRange={isRange}
                    onChange={(dates: Date | [Date, Date]) =>
                        Array.isArray(dates) ? handleChangeArray(dates) : handleChangeSingle(dates)
                    }
                    startDate={datesValue.startDate}
                    endDate={datesValue.endDate}
                    ref={ref}
                />
            </div>
        </label>
    );
};

export default InputDateTime;
