/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import IconOutageCategory from "./IconOutageCategory";

export default {
    component: IconOutageCategory,
    title: "Atoms/IconOutageCategory",
} as Meta;

const Template: ComponentStory<typeof IconOutageCategory> = (args) => {
    return <IconOutageCategory {...args} />;
};

export const Default: ComponentStory<typeof IconOutageCategory> = Template.bind({});

export const Intervention: ComponentStory<typeof IconOutageCategory> = Template.bind({});
Intervention.args = {
    id: 1,
};

export const Outage: ComponentStory<typeof IconOutageCategory> = Template.bind({});
Outage.args = {
    id: 2,
};
