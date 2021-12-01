import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { Checkbox } from "../..";

export default {
    argTypes: { onChange: { action: "change" } },
    component: Checkbox,
    title: "Atoms/Checkbox",
} as Meta;

const Template: ComponentStory<typeof Checkbox> = (args) => (
    <div className="bg-neo-bg-B w-full h-96">
        <Checkbox {...args} />
    </div>
);

export const BoxDefault = Template.bind({});
BoxDefault.args = {
    data: "Label",
    name: "default",
    testId: "test-default",
};
export const BoxTrue = Template.bind({});
BoxTrue.args = {
    checked: true,
    data: "Label true",
    name: "true",
    testId: "test-default",
    classNameLabel: "text-white",
};
export const BoxFalse = Template.bind({});
BoxFalse.args = {
    checked: false,
    data: "Label false",
    name: "false",
    testId: "test-default",
    classNameLabel: "text-red",
};
