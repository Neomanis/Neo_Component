import React, { ReactElement, MouseEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface ButtonProps {
    className?: string;
    data?: string;
    disabled?: boolean;
    fCallback?: (e: MouseEvent) => void;
    fontIcon?: IconProp;
    iconClassName?: string;
    svg?: ReactElement;
    svgClassName?: string;
    style?: React.CSSProperties;
    testId?: string;
    type?: "button" | "submit" | "reset";
    form?: string;
}

const Button = ({
    className,
    data,
    disabled,
    fCallback,
    fontIcon,
    iconClassName,
    svg,
    svgClassName,
    style,
    testId,
    type = "button",
    form,
}: ButtonProps): ReactElement => {
    return (
        <button
            type={type}
            className={className}
            onClick={fCallback}
            data-testid={testId}
            disabled={disabled}
            style={style}
            form={form}
        >
            {svg && (
                <div className={svgClassName} data-testid="button-svg">
                    {svg}
                </div>
            )}
            {data}
            {fontIcon && (
                <div className={iconClassName} data-testid="button-icon">
                    <FontAwesomeIcon icon={fontIcon} />
                </div>
            )}
        </button>
    );
};

export default Button;
