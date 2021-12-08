import React, { ReactElement, ReactNode } from "react";

type Props = {
    children: ReactNode;
    title: string;
};

const Tab = ({ children }: Props): ReactElement => {
    return <div data-testid="tab-body h-full">{children}</div>;
};

export default Tab;
