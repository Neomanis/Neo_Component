/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { fakeTicket } from "../../fakeObject";
import DraggableTicket from "../../../components/molecules/ticket/dndTicket";
import { faClock } from "@fortawesome/free-solid-svg-icons";

export default {
    component: DraggableTicket,
    title: "Molecules/Ticket/DNDTicket",
} as Meta;

const Template: ComponentStory<typeof DraggableTicket> = (args) => <DraggableTicket {...args} dndId="dndId" />;

export const Default = Template.bind({});
Default.args = {
    ticketProps: {
        ticket: fakeTicket,
        shadow: true,
    },
};

export const DefaultVoidIcon = Template.bind({});
DefaultVoidIcon.args = {
    ticketProps: {
        iconBG: faClock,
        ticketBG: false,
    },
};
export const LoadingTicket = Template.bind({});
LoadingTicket.args = {
    ticketProps: {
        iconBG: faClock,
        ticketBG: false,
        ticket: {
            ...fakeTicket,
            isPositionLoading: true,
        },
    },
};
