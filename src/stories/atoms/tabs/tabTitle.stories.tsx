import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { TabTitle } from "../../..";

export default {
    component: TabTitle,
    title: "Atoms/Tabs/TabTitle",
} as Meta;

const Template: ComponentStory<typeof TabTitle> = (args) => {
    return <TabTitle {...args} />;
};

export const TabTitleDefault = Template.bind({});
TabTitleDefault.args = {
    // eslint-disable-next-line no-console
    handleSelectedTab: () => console.log("handleSelectedTab"),
    index: 0,
    selectedTab: 0,
    title: "TabTitle",
};
