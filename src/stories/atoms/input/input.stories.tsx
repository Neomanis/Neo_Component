import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { Input } from "../../..";

export default {
    title: "Atoms/Input/InputDefault",
    component: Input,
} as Meta;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const InputDefault = Template.bind({});
InputDefault.args = {
    labelClassName: "my-2 bg-neo_black-black_1 pb-2 pt-1 px-3 rounded-xl w-full relative",
    inputClassName: "bg-transparent border-neo_black-black_02 border-b-2 focus:outline-none text-white",
    typeInput: "input",
    refForm: "login",
    required: true,
    // eslint-disable-next-line no-console
    onChangeCallBack: (): void => console.log("submitError"),
};
