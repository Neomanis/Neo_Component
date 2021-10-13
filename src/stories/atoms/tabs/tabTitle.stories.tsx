import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { TabTitle } from "../../..";

export default {
    title: "Atoms/Tabs/TabTitle",
    component: TabTitle,
} as Meta;

const Template: ComponentStory<typeof TabTitle> = (args) => {
    return <TabTitle {...args} />;
};

export const TabTitleDefault = Template.bind({});
TabTitleDefault.args = {
    title: "TabTitle",
    index: 0,
    selectedTab: 0,
    // eslint-disable-next-line no-console
    handleSelectedTab: () => console.log("handleSelectedTab"),
};
