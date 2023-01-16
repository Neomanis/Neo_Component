import React, { ButtonHTMLAttributes, forwardRef, ReactElement } from "react";
import { classNames } from "@/utils/tools";
import Loader from "../Loader";

// @tw
const variants = {
    primary: "justify-center bg-gradient-to-tr from-neo-red via-[#FF3355] to-[#FF5555] text-white",
    secondary: "border-neo-link border-2 text-neo-link",
    tertiary: "bg-neo-link text-white",
    none: "",
};

// @tw
const sizes = {
    xs: "py-1 px-2 text-xxs",
    sm: "py-2 px-4 text-xs",
    md: "py-2.5 px-6 text-sm",
    lg: "py-3 px-8 text-base",
    none: "",
};

// @tw
const roundings = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
    none: "",
};

export type IconProps =
    | { startIcon: ReactElement | null; endIcon?: never }
    | { startIcon?: never; endIcon: ReactElement | null }
    | { startIcon?: undefined; endIcon?: undefined };

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: keyof typeof variants;
    size?: keyof typeof sizes;
    rounded?: keyof typeof roundings;
    isLoading?: boolean;
} & IconProps;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
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
                    "flex items-center font-bold group",
                    "disabled:opacity-30 disabled:cursor-not-allowed",
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
                {isLoading && (
                    <span className={classNames(props.children && "mr-2")}>
                        <Loader type="circleOnly" />
                    </span>
                )}
                {!isLoading && (
                    <span className={classNames(props.children && "mr-2", "group-hover:animate-swing")}>
                        {startIcon}
                    </span>
                )}
                {props.children && <span>{props.children}</span>}
                {!isLoading && (
                    <span className={classNames(props.children && "ml-2", "group-hover:animate-swing")}>{endIcon}</span>
                )}
            </button>
        );
    }
);

export default Button;
