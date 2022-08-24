/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import Ticket from "./Ticket";
import { fakeTicket } from "@/utils/storiesData/fakeObject";

export default {
    component: Ticket,
    title: "Molecules/Ticket/Ticket",
} as Meta;

const Template: ComponentStory<typeof Ticket> = (args) => {
    return <Ticket {...args} />;
};

export const Default: ComponentStory<typeof Ticket> = Template.bind({});
Default.args = {
    ticket: fakeTicket,
};

export const TicketStatusPending: ComponentStory<typeof Ticket> = Template.bind({});
TicketStatusPending.args = {
    ticket: { ...fakeTicket, status: 4 },
};

export const TicketStatusNew: ComponentStory<typeof Ticket> = Template.bind({});
TicketStatusNew.args = {
    ticket: { ...fakeTicket, status: 1 },
};

export const TicketSolved: ComponentStory<typeof Ticket> = Template.bind({});
TicketSolved.args = {
    ticket: { ...fakeTicket, status: 5 },
};

export const TicketClose: ComponentStory<typeof Ticket> = Template.bind({});
TicketClose.args = {
    ticket: { ...fakeTicket, status: 6 },
};

export const DefaultVoidIcon: ComponentStory<typeof Ticket> = Template.bind({});
DefaultVoidIcon.args = {
    ticketBG: true,
};
