import React, { ReactElement } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { IconArrowLeft } from "@/img/svg";
import Icon from "../Icon";
import { classNames } from "@/utils";

export interface TooltipProps {
    children?: ReactElement;
    text?: string;
    textComponent?: ReactElement;
    tooltipWidth?: number;
    fontIcon?: IconProp;
    svg?: ReactElement;
    position: "top" | "bottom";
    disabled?: boolean;
    className?: string;
}

const Tooltip = ({
    children,
    text,
    textComponent,
    tooltipWidth = 200,
    fontIcon,
    position,
    svg,
    disabled,
    className,
}: TooltipProps): ReactElement => {
    return (
        <div className={classNames(className, "relative group")}>
            <div
                className={classNames(
                    "flex items-center absolute transform -translate-x-1/2 left-1/2 z-50 opacity-0 pointer-events-none",
                    !disabled &&
                        "group-hover:opacity-100 group-hover:transition-opacity group-hover:duration-200 duration-200 ease-linear delay-200 group-hover:pointer-events-auto",
                    position === "top"
                        ? "flex-col -translate-y-full top-0"
                        : "flex-col-reverse translate-y-full bottom-0"
                )}
                data-testid="tooltip-bubble"
            >
                <div className="bg-neo-stats-black text-white font-extrabold px-3 py-2 rounded-md flex flex-col items-center text-center z-20 min-w-max">
                    {fontIcon && <Icon fontIcon={fontIcon} className="my-1" data-testid="tooltip-icon-body" />}
                    {svg && (
                        <div data-testid="tooltip-svg-body" className="my-1">
                            {svg}
                        </div>
                    )}
                    <div style={{ maxWidth: tooltipWidth }} className="text-[10px]">
                        {text}
                        {textComponent}
                    </div>
                </div>
                <IconArrowLeft
                    width={20}
                    className={`fill-neo-stats-black transform z-0
                        ${position === "top" ? "-rotate-90 -mt-[14px]" : "rotate-90 -mb-[14px]"}`}
                />
            </div>
            <div data-testid="tooltip-body" className="h-full w-full">
                {children}
            </div>
        </div>
    );
};

export default Tooltip;
