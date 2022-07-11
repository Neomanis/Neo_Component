/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { fakeTicket } from "../../fakeObject";
import Ticket from "../../../components/molecules/ticket/ticket";
import { faClock } from "@fortawesome/free-solid-svg-icons";

export default {
    component: Ticket,
    title: "Molecules/Ticket/Ticket",
} as Meta;

const Template: ComponentStory<typeof Ticket> = (args) => <Ticket {...args} />;

export const Default = Template.bind({});
Default.args = {
    ticket: fakeTicket,
};

export const TicketStatusPending = Template.bind({});
TicketStatusPending.args = {
    ticket: { ...fakeTicket, status: 4 },
};

export const TicketStatusNew = Template.bind({});
TicketStatusNew.args = {
    ticket: { ...fakeTicket, status: 1 },
};

export const TicketSolved = Template.bind({});
TicketSolved.args = {
    ticket: { ...fakeTicket, status: 5 },
};

export const TicketClose = Template.bind({});
TicketClose.args = {
    ticket: { ...fakeTicket, status: 6 },
};

export const DefaultVoidIcon = Template.bind({});
DefaultVoidIcon.args = {
    iconBG: faClock,
    ticketBG: true,
};
