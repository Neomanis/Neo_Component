import React, { ReactElement } from "react";

export interface OutputProps {
    title: string;
    description: string;
}

const Output = ({ title, description }: OutputProps): ReactElement => {
    return (
        <div className="bg-neo-blue-extraDark rounded py-1 px-4 font-bold text-sm">
            <p data-testid="output-title" className="text-neo-blue-secondary break-words">
                {title}
            </p>
            <p data-testid="output-desc" className="text-white break-words">
                {description}
            </p>
        </div>
    );
};

export default Output;
