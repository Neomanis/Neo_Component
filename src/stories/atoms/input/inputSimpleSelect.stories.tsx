import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { InputSimpleSelect } from "../../..";

export default {
    component: InputSimpleSelect,
    title: "Atoms/Input/InputSimpleSelect",
} as Meta;

const Template: ComponentStory<typeof InputSimpleSelect> = (args) => <InputSimpleSelect {...args} />;

export const Default = Template.bind({});
Default.args = {
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
    refForm: "exemple",
};
