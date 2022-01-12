import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { InputChoice } from "../../../components/atoms";

export default {
    component: InputChoice,
    title: "Atoms/Input/InputChoice",
} as Meta;

const Template: ComponentStory<typeof InputChoice> = (args) => {
    return (
        <div className="bg-neo-bg-B p-2">
            <InputChoice {...args} />
        </div>
    );
};
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
