import React, { ReactElement } from "react";

interface Props {
    className?: string;
    data?: string;
    type: string;
}

const Title = ({ className, data, type }: Props): ReactElement => {
    switch (type) {
        case "h1":
            return (
                <h1 className={`niveauGrotesk ${className}`} data-testid="title-h1-body">
                    {data}
                </h1>
            );
        case "h2":
            return (
                <h2 className={className} data-testid="title-h2-body">
                    {data}
                </h2>
            );
        case "h3":
            return (
                <h3 className={className} data-testid="title-h3-body">
                    {data}
                </h3>
            );
        case "h4":
            return (
                <h4 className={className} data-testid="title-h4-body">
                    {data}
                </h4>
            );
        default:
            return <p data-testid="title-default-body">type undefined</p>;
    }
};

export default Title;
