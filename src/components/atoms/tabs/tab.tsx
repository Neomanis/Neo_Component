import React, { ReactElement, ReactNode } from "react";

type Props = {
    children: ReactNode;
    title: string;
};

const Tab = ({ children }: Props): ReactElement => {
    return <div data-testid="tab-body">{children}</div>;
};

export default Tab;
