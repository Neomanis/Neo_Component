import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { InputSimpleSelect } from "../../..";

export default {
    title: "Atoms/Input/InputSimpleSelect",
    component: InputSimpleSelect,
} as Meta;

const Template: ComponentStory<typeof InputSimpleSelect> = (args) => <InputSimpleSelect {...args} />;

export const Default = Template.bind({});
Default.args = {
    refForm: "exemple",
    data: [
        {
            label: "exemple1",
            value: "1",
        },
        {
            label: "exemple2",
            value: "2",
        },
    ],
};
