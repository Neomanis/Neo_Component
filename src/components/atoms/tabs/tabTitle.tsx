import React, { ReactElement } from "react";

import Button from "../button";

type Props = {
    index: number;
    handleSelectedTab: (index: number) => void;
    selectedTab: number;
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

const TabTitle = ({ index, handleSelectedTab, selectedTab, tabTitle }: Props): ReactElement => {
    return (
        <li
            className={selectedTab === index ? tabTitle.classNameSelected : tabTitle.className}
            data-testid="tabTitle-body"
        >
            <Button
                data={tabTitle.title}
                fCallback={() => handleSelectedTab(index)}
                testId="tabTitle-button"
                svg={tabTitle.buttonSvg}
                svgClassName={selectedTab === index ? tabTitle.buttonSvgClassName : tabTitle.buttonSvgClassNameSelected}
                className={selectedTab === index ? tabTitle.buttonClassNameSelected : tabTitle.buttonClassName}
            />
        </li>
    );
};

export default TabTitle;
