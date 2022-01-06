import React, { ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface Props {
    className?: string;
    data?: string;
    disabled?: boolean;
    fCallback?: (e?) => void;
    fontIcon?: IconProp;
    iconClassName?: string;
    svg?: ReactElement;
    svgClassName?: string;
    style?: React.CSSProperties;
    testId?: string;
    type?: "button" | "submit" | "reset";
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
}: Props): ReactElement => {
    return (
        <button
            type={type}
            className={className}
            onClick={fCallback}
            data-testid={testId}
            disabled={disabled}
            style={style}
        >
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
