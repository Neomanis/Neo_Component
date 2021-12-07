import React, { ReactElement, useState, MouseEvent } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import Icon from "./icon";

interface Props {
    className?: string;
    component?: ReactElement;
    data: string;
    fCallback?: (e: MouseEvent) => void;
    fontIcon?: IconProp;
    fontIconClassName?: string;
    position?: string;
    svg?: ReactElement;
    svgClassName?: string;
}

const Tooltip = ({
    className,
    component,
    data,
    fCallback,
    fontIcon,
    fontIconClassName,
    position,
    svg,
    svgClassName,
}: Props): ReactElement => {
    const [showTooltip, setShowTooltip] = useState(false);

    switch (position) {
        case "top":
            position = "left-1/2 transform -translate-x-1/2 bottom-6";
            break;
        case "bottom":
            position = "left-1/2 transform -translate-x-1/2 top-6";
            break;
        default:
            position = "left-1/2 transform -translate-x-1/2 top-6";
            break;
    }

    return (
        <div
            className="text-neo-link cursor-pointer relative"
            onMouseEnter={(): void => setShowTooltip(true)}
            onMouseLeave={(): void => setShowTooltip(false)}
            data-testid="tooltip-body"
        >
            {component && component}
            {fontIcon && (
                <div onClick={(e) => fCallback && fCallback(e)} data-testid="tooltip-icon-body">
                    <Icon fontIcon={fontIcon} className={fontIconClassName} />
                </div>
            )}
            {svg && <div className={svgClassName}>{svg}</div>}
            <div
                data-testid="tooltip-bubble"
                className={`
                    ${showTooltip && "hidden"} 
                    ${position} 
                    ${className}
                    w-max max-w-xxs absolute z-50
                `}
            >
                {data}
            </div>
        </div>
    );
};

export default Tooltip;
