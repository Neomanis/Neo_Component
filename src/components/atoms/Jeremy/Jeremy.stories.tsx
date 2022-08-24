/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import Jeremy from "./Jeremy";

export default {
    component: Jeremy,
    title: "Jeremy",
} as Meta;

const Template: ComponentStory<typeof Jeremy> = (args) => {
    return <Jeremy {...args} />;
};

export const Default: ComponentStory<typeof Jeremy> = Template.bind({});
Default.args = {
    title: "Jeremy",
};
