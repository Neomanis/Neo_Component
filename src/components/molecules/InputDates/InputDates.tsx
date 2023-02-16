import React, { ReactElement, useEffect, useRef } from "react";
import { UseFormReturn } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";
import "@/styles/reactDatePicker.css";
import isEqual from "lodash.isequal";
import { useTranslation } from "@neomanis/neo-translation";
import { IconCalendar } from "@/img/svg";
import { InputDateTime, Updater } from "@/components/atoms";
import { classNames, createTimeout, useInputs } from "@/utils";

interface Dates {
    startAt: string;
    displayAt: string;
    endAt: string;
    hideAt: string;
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
    const [state, dispatch] = useInputs(defaultValues);

    const disabledStartDate = Boolean(!watchType);
    const disabledEndDate = (watchType && watchType === "outage" && !defaultValues) || !watchType;

    const watchStartAt = formMethods.watch("startAt");
    const watchEndAt = formMethods.watch("endAt");
    const watchDisplayAt = formMethods.watch("displayAt");
    const watchHideAt = formMethods.watch("hideAt");

    useEffect(() => {
        const newDates = {
            startAt: watchStartAt,
            displayAt: watchEndAt,
            endAt: watchDisplayAt,
            hideAt: watchHideAt,
        };
        handleChange(newDates);
    }, [watchStartAt, watchEndAt, watchDisplayAt, watchHideAt]);

    useEffect(() => {
        if (watchType === "outage" && !defaultValues) {
            formMethods.resetField("endAt");
            formMethods.resetField("hideAt");
            return;
        }
    }, [defaultValues, watchType]);

    useEffect(() => {
        if (!defaultValues && Boolean(!watchType) === false) {
            formMethods.setValue("startAt", new Date());
            formMethods.setValue("displayAt", new Date());
        }
    }, [watchType]);

    // reset DisplayAt
    useEffect(() => {
        if (!watchStartAt || !watchDisplayAt) {
            return;
        }

        const startAt = new Date(watchStartAt);
        const displayAt = new Date(watchDisplayAt);
        if (startAt.getTime() < displayAt.getTime()) {
            formMethods.setValue("displayAt", startAt);
        }
    }, [watchStartAt, watchDisplayAt]);

    // reset endAt if startAt is higher
    useEffect(() => {
        if (!watchStartAt || !watchEndAt) {
            return;
        }
        const startAt = new Date(watchStartAt);
        const endAt = new Date(watchEndAt);
        if (startAt.getTime() > endAt.getTime()) {
            formMethods.setValue("endAt", startAt);
        }
    }, [watchStartAt, watchEndAt]);

    // reset HideAt
    useEffect(() => {
        if (!watchEndAt || !watchHideAt) {
            return;
        }

        const endAt = new Date(watchEndAt);
        const hideAt = new Date(watchHideAt);
        if (endAt.getTime() > hideAt.getTime()) {
            formMethods.setValue("hideAt", endAt);
        }
    }, [watchEndAt, watchHideAt]);

    // auto set input if only endAt or hideAt is filled
    useEffect(() => {
        if (watchHideAt && !watchEndAt) {
            formMethods.setValue("endAt", watchHideAt);
        }
        if (!watchHideAt && watchEndAt) {
            formMethods.setValue("hideAt", watchEndAt);
        }
    }, [watchHideAt, watchEndAt]);

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

    useEffect(() => {
        return () => {
            timer.current?.trigger();
        };
    }, []);

    return (
        <div className="h-full w-full">
            {isUpdate && (
                <div className="h-6 flex justify-between w-full">
                    <Updater
                        errorMessage={errorMessage}
                        isCancelable={state.isCancelable}
                        isUpdate={state.isCooldown}
                        isSuccess={state.isSuccess}
                        trigger={state.trigger}
                        fCallBackCancel={(): void => {
                            state.previous.startAt && formMethods.setValue("startAt", state.previous.startAt);
                            state.previous.displayAt && formMethods.setValue("displayAt", state.previous.displayAt);
                            if (watchType !== "outage") {
                                state.previous.endAt && formMethods.setValue("endAt", state.previous.endAt);
                                state.previous.hideAt && formMethods.setValue("hideAt", state.previous.hideAt);
                            }
                            timer.current?.clear();
                            dispatch({ type: "CANCEL_UPDATE" });
                        }}
                        id={"updater-" + id}
                    />
                </div>
            )}
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
                    />
                    <InputDateTime
                        refForm="displayAt"
                        formMethods={formMethods}
                        maxDate={new Date(watchStartAt)}
                        maxTime={new Date()}
                        label={t("date.displayAt")}
                        labelClassName="text-neo-blue-secondary text-xs font-bold"
                        inputClassName="bg-neo-bg-B px-3 font-bold rounded text-white text-xs w-full text-bold h-[48px]"
                        datePickerElementWrapperClassName="flex flex-row-reverse items-center"
                        className={classNames(disabledStartDate && "opacity-50")}
                        disabled={disabledStartDate}
                        lang={i18n.language}
                        svg={<IconCalendar className="fill-neo-light-grey w-7 mb-2 absolute z-10 mr-2" />}
                        id="displayAt-date-input"
                    />
                </div>
                <div className="w-1/2">
                    <InputDateTime
                        refForm="endAt"
                        formMethods={formMethods}
                        minDate={new Date(watchStartAt)}
                        minTime={new Date(watchStartAt)}
                        label={t("date.endAt")}
                        labelClassName="text-neo-blue-secondary text-xs font-bold"
                        inputClassName="bg-neo-bg-B px-3 font-bold rounded text-white text-xs w-full text-bold h-[48px] mb-2"
                        datePickerElementWrapperClassName="flex flex-row-reverse items-center"
                        className={classNames(disabledEndDate && "opacity-50")}
                        disabled={disabledEndDate}
                        lang={i18n.language}
                        svg={<IconCalendar className="fill-neo-light-grey w-7 mb-2 absolute z-10 mr-2" />}
                        id="endAt-date-input"
                    />
                    <InputDateTime
                        refForm="hideAt"
                        formMethods={formMethods}
                        minDate={new Date(watchEndAt)}
                        minTime={new Date(watchEndAt)}
                        label={t("date.hideAt")}
                        labelClassName="text-neo-blue-secondary text-xs font-bold"
                        inputClassName="bg-neo-bg-B px-3 font-bold rounded text-white text-xs w-full text-bold h-[48px]"
                        datePickerElementWrapperClassName="flex flex-row-reverse items-center"
                        className={classNames(disabledEndDate && "opacity-50")}
                        disabled={disabledEndDate}
                        lang={i18n.language}
                        svg={<IconCalendar className="fill-neo-light-grey w-7 mb-2 absolute z-10 mr-2" />}
                        id="hideAt-date-input"
                    />
                </div>
            </div>
        </div>
    );
};

export default InputDates;
