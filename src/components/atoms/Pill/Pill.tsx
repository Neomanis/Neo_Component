import React, { CSSProperties, ReactElement } from "react";

export interface PillProps {
    className?: string;
    data: string | number;
    style?: CSSProperties;
}

const Pill = ({ className, data, style }: PillProps): ReactElement => {
    return (
        <div
            className={`${
                className ?? "h-6 w-auto px-3 whitespace-nowrap bg-neo-bg-B text-white"
            } flex items-center justify-center`}
            data-testid="pill-body"
            style={style}
        >
            {data}
        </div>
    );
};

export default Pill;
