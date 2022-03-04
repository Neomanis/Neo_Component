import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { InputDateShift } from "../../../components/atoms";

export default {
    component: InputDateShift,
    title: "Atoms/input/InputDateShift",
} as Meta;

const Template: ComponentStory<typeof InputDateShift> = (args) => (
    <div className="w-full bg-neo-bg-A p-3">
        <InputDateShift {...args} />
    </div>
);
const shifts = [
    { value: 3600, label: "1h" },
    { value: 3600 * 6, label: "6h" },
    { value: 3600 * 24, label: "1j" },
    { value: 3600 * 48, label: "2j" },
    { value: 3600 * 72, label: "3j" },
];
const date = new Date();
export const Default = Template.bind({});
Default.args = {
    date: date,
    label: "Exemple Label",
    tabProps: shifts,
    inputSelectPlaceholder: "shift",
    isUpdateField: true,
};
