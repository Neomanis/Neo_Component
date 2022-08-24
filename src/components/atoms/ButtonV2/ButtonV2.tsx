import React, { ButtonHTMLAttributes, forwardRef, ReactElement } from "react";
import { classNames } from "@/utils/tools";
import Loader from "../Loader";

// @tw
const variants = {
    primary: "bg-gradient-to-tr from-neo-red via-[#FF3355] to-[#FF5555] text-white",
    secondary: "border-neo-link border-2 rounded-md text-neo-link",
};

// @tw
const sizes = {
    sm: "py-2 px-4 text-sm",
    md: "py-2 px-6 text-base",
    lg: "py-3 px-8 text-lg ",
};

// @tw
const roundings = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
};

type IconProps =
    | { startIcon: ReactElement; endIcon?: never }
    | { startIcon?: never; endIcon: ReactElement }
    | { startIcon?: undefined; endIcon?: undefined };

export type ButtonV2Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: keyof typeof variants;
    size?: keyof typeof sizes;
    rounded?: keyof typeof roundings;
    isLoading?: boolean;
} & IconProps;

const ButtonV2 = forwardRef<HTMLButtonElement, ButtonV2Props>(
    (
        {
            type = "button",
            className = "",
            variant = "primary",
            size = "md",
            isLoading = false,
            rounded = "full",
            startIcon,
            endIcon,
            ...props
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                className={classNames(
                    "flex justify-center items-center font-bold",
                    "disabled:opacity-70 disabled:cursor-not-allowed",
                    !props.disabled && "hover:scale-110 transition-all",
                    "focus:outline-none",
                    variants[variant],
                    sizes[size],
                    roundings[rounded],
                    className
                )}
                type={type}
                {...props}
            >
                {isLoading && <Loader type="circleOnly" />}
                {!isLoading && startIcon}
                <span className="mx-2">{props.children}</span>
                {!isLoading && endIcon}
            </button>
        );
    }
);

export default ButtonV2;
