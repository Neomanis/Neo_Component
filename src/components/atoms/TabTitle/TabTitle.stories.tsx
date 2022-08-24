/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import TabTitle from "./TabTitle";

export default {
    component: TabTitle,
    title: "Atoms/Tabs/TabTitle",
} as Meta;

const Template: ComponentStory<typeof TabTitle> = (args) => {
    return <TabTitle {...args} />;
};

export const Default: ComponentStory<typeof TabTitle> = Template.bind({});
Default.args = {
    handleSelectedTab: () => console.log("handleSelectedTab"),
    index: 0,
    selectedTab: 0,
    title: "TabTitle",
};
