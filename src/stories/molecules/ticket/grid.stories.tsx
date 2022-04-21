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
        <div className="p-4 bg-neo-bg-A">
            <Grid {...args} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    rows: 2,
    cols: 2,
    glpiGroups: fakeGlpiGroups,
    glpiUsers: fakeGlpiUsers,
    fCurrentTicket: () => console.log("fCurrentTicket"),
    fOpenModalCurrentTicket: () => console.log("fOpenModalCurrentTicket"),
    fOpenTicketModal: () => console.log("fOpenTicketModal"),
    fShowChatModal: () => console.log("fShowChatModal"),
    ticketList: Array.from({ length: 28 }, () => ({ ...fakeTicket, id: Math.floor(Math.random() * 20) })),
    showPagination: true,
    reverseGrid: false,
};

export const DefaultHelper = Template.bind({});
DefaultHelper.args = {
    cols: 1,
    fCurrentTicket: () => console.log("fCurrentTicket"),
    fOpenModalCurrentTicket: () => console.log("fOpenModalCurrentTicket"),
    showBackgroundIcon: true,
    rows: 4,
    ticketList: [fakeTicket, fakeTicket, fakeTicket],
    reverseGrid: true,
    ticketBG: true,
};
