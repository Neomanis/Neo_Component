import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { InputDateTime } from "../../..";

export default {
    title: "Atoms/Input/inputDateTime",
    component: InputDateTime,
} as Meta;

const Template: ComponentStory<typeof InputDateTime> = (args) => <InputDateTime {...args} />;

export const InputDateTimeUpdate = Template.bind({});
InputDateTimeUpdate.args = {
    isError: true,
    errorMessage: "error",
    isUpdateField: true,
    refForm: "date_creation",
    showTimeInput: true,
};

export const InputDateTimeNoUpdate = Template.bind({});
InputDateTimeNoUpdate.args = {
    isError: true,
    errorMessage: "error",
    isUpdateField: false,
    refForm: "date_creation",
    showTimeInput: true,
};
