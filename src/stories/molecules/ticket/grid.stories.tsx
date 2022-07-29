/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { Grid } from "../../../components/molecules";
import { fakeGlpiGroups, fakeGlpiUsers, fakeTicket } from "../../fakeObject";

export default {
    component: Grid,
    title: "Molecules/Ticket/Grid",
} as Meta;

const Template: ComponentStory<typeof Grid> = (args) => {
    return (
        <div className="py-4 px-8 bg-neo-bg-A flex justify-between">
            <Grid {...args} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    glpiGroups: fakeGlpiGroups,
    glpiUsers: fakeGlpiUsers,
    fCurrentTicket: () => console.log("fCurrentTicket"),
    fOpenModalCurrentTicket: () => console.log("fOpenModalCurrentTicket"),
    fOpenTicketModal: () => console.log("fOpenTicketModal"),
    fShowChatModal: () => console.log("fShowChatModal"),
    reverseGrid: false,
    ticketList: Array.from({ length: 24 }, () => ({
        ...fakeTicket,
        id: Math.floor(Math.random() * 20),
    })),
    rows: 4,
    cols: 4,
    showPagination: true,
};

export const DefaultHelper = Template.bind({});
DefaultHelper.args = {
    fCurrentTicket: () => console.log("fCurrentTicket"),
    fOpenModalCurrentTicket: () => console.log("fOpenModalCurrentTicket"),
    reverseGrid: true,
    showBackgroundIcon: true,
    ticketBG: true,
    ticketList: Array.from({ length: 50 }, () => ({
        ...fakeTicket,
        id: Math.floor(Math.random() * 20),
    })),
    rows: 4,
    cols: 1,
    showPagination: true,
};
