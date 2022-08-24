/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import Tabs from "./Tabs";
import Tab from "../Tab";

export default {
    component: Tabs,
    title: "Atoms/Tabs/Tabs",
} as Meta;

const Template: ComponentStory<typeof Tabs> = (args) => {
    return (
        <Tabs {...args}>
            <Tab title="TabOne">Some content</Tab>
            <Tab title="TabTwo">Some other content</Tab>
        </Tabs>
    );
};

export const Default: ComponentStory<typeof Tabs> = Template.bind({});
