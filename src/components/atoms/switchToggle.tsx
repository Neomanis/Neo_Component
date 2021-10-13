import React, { ReactElement, useState } from "react";

interface Props {
    fCallBack?: () => void;
    value: string;
    defaultStatus: boolean;
}

const SwitchToggle = ({ fCallBack, defaultStatus, value }: Props): ReactElement => {
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
                    type="checkbox"
                    name="toggle"
                    id="toggle"
                    className={`absolute block w-4 h-4 m-1 rounded-full bg-white appearance-none cursor-pointer transform duration-150 ease-linear ${
                        checked && "translate-x-full bg-white"
                    }`}
                    checked={checked}
                    onChange={(): void => {
                        toggleSwitch();
                    }}
                />
                <label
                    htmlFor="toggle"
                    className={`block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer duration-150 ease-linear ${
                        checked && "bg-green-400"
                    }`}
                ></label>
            </div>
            <label htmlFor="toggle" className="text-xs text-gray-700 cursor-pointer">
                {value}
            </label>
        </div>
    );
};

export default SwitchToggle;
