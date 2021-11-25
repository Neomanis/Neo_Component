import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { Input } from "../../..";

export default {
    component: Input,
    title: "Atoms/Input/InputDefault",
} as Meta;

const Template: ComponentStory<typeof Input> = (args) => {
    return (
        <div className=" bg-neo_bg_A">
            <Input {...args} />
        </div>
    );
};

export const InputDefault = Template.bind({});
InputDefault.args = {
    inputClassName: "bg-transparent border-neo_black-black_02 border-b-2 focus:outline-none text-white",
    labelClassName: "my-2 bg-neo_black-black_1 pb-2 pt-1 px-3 rounded-xl w-full relative",
    // eslint-disable-next-line no-console
    onChangeCallBack: (): void => console.log("submitError"),
    refForm: "login",
    required: true,
    typeInput: "input",
};
