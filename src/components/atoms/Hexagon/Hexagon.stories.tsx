/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import Hexagon from "./Hexagon";

export default {
    component: Hexagon,
    title: "Atoms/Hexagon",
} as Meta;

const Template: ComponentStory<typeof Hexagon> = (args) => {
    return <Hexagon {...args} />;
};

export const Default: ComponentStory<typeof Hexagon> = Template.bind({});

export const DefaultIcon: ComponentStory<typeof Hexagon> = Template.bind({});
DefaultIcon.args = {
    bgColor: "#2fa8fc",
};

export const Ticket = Template.bind({});
Ticket.args = {
    isSelected: true,
    type: "ticket",
};
