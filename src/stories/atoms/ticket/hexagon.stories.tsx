import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { Hexagon } from "../../..";

export default {
    title: "Atoms/Ticket/Hexagon",
    component: Hexagon,
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
    type: "ticket",
    isNotif: true,
    isSelected: true,
};
export const Filter = Template.bind({});
Filter.args = {
    type: "filter",
    isNotif: true,
    isSelected: true,
};
export const Rotate = Template.bind({});
Rotate.args = {
    type: "rotate",
    isNotif: true,
    isSelected: true,
};
export const LeftHalf = Template.bind({});
LeftHalf.args = {
    type: "leftHalf",
    isNotif: true,
    isSelected: true,
};
export const RightHalf = Template.bind({});
RightHalf.args = {
    type: "rightHalf",
    isNotif: true,
    isSelected: true,
};
