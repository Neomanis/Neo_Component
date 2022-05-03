import React, { ReactElement, useEffect, useState } from "react";

interface Props {
    defaultStatus: boolean;
    fCallBack?: (checked: boolean) => void;
    value?: string;
    id?: string;
    labelClassName?: string;
    uncheckBgColor?: string;
    uncheckPillColor?: string;
    checkBgColor?: string;
    checkPillColor?: string;
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
}: Props): ReactElement => {
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
                    className={`absolute block w-4 h-4 m-1 rounded-full appearance-none cursor-pointer transform duration-150 ease-linear 
                    ${checked && "translate-x-full "} 
                    ${
                        checked
                            ? checkPillColor
                                ? "bg-" + checkPillColor
                                : "bg-neo-bg-A"
                            : uncheckPillColor
                            ? "bg-" + uncheckPillColor
                            : "bg-neo-bg-A"
                    }
                    `}
                    id={id}
                    onChange={(): void => {
                        toggleSwitch();
                    }}
                    type="checkbox"
                />
                <label
                    data-testid="switchToggle-bg"
                    className={`block overflow-hidden h-6 rounded-full cursor-pointer duration-150 ease-linear 
                    ${
                        checked
                            ? checkBgColor
                                ? "bg-" + checkBgColor
                                : "bg-neo-green"
                            : uncheckBgColor
                            ? "bg-" + uncheckBgColor
                            : "bg-neo-blue-secondary"
                    }

                    `}
                    htmlFor={id}
                ></label>
            </div>
            {value && (
                <label
                    data-testid="switchToggle-label"
                    className={`${
                        labelClassName ? labelClassName : "ml-2 text-xs text-neo-blue-secondary cursor-pointer"
                    } `}
                    htmlFor={id}
                >
                    {value}
                </label>
            )}
        </div>
    );
};

export default SwitchToggle;
