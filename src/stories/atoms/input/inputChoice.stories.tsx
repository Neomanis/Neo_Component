import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { InputChoice } from "../../..";

export default {
    title: "Atoms/Input/InputChoice",
    component: InputChoice,
} as Meta;

const Template: ComponentStory<typeof InputChoice> = (args) => <InputChoice {...args} />;

export const Default = Template.bind({});
Default.args = {
    className: "",
    data: [
        {
            label: "Network",
            value: "network",
        },
        {
            label: "Printer",
            value: "printer",
        },
        {
            label: "Telephony",
            value: "telephony",
        },
        {
            label: "System",
            value: "System",
        },
    ],
};
