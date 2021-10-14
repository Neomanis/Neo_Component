import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { Img } from "../..";

export default {
    title: "Atoms/Img",
    component: Img,
} as Meta;

const Template: ComponentStory<typeof Img> = (args) => <Img {...args} />;

export const ImgProfile = Template.bind({});
ImgProfile.args = {
    type: "imgProfile",
};
