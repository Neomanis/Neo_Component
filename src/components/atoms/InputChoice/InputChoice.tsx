import React, { ReactElement } from "react";
import { classNames } from "@/utils";

export interface InputChoiceProps {
    cardClassName?: string;
    className?: string;
    data: { label: string; value: number | string }[];
    fCallBack?: (data: { label: string; value: number | string }) => void;
    label?: string;
    labelClassName?: string;
    titleClassName?: string;
}

const InputChoice = ({
    cardClassName,
    className,
    data,
    fCallBack,
    label,
    labelClassName,
    titleClassName,
}: InputChoiceProps): ReactElement => {
    return (
        <div className={className} data-testid="inputChoice-body">
            {label && (
                <div className={titleClassName} data-testid="inputChoice-label">
                    {label}
                </div>
            )}
            <ul className={classNames("flex flex-wrap justify-center", cardClassName)} data-testid="inputChoice-list">
                {data.map((item, key) => (
                    <li className={classNames("flex items-center p-1 text-white text-sm", labelClassName)} key={key}>
                        <div
                            className="cursor-pointer bg-neo-link transform hover:scale-105 transition-transform rounded-md text-center py-1"
                            id={`${item.value} ${key}`}
                            onClick={() => fCallBack && fCallBack({ label: item.label, value: item.value })}
                        >
                            <div className="w-60 cursor-pointer">{item.label}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InputChoice;
