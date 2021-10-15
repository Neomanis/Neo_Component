import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { InputTextarea } from "../../..";

export default {
    component: InputTextarea,
    title: "Atoms/Input/InputTextarea",
} as Meta;

const Template: ComponentStory<typeof InputTextarea> = (args) => <InputTextarea {...args} />;

export const Default = Template.bind({});
Default.args = {
    label: "Exemple",
    placeholder: "Exemple",
    refForm: "exempleArea",
    required: false,
};
