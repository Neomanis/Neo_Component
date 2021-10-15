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
            className={`mr-4 cursor-pointer border-b-2 
                        ${selectedTab !== index && "hover:text-white"}
                        ${selectedTab === index ? " text-neo_blue-blue_sky" : "text-neo_black-black_02"} 
                        ${selectedTab === index ? " border-neo_blue-blue_sky" : " border-neo_blue-modal"}`}
        >
            <Button data={title} fCallback={() => handleSelectedTab(index)} />
        </li>
    );
};

export default TabTitle;
