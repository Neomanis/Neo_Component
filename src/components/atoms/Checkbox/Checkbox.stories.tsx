/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import Checkbox from "./Checkbox";

export default {
    component: Checkbox,
    title: "Atoms/Checkbox",
} as Meta;

const Template: ComponentStory<typeof Checkbox> = (args) => {
    return <Checkbox {...args} />;
};

export const Default: ComponentStory<typeof Checkbox> = Template.bind({});
Default.args = {
    data: "Label",
    name: "default",
    testId: "test-default",
};

export const BoxTrue: ComponentStory<typeof Checkbox> = Template.bind({});
BoxTrue.args = {
    checked: true,
    data: "Label true",
    name: "true",
    testId: "test-default",
    classNameLabel: "text-white",
};

export const BoxFalse: ComponentStory<typeof Checkbox> = Template.bind({});
BoxFalse.args = {
    checked: false,
    data: "Label false",
    name: "false",
    testId: "test-default",
    classNameLabel: "text-red",
};
