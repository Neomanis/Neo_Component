import React, { ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
interface Props {
    className?: string;
    data?: string;
    disabled?: boolean;
    fontIcon?: IconProp;
    iconClassName?: string;
    svgClassName?: string;
    testId?: string;
    type?: "button" | "submit" | "reset";
    fCallback?: () => void;
    svg?: ReactElement;
}

const Button = ({
    className,
    data,
    disabled,
    fontIcon,
    iconClassName,
    testId,
    type = "button",
    fCallback,
    svg,
    svgClassName,
}: Props): ReactElement => {
    return (
        <button type={type} className={className} onClick={fCallback} data-testid={testId} disabled={disabled}>
            {svg && <div className={svgClassName}>{svg}</div>}
            {data}
            {fontIcon && (
                <div className={iconClassName}>
                    <FontAwesomeIcon icon={fontIcon} />
                </div>
            )}
        </button>
    );
};

export default Button;
