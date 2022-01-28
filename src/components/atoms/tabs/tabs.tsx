import React, { ReactElement, useState } from "react";

import TabTitle from "./tabTitle";

type Props = {
    children: ReactElement[];
};

const Tabs = ({ children }: Props): ReactElement => {
    const [selectedTab, setSelectedTab] = useState(0);

    function handleSelectedTab(index: number): void {
        setSelectedTab(index);
    }

    return (
        <div data-testid="tabs-body">
            <ul className="flex list-none mt-3">
                {children.map((item, index) => (
                    <TabTitle
                        handleSelectedTab={handleSelectedTab}
                        index={index}
                        key={index}
                        selectedTab={selectedTab}
                        tabTitle={item.props.tabTitle}
                    />
                ))}
            </ul>
            {children.map((child, index) => (
                <div key={index} className={`${selectedTab === index ? "" : "hidden"}`}>
                    {child}
                </div>
            ))}
        </div>
    );
};

export default Tabs;
