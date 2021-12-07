import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { TextEditor } from "../../..";

export default {
    component: TextEditor,
    title: "Atoms/Input/TestEditableTextArea",
} as Meta;

const Template: ComponentStory<typeof TextEditor> = (args) => (
    <div className="w-full h-screen bg-neo-bg-B text-white">
        <TextEditor {...args} />
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
