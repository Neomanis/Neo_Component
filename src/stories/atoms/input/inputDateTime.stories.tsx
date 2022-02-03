import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import InputDateTimeDoc from "./inputDateTime.mdx";
import { InputDateTime } from "../../../components/atoms";

export default {
    component: InputDateTime,
    title: "Atoms/Input/inputDateTime",
    parameters: {
        docs: {
            page: InputDateTimeDoc,
        },
    },
} as Meta;

const Template: ComponentStory<typeof InputDateTime> = (args) => (
    <div className="bg-neo-bg-A p-3">
        <InputDateTime {...args} />
    </div>
);

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
