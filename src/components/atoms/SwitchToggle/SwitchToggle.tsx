import { classNames } from "@/utils/tools";
import React, { ReactElement, useEffect, useState } from "react";

export interface SwitchToggleProps {
    defaultStatus: boolean;
    fCallBack?: (checked: boolean) => void;
    value?: string;
    id?: string;
    labelClassName?: string;
    uncheckBgColor?: string;
    uncheckPillColor?: string;
    checkBgColor?: string;
    checkPillColor?: string;
    disabled?: boolean;
}

const SwitchToggle = ({
    defaultStatus,
    fCallBack,
    value,
    id,
    labelClassName,
    uncheckBgColor,
    uncheckPillColor,
    checkBgColor,
    checkPillColor,
    disabled,
}: SwitchToggleProps): ReactElement => {
    const [checked, setChecked] = useState(defaultStatus);

    function toggleSwitch(): void {
        if (fCallBack) {
            fCallBack(!checked);
        }
        setChecked(!checked);
    }

    useEffect(() => {
        setChecked(defaultStatus);
    }, [defaultStatus]);

    return (
        <div className="flex items-center" data-testid="switchToggle-body">
            <div className="relative w-10 inline-block">
                <input
                    checked={checked}
                    data-testid="switchToggle-pill"
                    className={classNames(
                        "absolute block w-4 h-4 m-1 rounded-full appearance-none transform duration-150 ease-linear",
                        disabled ? "cursor-not-allowed" : "cursor-pointer",
                        checked && "translate-x-full",
                        checked
                            ? checkPillColor
                                ? "bg-" + checkPillColor
                                : "bg-neo-bg-A"
                            : uncheckPillColor
                            ? "bg-" + uncheckPillColor
                            : "bg-neo-bg-A"
                    )}
                    id={id}
                    onChange={(): void => {
                        toggleSwitch();
                    }}
                    type="checkbox"
                    disabled={disabled}
                />
                <label
                    data-testid="switchToggle-bg"
                    className={classNames(
                        "block overflow-hidden h-6 rounded-full duration-150 ease-linear",
                        disabled ? "cursor-not-allowed" : "cursor-pointer",
                        checked
                            ? checkBgColor
                                ? "bg-" + checkBgColor
                                : "bg-neo-green"
                            : uncheckBgColor
                            ? "bg-" + uncheckBgColor
                            : "bg-neo-blue-secondary"
                    )}
                    htmlFor={id}
                ></label>
            </div>
            {value && (
                <label
                    data-testid="switchToggle-label"
                    className={classNames(
                        labelClassName ? labelClassName : "ml-2 text-xs text-neo-blue-secondary",
                        disabled ? "cursor-not-allowed" : "cursor-pointer"
                    )}
                    htmlFor={id}
                >
                    {value}
                </label>
            )}
        </div>
    );
};

export default SwitchToggle;
