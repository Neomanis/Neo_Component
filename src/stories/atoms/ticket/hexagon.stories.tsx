import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { Hexagon } from "../../..";

export default {
    component: Hexagon,
    title: "Atoms/Ticket/Hexagon",
} as Meta;

const Template: ComponentStory<typeof Hexagon> = (args) => {
    return (
        <div className="w-64 h-64">
            <Hexagon {...args} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {};
export const Ticket = Template.bind({});
Ticket.args = {
    isNotif: true,
    isSelected: true,
    type: "ticket",
};
export const Filter = Template.bind({});
Filter.args = {
    isNotif: true,
    isSelected: true,
    type: "filter",
};
export const Rotate = Template.bind({});
Rotate.args = {
    isNotif: true,
    isSelected: true,
    type: "rotate",
};
export const LeftHalf = Template.bind({});
LeftHalf.args = {
    isNotif: true,
    isSelected: true,
    type: "leftHalf",
};
export const RightHalf = Template.bind({});
RightHalf.args = {
    isNotif: true,
    isSelected: true,
    type: "rightHalf",
};
