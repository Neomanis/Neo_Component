import { classNames } from "@/utils";
import React, { ReactElement, ReactNode } from "react";

// @tw
const variants = {
    primary:
        "relative w-full h-[50px] border-4 border-neo-bg-B rounded flex justify-between items-center pl-4 pr-2 mt-1",
    secondary:
        "relative w-full h-[50px] border-none rounded text-white flex justify-between items-center pl-4 pr-2 mt-1",
    custom: "",
};

const defaultLabelStyle = "ml-4 text-xs font-bold text-neo-blue-secondary flex items-center h-5";
const defaultDataStyle = "text-xs font-extrabold";

interface Props {
    variant: keyof typeof variants;
    mainColor?: { text?: string; bg?: string };
    label?: ReactNode;
    children?: ReactNode;
    className?: string;
    labelClassName?: string;
}

const UneditableField = ({
    variant,
    mainColor = { text: "text-white" },
    label,
    children,
    className = defaultDataStyle,
    labelClassName = defaultLabelStyle,
}: Props): ReactElement => {
    return (
        <div className="flex flex-col justify-end">
            {label && (
                <div data-testid="uneditablefield-label" className={labelClassName}>
                    {label}
                </div>
            )}
            <div
                data-testid="uneditablefield-body"
                className={classNames(
                    variants[variant],
                    variant !== "secondary" ? mainColor.text : mainColor.bg,
                    className
                )}
            >
                {children}
            </div>
        </div>
    );
};

export default UneditableField;
