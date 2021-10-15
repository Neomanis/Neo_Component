import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { InputSelect } from "../../..";

export default {
    component: InputSelect,
    title: "Atoms/Input/InputSelect",
} as Meta;

const Template: ComponentStory<typeof InputSelect> = (args) => <InputSelect {...args} />;

export const Default = Template.bind({});
Default.args = {
    data: [
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
