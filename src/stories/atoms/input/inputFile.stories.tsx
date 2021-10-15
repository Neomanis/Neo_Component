import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { InputFile } from "../../..";

export default {
    component: InputFile,
    title: "Atoms/Input/InputFile",
} as Meta;

const Template: ComponentStory<typeof InputFile> = (args) => <InputFile {...args} />;

export const Default = Template.bind({});
Default.args = {
    accept: "img",
    id: "id-1",
    label: "label",
    name: "exemple",
    required: true,
};
export const DefaultNoLabel = Template.bind({});
DefaultNoLabel.args = {
    accept: "img",
    id: "id-1",
    name: "exemple",
    required: true,
};
