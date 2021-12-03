import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { TestEditableTextArea } from "../../..";

export default {
    component: TestEditableTextArea,
    title: "Atoms/Input/TestEditableTextArea",
} as Meta;

const Template: ComponentStory<typeof TestEditableTextArea> = (args) => (
    <div className="w-full h-screen bg-neo-bg-B text-white">
        <TestEditableTextArea {...args} />
    </div>
);

export const Default = Template.bind({});
Default.args = {
    refForm: "content",
    required: false,
};

export const AreaUpdate = Template.bind({});
AreaUpdate.args = {
    isUpdateField: true,
    refForm: "content",
    required: false,
};
