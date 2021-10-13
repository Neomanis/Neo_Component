import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { Tab, Tabs } from "../../..";

export default {
    title: "Atoms/Tabs/Tabs",
    component: Tabs,
} as Meta;

const Template: ComponentStory<typeof Tabs> = (args) => {
    return (
        <Tabs {...args}>
            <Tab title="TabOne">Some content</Tab>
            <Tab title="TabTwo">Some other content</Tab>
        </Tabs>
    );
};

export const TabsDefault = Template.bind({});
