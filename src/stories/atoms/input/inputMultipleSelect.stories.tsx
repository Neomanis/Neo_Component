import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { InputMultipleSelect } from "../../..";

export default {
    component: InputMultipleSelect,
    title: "Atoms/Input/InputMultipleSelect",
} as Meta;

const Template: ComponentStory<typeof InputMultipleSelect> = (args) => <InputMultipleSelect {...args} />;

export const Default = Template.bind({});
Default.args = {
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
    refForm: "exemple",
};
