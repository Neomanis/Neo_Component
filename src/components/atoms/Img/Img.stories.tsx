/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import Img from "./Img";

export default {
    component: Img,
    title: "Atoms/Img",
} as Meta;

const Template: ComponentStory<typeof Img> = (args) => {
    return <Img {...args} />;
};

export const Default: ComponentStory<typeof Img> = Template.bind({});
Default.args = {
    type: "imgProfile",
};

export const ImgProfile = Template.bind({});
ImgProfile.args = {
    type: "imgProfile",
    className: "rounded-full",
};
