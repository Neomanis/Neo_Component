import React, { ReactElement } from "react";

import Button from "../button";

type Props = {
    index: number;
    handleSelectedTab: (index: number) => void;
    selectedTab: number;
    title: string;
};

const TabTitle = ({ index, handleSelectedTab, selectedTab, title }: Props): ReactElement => {
    return (
        <li
            className={`mr-4 cursor-pointer border-b-2 font-bold
                        ${selectedTab !== index && "hover:text-white"}
                        ${
                            selectedTab === index ? "text-neo-blue border-neo-blue" : " border-opacity-0 text-neo-link"
                        } `}
        >
            <Button data={title} fCallback={() => handleSelectedTab(index)} />
        </li>
    );
};

export default TabTitle;
