import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { InputMultipleSelect } from "../../../components/atoms";

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
    isUpdateField: true,
    // eslint-disable-next-line no-console
    updateFunction: (refForm, value) => console.log(refForm, value),
};
