import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { Tab } from "../../..";

export default {
    title: "Atoms/Tabs/Tab",
    component: Tab,
} as Meta;

const Template: ComponentStory<typeof Tab> = (args) => {
    return <Tab {...args}>You write your tab content here</Tab>;
};

export const TabDefault = Template.bind({});
