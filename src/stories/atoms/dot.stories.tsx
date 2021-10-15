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
        <div className="bg-neo_blue-dark h-8 flex justify-center items-center w-8">
            <Dot {...args} />
        </div>
    );
};
export const Animation = Template.bind({});
Animation.args = {
    isCancelable: true,
    isCooldown: true,
    isSuccess: false,
    onClickCallback: () => console.log("ok"),
    trigger: true,
};

export const Success = Template.bind({});
Success.args = {
    isCooldown: false,
    isSuccess: true,
    onClickCallback: () => console.log("ok"),
    positionClassname: "",
};
export const CoolDown = Template.bind({});
CoolDown.args = {
    isCancelable: true,
    isSuccess: false,
    onClickCallback: () => console.log("ok"),
    positionClassname: "",
};
export const Error = Template.bind({});
Error.args = {
    errorMessage: "errorExemple",
    isCancelable: false,
    isError: true,
    isSuccess: false,
    onClickCallback: () => console.log("ok"),
    positionClassname: "",
};
