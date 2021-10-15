import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { EditableTextarea } from "../../..";

export default {
    component: EditableTextarea,
    title: "Atoms/Input/EditableTextArea",
} as Meta;

const Template: ComponentStory<typeof EditableTextarea> = (args) => {
    return <EditableTextarea {...args} />;
};

export const AreaNoUpdate = Template.bind({});
AreaNoUpdate.args = {
    isUpdateField: false,
    refForm: "content",
    required: true,
};
export const AreaUpdate = Template.bind({});
AreaUpdate.args = {
    isUpdateField: true,
    refForm: "content",
    required: false,
};
