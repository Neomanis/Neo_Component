import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactElement, useState } from "react";

interface Props {
    activeClassName?: string;
    inactiveClassName?: string;
    activeIconClassName?: string;
    inactiveIconClassName?: string;
    activeData?: string;
    inactiveData?: string;
    disabled?: boolean;
    activeFontIcon?: IconProp;
    inactiveFontIcon?: IconProp;
    testId?: string;
    type?: "button" | "submit" | "reset";
    fCallback?: (data: boolean) => void;
}

const ButtonSwitch = ({
    activeClassName,
    inactiveClassName,
    activeIconClassName,
    inactiveIconClassName,
    activeData,
    inactiveData,
    disabled,
    fCallback,
    activeFontIcon,
    inactiveFontIcon,
    testId,
    type = "button",
}: Props): ReactElement => {
    const [isActive, setIsActive] = useState(false);
    return (
        <button
            type={type}
            className={`flex items-center justify-center
            ${isActive ? activeClassName : inactiveClassName}
            rounded-lg`}
            onClick={() => {
                setIsActive(!isActive);
                fCallback && fCallback(isActive);
            }}
            disabled={disabled}
            data-testid={testId}
        >
            {isActive ? <div className="px-2">{activeData}</div> : <div className="px-2">{inactiveData}</div>}
            {activeFontIcon && inactiveFontIcon && (
                <div
                    className={`flex items-center justify-center m-1
                            ${isActive ? activeIconClassName : inactiveIconClassName}
                            rounded-lg`}
                >
                    <FontAwesomeIcon icon={isActive ? activeFontIcon : inactiveFontIcon} />
                </div>
            )}
        </button>
    );
};

export default ButtonSwitch;
