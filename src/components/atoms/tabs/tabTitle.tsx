import React, { ReactElement } from "react";
import Button from "../button";

type Props = {
    title: string;
    index: number;
    selectedTab: number;
    handleSelectedTab: (index: number) => void;
};

const TabTitle = ({ title, handleSelectedTab, index, selectedTab }: Props): ReactElement => {
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
