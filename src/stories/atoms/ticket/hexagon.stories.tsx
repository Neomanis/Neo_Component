import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { Hexagon } from "../../../components/atoms";

export default {
    component: Hexagon,
    title: "Atoms/Ticket/Hexagon",
} as Meta;

const Template: ComponentStory<typeof Hexagon> = (args) => {
    return (
        <div className="w-full h-full bg-neo-bg-A">
            <Hexagon {...args} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {};
export const DefaultIcon = Template.bind({});
DefaultIcon.args = {
    bgColor: "#2fa8fc",
};
export const Ticket = Template.bind({});
Ticket.args = {
    isNotif: true,
    isSelected: true,
    type: "ticket",
};
