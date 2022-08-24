import React, { ReactElement, useState } from "react";
import TabTitle from "../TabTitle";

export interface TabsProps {
    children: ReactElement[];
}

const Tabs = ({ children }: TabsProps): ReactElement => {
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
                        title={item.props.title}
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
