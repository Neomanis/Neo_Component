/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import Loader from "./Loader";

export default {
    component: Loader,
    title: "Atoms/Loader",
} as Meta;

const Template: ComponentStory<typeof Loader> = (args) => {
    return <Loader {...args} />;
};

export const Default: ComponentStory<typeof Loader> = Template.bind({});
Default.args = {
    data: "Example",
};

export const CircleOnly: ComponentStory<typeof Loader> = Template.bind({});
CircleOnly.args = {
    type: "circleOnly",
};
