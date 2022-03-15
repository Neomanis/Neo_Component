import React, { ReactElement, useEffect, useState } from "react";

interface Props {
    defaultStatus: boolean;
    fCallBack?: () => void;
    value: string;
    id?: string;
    labelClassName?: string;
}

const SwitchToggle = ({ defaultStatus, fCallBack, value, id, labelClassName }: Props): ReactElement => {
    const [checked, setChecked] = useState(defaultStatus);

    function toggleSwitch(): void {
        if (fCallBack) {
            fCallBack();
        }
        setChecked(!checked);
    }

    useEffect(() => {
        setChecked(defaultStatus);
    }, [defaultStatus]);

    return (
        <div className="flex items-center" data-testid="switchToggle-body">
            <div className="relative w-10 inline-block mr-2">
                <input
                    checked={checked}
                    className={`absolute block w-4 h-4 m-1 rounded-full bg-neo-bg-A appearance-none cursor-pointer transform duration-150 ease-linear
                    ${checked && "translate-x-full "}`}
                    id={id}
                    onChange={(): void => {
                        toggleSwitch();
                    }}
                    type="checkbox"
                />
                <label
                    className={`block overflow-hidden h-6 rounded-full bg-neo-blue-secondary cursor-pointer duration-150 ease-linear ${
                        checked && "bg-neo-green"
                    }`}
                    htmlFor={id}
                ></label>
            </div>
            <label className={`text-xs text-neo-blue-secondary cursor-pointer ${labelClassName}`} htmlFor={id}>
                {value}
            </label>
        </div>
    );
};

export default SwitchToggle;
