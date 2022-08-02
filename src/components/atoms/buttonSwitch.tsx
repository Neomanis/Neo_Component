import React, { ReactElement, useEffect, useState } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
    active?: boolean;
    activeClassName?: string;
    activeData?: string;
    activeFontIcon?: IconProp;
    activeIconClassName?: string;
    inactiveSvg?: ReactElement;
    inactiveSvgClassName?: string;
    activeSvg?: ReactElement;
    activeSvgClassName?: string;
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
    inactiveSvg,
    inactiveSvgClassName,
    activeSvg,
    activeSvgClassName,
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
            {isActive ? <div>{activeData}</div> : <div>{inactiveData}</div>}
            {activeSvg && inactiveSvg && (
                <div
                    data-testid="buttonSwitch-svg"
                    className={`${isActive ? activeSvgClassName : inactiveSvgClassName} p-1`}
                >
                    {isActive ? activeSvg : inactiveSvg}
                </div>
            )}
            {activeFontIcon && inactiveFontIcon && (
                <div
                    data-testid="buttonSwitch-icon"
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
