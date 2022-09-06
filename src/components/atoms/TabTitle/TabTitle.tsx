import React, { ReactElement } from "react";
import Button from "../Button";

export interface TabTitleProps {
    index: number;
    handleSelectedTab: (index: number) => void;
    selectedTab: number;
    title: string;
}

const TabTitle = ({ index, handleSelectedTab, selectedTab, title }: TabTitleProps): ReactElement => {
    return (
        <li
            className={`mr-4 cursor-pointer border-b-2 font-bold list-none
                        ${selectedTab !== index && "hover:text-white"}
                        ${
                            selectedTab === index ? "text-neo-blue border-neo-blue" : " border-opacity-0 text-neo-link"
                        } `}
            data-testid={`tabTitle-body-${index}`}
        >
            <Button
                variant="none"
                rounded="none"
                size="none"
                onClick={() => handleSelectedTab(index)}
                data-testid="tabTitle-button"
            >
                {title}
            </Button>
        </li>
    );
};

export default TabTitle;
