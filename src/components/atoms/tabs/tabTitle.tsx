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
                            selectedTab === index ? "text-neo_blue border-neo_blue" : " border-opacity-0 text-neo_link"
                        } `}
        >
            <Button data={title} fCallback={() => handleSelectedTab(index)} />
        </li>
    );
};

export default TabTitle;
