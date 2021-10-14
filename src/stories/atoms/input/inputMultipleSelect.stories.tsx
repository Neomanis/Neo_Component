import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { InputMultipleSelect } from "../../..";

export default {
    title: "Atoms/Input/InputMultipleSelect",
    component: InputMultipleSelect,
} as Meta;

const Template: ComponentStory<typeof InputMultipleSelect> = (args) => <InputMultipleSelect {...args} />;

export const Default = Template.bind({});
Default.args = {
    refForm: "exemple",
    items: [
        {
            id: 1,
            value: "exemple1",
        },
        {
            id: 2,
            value: "exemple2",
        },
    ],
};
