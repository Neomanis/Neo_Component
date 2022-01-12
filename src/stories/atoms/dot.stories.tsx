/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { Dot } from "../..";

export default {
    component: Dot,
    title: "Atoms/Dot",
} as Meta;

const Template: ComponentStory<typeof Dot> = (args) => {
    return (
        <div className=" bg-neo-bg-A h-8 flex justify-center items-center w-8">
            <Dot {...args} />
        </div>
    );
};
export const Animation = Template.bind({});
Animation.args = {
    isCancelable: true,
    isCooldown: true,
    onClickCallback: () => console.log("ok"),
    trigger: true,
};

export const Success = Template.bind({});
Success.args = {
    isSuccess: true,
    onClickCallback: () => console.log("ok"),
    positionClassname: "",
};
export const CoolDown = Template.bind({});
CoolDown.args = {
    isCancelable: true,
    onClickCallback: () => console.log("ok"),
    positionClassname: "",
};
export const Error = Template.bind({});
Error.args = {
    errorMessage: "errorExemple",
    isError: true,
    onClickCallback: () => console.log("ok"),
    positionClassname: "",
};
