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
                className={`flex-col items-center absolute transform -translate-x-1/2 left-1/2 group-hover:flex hidden
                ${position === "top" ? "flex-col-reverse top-5" : "bottom-5"}`}
            >
                <div
                    className="bg-neo-blue-extraDark text-white font-extrabold px-3 py-2 rounded-md flex flex-col items-center text-center"
                    data-testid="tooltip-body"
                >
                    {fontIcon && <Icon fontIcon={fontIcon} className="my-1" data-testid="tooltip-icon-body" />}
                    {svg && (
                        <div data-testid="tooltip-svg-body" className="my-1">
                            {svg}
                        </div>
                    )}
                    <div data-testid="tooltip-bubble" className="text-xs">
                        {text}
                    </div>
                </div>
                <IconArrowLeft
                    width="20px"
                    className={`fill-neo-blue-extraDark transform
                        ${position === "top" ? "rotate-90 -mb-2" : "-rotate-90 -mt-2"}`}
                />
            </div>
            <div>{children}</div>
        </div>
    );
};

export default Tooltip;
