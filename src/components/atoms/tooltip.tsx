import React, { ReactElement, useCallback, useRef, useState } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import Icon from "./icon";
import { IconArrowLeft } from "../../img/svg";

interface Props {
    children?: ReactElement;
    text: string;
    fontIcon?: IconProp;
    svg?: ReactElement;
    position: "top" | "bottom";
    disabled?: boolean;
}

const Tooltip = ({ children, text, fontIcon, position, svg, disabled }: Props): ReactElement => {
    const [isHover, setIsHover] = useState(false);
    const timer = useRef(null);

    return (
        <div className="relative">
            <div
                className={`flex-col items-center absolute transform -translate-x-1/2 left-1/2 z-50
                ${position === "top" ? "-translate-y-full top-0" : "flex-col-reverse translate-y-full bottom-0"}
                ${!disabled && isHover ? "flex" : "hidden"}`}
                data-testid="tooltip-bubble"
            >
                <div className="bg-neo-stats-black text-white font-extrabold px-3 py-2 rounded-md flex flex-col items-center text-center z-20 min-w-max">
                    {fontIcon && <Icon fontIcon={fontIcon} className="my-1" data-testid="tooltip-icon-body" />}
                    {svg && (
                        <div data-testid="tooltip-svg-body" className="my-1">
                            {svg}
                        </div>
                    )}
                    <div className="text-[10px] max-w-[200px]">{text}</div>
                </div>
                <IconArrowLeft
                    width={20}
                    className={`fill-neo-stats-black transform z-0
                        ${position === "top" ? "-rotate-90 -mt-[14px]" : "rotate-90 -mb-[14px]"}`}
                />
            </div>
            <div
                onMouseEnter={() => {
                    timer.current = setTimeout(() => !disabled && setIsHover(true), 200);
                }}
                onMouseLeave={() => {
                    clearTimeout(timer.current);
                    setIsHover(false);
                }}
                data-testid="tooltip-body"
            >
                {children}
            </div>
        </div>
    );
};

export default Tooltip;
