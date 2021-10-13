import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { InputSelect } from "../../..";

export default {
    title: "Atoms/Input/InputSelect",
    component: InputSelect,
} as Meta;

const Template: ComponentStory<typeof InputSelect> = (args) => <InputSelect {...args} />;

export const Default = Template.bind({});
Default.args = {
    refForm: "exemple",
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
};
