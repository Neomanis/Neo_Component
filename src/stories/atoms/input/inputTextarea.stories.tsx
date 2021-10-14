import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { InputTextarea } from "../../..";

export default {
    title: "Atoms/Input/InputTextarea",
    component: InputTextarea,
} as Meta;

const Template: ComponentStory<typeof InputTextarea> = (args) => <InputTextarea {...args} />;

export const Default = Template.bind({});
Default.args = {
    placeholder: "Exemple",
    required: false,
    label: "Exemple",
    refForm: "exempleArea",
};
