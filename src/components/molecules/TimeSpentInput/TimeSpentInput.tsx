import React, { ReactElement, useEffect, useRef, useState } from "react";
import { useController, UseFormReturn } from "react-hook-form";
import { useTranslation } from "@neomanis/neo-translation";
import { useInputs } from "@/utils/hooks/useInputs";
import { IconArrowLeft } from "@/img/svg";
import { Button, UneditableField, Updater } from "@/components/atoms";
import TimeSpentTooltip from "./TimeSpentToolbar";
import { useOnClickOutside } from "@/utils";

export interface TimeSpentInputProps {
    defaultValue: number;
    formMethods: UseFormReturn;
    refForm: string;
    updateFunction: (field: string, value: number) => void;
    ticketUid: string;
}

const TimeSpentInput = ({
    defaultValue,
    formMethods,
    refForm,
    updateFunction,
    ticketUid,
}: TimeSpentInputProps): ReactElement => {
    const toolBarRef = useRef<HTMLDivElement>(null);
    const timer = useRef<NodeJS.Timeout | null>(null);
    const [state, dispatch] = useInputs(defaultValue);
    const { t } = useTranslation();
    const [toolbarOpened, setToolbarOpened] = useState(false);

    useOnClickOutside(toolBarRef, () => setToolbarOpened(false));

    const {
        field: { value, onChange },
    } = useController({
        control: formMethods.control,
        name: refForm,
        shouldUnregister: false,
        defaultValue,
    });

    function getFormattedDuration(timeSpent: number) {
        const hours = Math.floor(timeSpent / 60);
        const minutes = timeSpent % 60;

        const durationParts = [];
        if (hours > 0) {
            durationParts.push(`${hours} ${t("date.hour", { count: hours })}`);
        }

        if (minutes > 0) {
            durationParts.push(`${minutes} ${t("date.minute", { count: minutes })}`);
        }

        return durationParts.join(" ");
    }

    function handleChange(action: "add" | "remove", time: number) {
        setToolbarOpened(false);
        let newValue: number;
        if (action === "add") {
            newValue = value + time;
        } else {
            newValue = Math.max(0, value - time);
        }
        onChange(newValue);

        timer.current && clearTimeout(timer.current);
        if (newValue !== state.previous) {
            dispatch({ type: "UPDATING", payload: newValue });
            timer.current = setTimeout(() => {
                updateFunction(refForm, newValue);
                dispatch({ type: "UPDATE_SUCCESS" });
                timer.current = setTimeout(() => {
                    dispatch({ type: "CLEAR_SUCCESS" });
                }, 3000);
            }, 5000);
        } else {
            dispatch({ type: "CANCEL_UPDATE" });
        }
    }

    useEffect(() => {
        dispatch({ type: "RESET", payload: defaultValue });
        formMethods.setValue(refForm, defaultValue);
    }, [defaultValue]);

    return (
        <div className="grid grid-cols-[52%_1fr] grid-rows-[auto_1fr] gap-x-4 items-end relative">
            <div className="h-5 flex justify-between items-center col-span-2 pr-2">
                <label className={"text-xs font-bold text-neo-blue-secondary ml-4"}>{t("ticket.timeSpent")}</label>
                <div data-testid="inputSelectUpdater-body">
                    <Updater
                        errorMessage={t("error.required")}
                        isCancelable={state.isCancelable}
                        isError={false}
                        isSuccess={state.isSuccess}
                        isUpdate={state.isCooldown}
                        trigger={state.trigger}
                        fCallBackCancel={(): void => {
                            timer.current && clearTimeout(timer.current);
                            dispatch({ type: "CANCEL_UPDATE" });
                            onChange(state.previous);
                        }}
                        id={`updater-${ticketUid}`}
                    />
                </div>
            </div>
            <UneditableField variant="primary">{getFormattedDuration(value)}</UneditableField>
            <Button
                onClick={() => setToolbarOpened(!toolbarOpened)}
                variant="secondary"
                className="h-[50px] p-1 text-sm justify-center"
                rounded="md"
                size="none"
                data-click-outside-exception
            >
                {t("global.add")} / {t("global.remove")}
            </Button>
            {toolbarOpened && (
                <div
                    ref={toolBarRef}
                    className="flex absolute transform -translate-x-1/2 left-1/2 z-50 flex-col-reverse translate-y-full bottom-0"
                >
                    <div className="bg-neo-stats-black text-white font-extrabold px-3 py-2 rounded-md flex flex-col items-center text-center z-20 min-w-max">
                        <TimeSpentTooltip onClick={handleChange} />
                    </div>
                    <IconArrowLeft
                        width={20}
                        className="fill-neo-stats-black transform z-0 rotate-90 -mb-[14px] mx-auto"
                    />
                </div>
            )}
        </div>
    );
};

export default TimeSpentInput;
