import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { InputFile } from "../../..";

export default {
    title: "Atoms/Input/InputFile",
    component: InputFile,
} as Meta;

const Template: ComponentStory<typeof InputFile> = (args) => <InputFile {...args} />;

export const Default = Template.bind({});
Default.args = {
    name: "exemple",
    id: "id-1",
    required: true,
    label: "label",
    accept: "img",
};
export const DefaultNoLabel = Template.bind({});
DefaultNoLabel.args = {
    name: "exemple",
    id: "id-1",
    required: true,
    accept: "img",
};
