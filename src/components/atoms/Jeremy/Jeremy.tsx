import React, { ReactElement } from "react";

export interface JeremyProps {
    title: string;
}

const Jeremy = ({ title }: JeremyProps): ReactElement => {
    return <div>{title}</div>;
};

export default Jeremy;
