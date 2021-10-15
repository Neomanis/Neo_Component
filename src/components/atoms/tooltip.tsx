import React, { ReactElement, useState } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import Icon from "./icon";

interface Props {
    className?: string;
    component?: ReactElement;
    data: string;
    fontIcon?: IconProp;
    fontIconClassName?: string;
    position?: string;
}

const Tooltip = ({ className, component, data, fontIcon, fontIconClassName, position }: Props): ReactElement => {
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
            className="text-neo_black-black_05 cursor-pointer relative"
            onMouseEnter={(): void => setShowTooltip(true)}
            onMouseLeave={(): void => setShowTooltip(false)}
        >
            {component && component}
            {fontIcon && <Icon fontIcon={fontIcon} className={fontIconClassName} />}
            <div
                className={`
                    ${showTooltip ? "" : "hidden"} 
                    ${position} 
                    ${className}
                    w-max max-w-xxs absolute bg-neo_blue-modal z-50 px-4 py-1 rounded text-xs text-white
                `}
            >
                {data}
            </div>
        </div>
    );
};

export default Tooltip;
