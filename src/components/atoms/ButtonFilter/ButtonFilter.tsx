import { classNames } from "@/utils";
import React, { ReactElement } from "react";

export interface ButtonFilterProps {
    title: string;
    isActive: boolean;
    onClick: () => void;
    id: string;
}

// @tw
const buttonVariants = {
    activated: " bg-neo-bg-B",
    deactivated: "bg-neo-blue-extraDark",
};

// @tw
const textVariants = {
    activated: "text-white",
    deactivated: "text-neo-link",
};

const ButtonFilter = ({ title, isActive, onClick, id }: ButtonFilterProps): ReactElement => {
    return (
        <button
            id={id}
            onClick={onClick}
            data-is-active={isActive}
            className={classNames(
                "flex flex-col justify-center items-center p-5 h-13 rounded-[3px] relative",
                buttonVariants[isActive ? "activated" : "deactivated"]
            )}
        >
            <p
                className={classNames(
                    "text-sm font-bold uppercase",
                    textVariants[isActive ? "activated" : "deactivated"]
                )}
            >
                {title}
            </p>
            {isActive && (
                <div className="absolute h-2.5 w-8 mx-auto -bottom-[5px] bg-neo-green border-[3px] border-neo-bg-A rounded-lg" />
            )}
        </button>
    );
};

export default ButtonFilter;
