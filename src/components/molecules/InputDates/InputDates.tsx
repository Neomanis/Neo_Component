import React, { ReactElement, useEffect, useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";
import "@/styles/reactDatePicker.css";
import isEqual from "lodash.isequal";
import { useTranslation } from "@neomanis/neo-translation";
import { IconCalendar } from "@/img/svg";
import { InputDateTime, Title, Updater } from "@/components/atoms";
import { classNames, createTimeout, useInputs } from "@/utils";

export interface Dates {
    startAt?: Date;
    displayAt?: Date;
    endAt?: Date;
    hideAt?: Date;
}

export interface Props {
    defaultValues?: Dates;
    formMethods: UseFormReturn;
    timerSetting?: number;
    updateFunction?: (value: Dates) => void;
    isUpdate?: boolean;
    errorMessage?: string;
    id?: string;
    watchType?: string;
}

const InputDates = ({
    defaultValues,
    isUpdate = false,
    errorMessage,
    id,
    formMethods,
    timerSetting = 5000,
    updateFunction,
    watchType,
}: Props): ReactElement => {
    const { t, i18n } = useTranslation();
    const timer = useRef<ReturnType<typeof createTimeout> | null>(null);

    const [state, dispatch] = useInputs({
        startAt: defaultValues?.startAt,
        displayAt: defaultValues?.displayAt,
        endAt: defaultValues?.endAt,
        hideAt: defaultValues?.hideAt,
    } as Dates);

    const [localStateDates, setLocalStateDates] = useState({
        startAt: defaultValues?.startAt,
        displayAt: defaultValues?.displayAt,
        endAt: defaultValues?.endAt,
        hideAt: defaultValues?.hideAt,
    } as Dates);

    const disabledStartDate = Boolean(!watchType);
    const disabledEndDate = (watchType && watchType === "outage") || !watchType;

    useEffect(() => {
        if (disabledEndDate && !defaultValues) {
            formMethods.resetField("endAt");
            formMethods.resetField("hideAt");
            return;
        }
    }, [defaultValues, disabledEndDate]);

    useEffect(() => {
        if (!defaultValues && Boolean(!watchType) === false) {
            formMethods.setValue("startAt", new Date());
            formMethods.setValue("displayAt", new Date());
        }
    }, [watchType]);

    // reset DisplayAt
    useEffect(() => {
        if (!localStateDates.startAt || !localStateDates.displayAt) {
            return;
        }
        if (localStateDates.startAt.getTime() < localStateDates.displayAt.getTime()) {
            formMethods.setValue("displayAt", localStateDates.startAt);
        }
    }, [localStateDates.startAt, localStateDates.displayAt]);

    // reset endAt if startAt is higher
    useEffect(() => {
        if (!localStateDates.startAt || !localStateDates.endAt) {
            return;
        }
        if (localStateDates.startAt.getTime() > localStateDates.endAt.getTime()) {
            formMethods.setValue("endAt", localStateDates.startAt);
        }
    }, [localStateDates.startAt, localStateDates.endAt]);

    // reset HideAt
    useEffect(() => {
        if (!localStateDates.endAt || !localStateDates.hideAt) {
            return;
        }
        if (localStateDates.endAt.getTime() > localStateDates.hideAt.getTime()) {
            formMethods.setValue("hideAt", localStateDates.endAt);
        }
    }, [localStateDates.endAt, localStateDates.hideAt]);

    // auto set input if only endAt or hideAt is filled
    useEffect(() => {
        if (localStateDates.hideAt && !localStateDates.endAt) {
            formMethods.setValue("endAt", localStateDates.hideAt);
        }
        if (!localStateDates.hideAt && localStateDates.endAt) {
            formMethods.setValue("hideAt", localStateDates.endAt);
        }
    }, [localStateDates.hideAt, localStateDates.endAt]);

    function handleChangeLocalState(value: Date, ref: string, oldState: Dates) {
        const newState = oldState;
        Reflect.set(newState, ref, value);
        setLocalStateDates({ ...newState });
    }

    function handleChange(value: Dates) {
        if (isUpdate) {
            timer.current?.clear();
            if (!isEqual(value, state.previous)) {
                dispatch({ type: "UPDATING", payload: value });
                timer.current = createTimeout(() => {
                    updateFunction?.(value);
                    dispatch({ type: "UPDATE_SUCCESS" });
                    timer.current = createTimeout(() => {
                        dispatch({ type: "CLEAR_SUCCESS" });
                    }, 3000);
                }, timerSetting);
            } else {
                dispatch({ type: "CANCEL_UPDATE" });
            }
        }
    }

    function triggerUpdate() {
        timer.current?.clear();
        dispatch({ type: "CANCEL_UPDATE" });
        handleChange(localStateDates);
    }
    useEffect(() => {
        return () => {
            timer.current?.trigger();
        };
    }, []);

    return (
        <div className="h-full w-full">
            <div className="h-6 flex justify-between w-full mb-4">
                <Title type="h1" data="Timing" className="text-2xl text-neo-blue-secondary font-bold" />
                {isUpdate && (
                    <Updater
                        errorMessage={errorMessage}
                        isCancelable={state.isCancelable}
                        isUpdate={state.isCooldown}
                        isSuccess={state.isSuccess}
                        trigger={state.trigger}
                        fCallBackCancel={(): void => {
                            state.previous.startAt && formMethods.setValue("startAt", state.previous.startAt);
                            state.previous.displayAt && formMethods.setValue("displayAt", state.previous.displayAt);
                            if (!disabledEndDate) {
                                state.previous.endAt && formMethods.setValue("endAt", state.previous.endAt);
                                state.previous.hideAt && formMethods.setValue("hideAt", state.previous.hideAt);
                            }
                            timer.current?.clear();
                            dispatch({ type: "CANCEL_UPDATE" });
                        }}
                        id={"updater-" + id}
                    />
                )}
            </div>
            <div className="flex gap-4 w-full">
                <div className="w-1/2">
                    <InputDateTime
                        refForm="startAt"
                        formMethods={formMethods}
                        maxDate={watchType === "outage" && new Date()}
                        maxTime={new Date()}
                        label={t("date.startAt")}
                        labelClassName="text-neo-blue-secondary text-xs font-bold"
                        inputClassName="bg-neo-bg-B px-3 font-bold rounded text-white text-xs w-full text-bold h-[48px] mb-2"
                        datePickerElementWrapperClassName="flex flex-row-reverse items-center"
                        className={classNames(disabledStartDate && "opacity-50")}
                        disabled={disabledStartDate}
                        lang={i18n.language}
                        svg={<IconCalendar className="fill-neo-light-grey w-7 mb-2 absolute z-10 mr-2" />}
                        id="startAt-date-input"
                        defaultValue={defaultValues?.startAt}
                        fOnChange={(date) => handleChangeLocalState(date as Date, "startAt", localStateDates)}
                        fOnBlur={triggerUpdate}
                    />
                    <InputDateTime
                        refForm="displayAt"
                        formMethods={formMethods}
                        maxDate={localStateDates.startAt}
                        maxTime={localStateDates.startAt}
                        label={t("date.displayAt")}
                        labelClassName="text-neo-blue-secondary text-xs font-bold"
                        inputClassName="bg-neo-bg-B px-3 font-bold rounded text-white text-xs w-full text-bold h-[48px]"
                        datePickerElementWrapperClassName="flex flex-row-reverse items-center"
                        className={classNames(disabledStartDate && "opacity-50")}
                        disabled={disabledStartDate}
                        lang={i18n.language}
                        svg={<IconCalendar className="fill-neo-light-grey w-7 mb-2 absolute z-10 mr-2" />}
                        id="displayAt-date-input"
                        defaultValue={defaultValues?.displayAt}
                        fOnChange={(date) => {
                            handleChangeLocalState(date as Date, "displayAt", localStateDates);
                        }}
                        fOnBlur={triggerUpdate}
                    />
                </div>
                <div className="w-1/2">
                    <InputDateTime
                        refForm="endAt"
                        formMethods={formMethods}
                        minDate={localStateDates.startAt}
                        minTime={localStateDates.startAt}
                        label={t("date.endAt")}
                        labelClassName="text-neo-blue-secondary text-xs font-bold"
                        inputClassName="bg-neo-bg-B px-3 font-bold rounded text-white text-xs w-full text-bold h-[48px] mb-2"
                        datePickerElementWrapperClassName="flex flex-row-reverse items-center"
                        className={classNames(disabledEndDate && "opacity-50")}
                        disabled={disabledEndDate}
                        lang={i18n.language}
                        svg={<IconCalendar className="fill-neo-light-grey w-7 mb-2 absolute z-10 mr-2" />}
                        id="endAt-date-input"
                        defaultValue={defaultValues?.endAt}
                        fOnChange={(date) => handleChangeLocalState(date as Date, "endAt", localStateDates)}
                        fOnBlur={triggerUpdate}
                    />
                    <InputDateTime
                        refForm="hideAt"
                        formMethods={formMethods}
                        minDate={localStateDates.endAt}
                        minTime={localStateDates.endAt}
                        label={t("date.hideAt")}
                        labelClassName="text-neo-blue-secondary text-xs font-bold"
                        inputClassName="bg-neo-bg-B px-3 font-bold rounded text-white text-xs w-full text-bold h-[48px]"
                        datePickerElementWrapperClassName="flex flex-row-reverse items-center"
                        className={classNames(disabledEndDate && "opacity-50")}
                        disabled={disabledEndDate}
                        lang={i18n.language}
                        svg={<IconCalendar className="fill-neo-light-grey w-7 mb-2 absolute z-10 mr-2" />}
                        id="hideAt-date-input"
                        defaultValue={defaultValues?.hideAt}
                        fOnChange={(date) => handleChangeLocalState(date as Date, "hideAt", localStateDates)}
                        fOnBlur={triggerUpdate}
                    />
                </div>
            </div>
        </div>
    );
};

export default InputDates;
