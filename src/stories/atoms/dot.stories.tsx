import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { Dot } from "../..";

export default {
    title: "Atoms/Dot",
    component: Dot,
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
    isSuccess: false,
    isCooldown: true,
    isCancelable: true,
    trigger: true,
    // eslint-disable-next-line no-console
    onClickCallback: () => console.log("ok"),
};

export const Success = Template.bind({});
Success.args = {
    isCooldown: false,
    isSuccess: true,
    positionClassname: "",
    // eslint-disable-next-line no-console
    onClickCallback: () => console.log("ok"),
};
export const CoolDown = Template.bind({});
CoolDown.args = {
    isSuccess: false,
    isCancelable: true,
    positionClassname: "",
    // eslint-disable-next-line no-console
    onClickCallback: () => console.log("ok"),
};
export const Error = Template.bind({});
Error.args = {
    errorMessage: "errorExemple",
    isSuccess: false,
    isCancelable: false,
    isError: true,
    positionClassname: "",
    // eslint-disable-next-line no-console
    onClickCallback: () => console.log("ok"),
};
