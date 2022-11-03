import React, { ReactElement } from "react";

export interface InputChoiceProps {
    cardClassName?: string;
    className?: string;
    data: { label: string; value: number }[];
    fCallBack?: (data: { label: string; value: number }) => void;
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
        <div className={`${className}`} data-testid="inputChoice-body">
            {label && (
                <div className={`${titleClassName}`} data-testid="inputChoice-label">
                    {label}
                </div>
            )}
            <ul className={`${cardClassName} flex flex-wrap justify-center`} data-testid="inputChoice-list">
                {data.map((item, key) => (
                    <li
                        className={`${labelClassName}
                        flex items-center p-1 text-white text-sm `}
                        key={key}
                    >
                        <div
                            className="cursor-pointer bg-neo-link transform hover:scale-105 transition-transform rounded-sm text-center"
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
