/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import Pill from "./Pill";

export default {
    component: Pill,
    title: "Atoms/Pill",
} as Meta;

const Template: ComponentStory<typeof Pill> = (args) => {
    return <Pill {...args} />;
};

export const Default: ComponentStory<typeof Pill> = Template.bind({});
Default.args = {
    data: "17",
};

export const WithStyle: ComponentStory<typeof Pill> = Template.bind({});
WithStyle.args = {
    className: "text-xs ml-2 rounded-full text-neo-bg-A bg-neo-link font-bold p-2",
    data: "17",
};
