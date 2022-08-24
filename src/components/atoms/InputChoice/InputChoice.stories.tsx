/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import InputChoice from "./InputChoice";

export default {
    component: InputChoice,
    title: "Atoms/Input/InputChoice",
} as Meta;

const Template: ComponentStory<typeof InputChoice> = (args) => {
    return <InputChoice {...args} />;
};

export const Default: ComponentStory<typeof InputChoice> = Template.bind({});
Default.args = {
    className: "",
    data: [
        {
            label: "Network",
            value: 1,
        },
        {
            label: "Printer",
            value: 2,
        },
        {
            label: "Telephony",
            value: 3,
        },
        {
            label: "System",
            value: 4,
        },
    ],
};
