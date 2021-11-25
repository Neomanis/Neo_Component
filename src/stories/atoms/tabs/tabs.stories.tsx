import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { Tab, Tabs } from "../../..";

export default {
    component: Tabs,
    title: "Atoms/Tabs/Tabs",
} as Meta;

const Template: ComponentStory<typeof Tabs> = (args) => {
    return (
        <div className=" bg-neo_blue_modal">
            <Tabs {...args}>
                <Tab title="TabOne">Some content</Tab>
                <Tab title="TabTwo">Some other content</Tab>
            </Tabs>
        </div>
    );
};

export const TabsDefault = Template.bind({});
