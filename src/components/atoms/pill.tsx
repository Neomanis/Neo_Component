import React, { ReactElement } from "react";

interface Props {
    data: string | number;
    className?: string;
}
const Pill = ({ data, className = "" }: Props): ReactElement => {
    return (
        <div
            className={`${className} h-6 w-auto px-3 whitespace-nowrap flex items-center justify-center bg-neo_blue text-white`}
        >
            {data}
        </div>
    );
};

export default Pill;
