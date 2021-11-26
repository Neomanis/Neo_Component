import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { Img } from "../..";

export default {
    component: Img,
    title: "Atoms/Img",
} as Meta;

const Template: ComponentStory<typeof Img> = (args) => {
    return (
        <div className="p-4 flex items-center w-1/4 bg-neo-expanded">
            <Img {...args} />;
        </div>
    );
};

export const Imgdefault = Template.bind({});
Imgdefault.args = {
    type: "imgProfile",
};

export const ImgProfile = Template.bind({});
ImgProfile.args = {
    type: "imgProfile",
    className: "rounded-full",
};
