import React, { ReactElement, useState } from "react";

interface Props {
    defaultStatus: boolean;
    fCallBack?: () => void;
    value: string;
}

const SwitchToggle = ({ defaultStatus, fCallBack, value }: Props): ReactElement => {
    const [checked, setChecked] = useState(defaultStatus);

    function toggleSwitch(): void {
        if (fCallBack) {
            fCallBack();
        }
        setChecked(!checked);
    }

    return (
        <div className="flex items-center">
            <div className="relative w-10 inline-block mr-2">
                <input
                    checked={checked}
                    className={`absolute block w-4 h-4 m-1 rounded-full bg-white appearance-none cursor-pointer transform duration-150 ease-linear 
                    ${checked && "translate-x-full bg-white"}`}
                    id="toggle"
                    name="toggle"
                    onChange={(): void => {
                        toggleSwitch();
                    }}
                    type="checkbox"
                />
                <label
                    className={`block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer duration-150 ease-linear ${
                        checked && "bg-green-400"
                    }`}
                    htmlFor="toggle"
                ></label>
            </div>
            <label className="text-xs text-neo-blue-secondary cursor-pointer" htmlFor="toggle">
                {value}
            </label>
        </div>
    );
};

export default SwitchToggle;
