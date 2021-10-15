import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { InputDateShift } from "../../..";

export default {
    component: InputDateShift,
    title: "Atoms/input/InputDateShift",
} as Meta;

const Template: ComponentStory<typeof InputDateShift> = (args) => <InputDateShift {...args} />;
const shifts = [
    { id: 3600, value: "1h" },
    { id: 3600 * 6, value: "6h" },
    { id: 3600 * 24, value: "1j" },
    { id: 3600 * 48, value: "2j" },
    { id: 3600 * 72, value: "3j" },
];
const date = new Date();
export const Default = Template.bind({});
Default.args = {
    date: date,
    label: "Exemple Label",
    tabProps: shifts,
};
