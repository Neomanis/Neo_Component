import React, { ReactElement } from "react";

interface Props {
    data?: string;
    type: string;
    className?: string;
}

const Title = ({ data, type, className }: Props): ReactElement => {
    switch (type) {
        case "h1":
            return <h1 className={`niveauGrotesk ${className}`}>{data}</h1>;
        case "h2":
            return <h2 className={className}>{data}</h2>;
        case "h3":
            return <h3 className={className}>{data}</h3>;
        case "h4":
            return <h4 className={className}>{data}</h4>;
        default:
            return <p>type undefined</p>;
    }
};

export default Title;
