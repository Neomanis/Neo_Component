import React, { ReactElement, useEffect, useState } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
    active?: boolean;
    activeClassName?: string;
    activeData?: string;
    activeFontIcon?: IconProp;
    activeIconClassName?: string;
    disabled?: boolean;
    fCallback?: (data: boolean) => void;
    inactiveClassName?: string;
    inactiveData?: string;
    inactiveFontIcon?: IconProp;
    inactiveIconClassName?: string;
    testId?: string;
    type?: "button" | "submit" | "reset";
}

const ButtonSwitch = ({
    active = false,
    activeClassName,
    activeData,
    activeFontIcon,
    activeIconClassName,
    disabled,
    fCallback,
    inactiveClassName,
    inactiveData,
    inactiveFontIcon,
    inactiveIconClassName,
    testId,
    type = "button",
}: Props): ReactElement => {
    const [isActive, setIsActive] = useState(active);

    useEffect(() => {
        setIsActive(active);
    }, [active]);

    return (
        <button
            className={`flex items-center justify-center
            ${isActive ? activeClassName : inactiveClassName}
            rounded-lg`}
            onClick={() => {
                setIsActive(!isActive);
                fCallback && fCallback(isActive);
            }}
            data-testid={testId}
            disabled={disabled}
            type={type}
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
