import React, { ReactElement } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import Icon from "./icon";
import { IconArrowLeft } from "../../img/svg";

interface Props {
    children?: ReactElement;
    text: string;
    fontIcon?: IconProp;
    svg?: ReactElement;
    position: "top" | "bottom";
}

const Tooltip = ({ children, text, fontIcon, position, svg }: Props): ReactElement => {
    return (
        <div className="relative group">
            <div
                className={`flex-col items-center absolute transform -translate-x-1/2 left-1/2 group-hover: flex z-50
                ${position === "bottom" ? "flex-col-reverse top-5" : "bottom-5"}`}
                data-testid="tooltip-bubble"
            >
                <div className="bg-neo-blue-extraDark text-white font-extrabold px-3 py-2 rounded-md flex flex-col items-center text-center z-20 min-w-max">
                    {fontIcon && <Icon fontIcon={fontIcon} className="my-1" data-testid="tooltip-icon-body" />}
                    {svg && (
                        <div data-testid="tooltip-svg-body" className="my-1">
                            {svg}
                        </div>
                    )}
                    <div className="text-xs max-w-[250px]">{text}</div>
                </div>
                <IconArrowLeft
                    width="20px"
                    className={`fill-neo-blue-extraDark transform z-0
                        ${position === "bottom" ? "rotate-90 -mb-[14px]" : "-rotate-90 -mt-[14px]"}`}
                />
            </div>
            <div data-testid="tooltip-body">{children}</div>
        </div>
    );
};

export default Tooltip;
