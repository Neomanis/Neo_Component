import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { Tab } from "../../../components/atoms";

export default {
    component: Tab,
    title: "Atoms/Tabs/Tab",
} as Meta;

const Template: ComponentStory<typeof Tab> = (args) => {
    return <Tab {...args}>You write your tab content here</Tab>;
};

export const TabDefault = Template.bind({});
