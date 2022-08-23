import React, { ReactElement, ReactNode } from "react";

export interface TabProps {
    children: ReactNode;
    title: string;
}

const Tab = ({ children }: TabProps): ReactElement => {
    return <div data-testid="tab-body">{children}</div>;
};

export default Tab;
