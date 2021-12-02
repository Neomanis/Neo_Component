import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { TestEditableTextArea } from "../../..";

export default {
    component: TestEditableTextArea,
    title: "Atoms/Input/TestEditableTextArea",
} as Meta;

const Template: ComponentStory<typeof TestEditableTextArea> = (args) => <TestEditableTextArea {...args} />;

export const Default = Template.bind({});
Default.args = {
    label: "Exemple",
    placeholder: "Exemple",
    refForm: "exempleArea",
    required: false,
};
