import React, { ReactElement } from "react";

interface Props {
    cardClassName?: string;
    className?: string;
    data: { label: string; value: string }[];
    fCallBack?: (data: string) => void;
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
}: Props): ReactElement => {
    return (
        <div className={`${className}`} data-testid="inputChoice-body">
            {label && <div className={`${titleClassName}`}>{label}</div>}
            <ul className={`${cardClassName} flex flex-wrap justify-center`}>
                {data.map((item, key) => (
                    <div
                        className={`${labelClassName}
                        flex items-center p-1 text-white text-sm `}
                        key={key}
                    >
                        <div
                            className="cursor-pointer bg-neo-link  transform hover:scale-105 transition-transform rounded-sm text-center"
                            id={item.value + key}
                            onClick={() => fCallBack && fCallBack(item.value)}
                        >
                            <div className="w-60 cursor-pointer">{item.label}</div>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default InputChoice;
