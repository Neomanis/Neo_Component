import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { Checkbox } from "../..";

export default {
    title: "Atoms/Checkbox",
    argTypes: { onChange: { action: "change" } },
    component: Checkbox,
} as Meta;

const Template: ComponentStory<typeof Checkbox> = (args) => <Checkbox {...args} />;

export const BoxDefault = Template.bind({});
BoxDefault.args = {
    data: "Label",
    testId: "test-default",
    name: "default",
};
export const BoxTrue = Template.bind({});
BoxTrue.args = {
    data: "Label true",
    checked: true,
    testId: "test-default",
    name: "true",
};
export const BoxFalse = Template.bind({});
BoxFalse.args = {
    data: "Label flase",
    checked: false,
    testId: "test-default",
    name: "flase",
};
