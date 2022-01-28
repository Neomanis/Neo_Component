import React, { ReactElement, ReactNode } from "react";

type Props = {
    children: ReactNode;
    tabTitle: {
        buttonClassName?: string;
        buttonClassNameSelected?: string;
        buttonSvg?: ReactElement;
        buttonSvgClassName?: string;
        buttonSvgClassNameSelected?: string;
        className?: string;
        classNameSelected?: string;
        title: string;
    };
};

const Tab = ({ children }: Props): ReactElement => {
    return <div data-testid="tab-body">{children}</div>;
};

export default Tab;
