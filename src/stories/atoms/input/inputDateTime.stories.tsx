import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { InputDateTime } from "../../..";

export default {
    component: InputDateTime,
    title: "Atoms/Input/inputDateTime",
} as Meta;

const Template: ComponentStory<typeof InputDateTime> = (args) => <InputDateTime {...args} />;

export const InputDateTimeUpdate = Template.bind({});
InputDateTimeUpdate.args = {
    errorMessage: "error",
    isError: true,
    isUpdateField: true,
    refForm: "date_creation",
    showTimeInput: true,
};

export const InputDateTimeNoUpdate = Template.bind({});
InputDateTimeNoUpdate.args = {
    errorMessage: "error",
    isError: true,
    isUpdateField: false,
    refForm: "date_creation",
    showTimeInput: true,
};
