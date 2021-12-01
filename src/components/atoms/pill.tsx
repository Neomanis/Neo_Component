import React, { ReactElement } from "react";

interface Props {
    className?: string;
    data: string | number;
}
const Pill = ({ className = "", data }: Props): ReactElement => {
    return (
        <div
            className={`${className} h-6 w-auto px-3 whitespace-nowrap flex items-center justify-center bg-neo-bg-B text-white`}
        >
            {data}
        </div>
    );
};

export default Pill;
