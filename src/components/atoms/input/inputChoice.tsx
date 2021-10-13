import React, { ReactElement } from "react";

interface Props {
    data: { label: string; value: string }[];
    defaultValue?: { label: string; value: string };
    label?: string;
    className?: string;
    titleClassName?: string;
    refForm?: string;
    required?: boolean;
    cardClassName?: string;
    labelClassName?: string;
    fCallBack?: (data: string) => void;
}

const InputChoice = ({
    data,
    label,
    className,
    cardClassName,
    labelClassName,
    titleClassName,
    fCallBack,
}: Props): ReactElement => {
    return (
        <div className={`${className}`}>
            {label && <div className={`${titleClassName}`}>{label}</div>}
            <ul className={`${cardClassName} flex flex-wrap justify-center`}>
                {data.map((item, key) => (
                    <div
                        key={key}
                        className={`${labelClassName} 
                        flex items-center p-2 text-neo_blue font-bold `}
                    >
                        <div
                            id={item.value + key}
                            className="cursor-pointer bg-white  transform hover:scale-105 transition-transform rounded-full w-28 text-center"
                            onClick={() => fCallBack && fCallBack(item.value)}
                        >
                            <div className="px-2 cursor-pointer">{item.label}</div>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default InputChoice;
