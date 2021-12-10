/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { fakeGlpiGroups, fakeGlpiUsers, fakeTicket } from "../../fakeObject";
import { i18n } from "../../../i18n";
import Grid from "../../../components/molecules/ticket/grid";

export default {
    component: Grid,
    title: "Molecules/Ticket/Grid",
} as Meta;

const Template: ComponentStory<typeof Grid> = (args) => {
    return (
        <div className="p-4 w-1/2 bg-neo-bg-A">
            <Grid {...args} languageUser={i18n.language} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    col: 2,
    row: 3,
    fCurrentTicket: () => console.log("fCurrentTicket"),
    fOpenModalCurrentTicket: () => console.log("fOpenModalCurrentTicket"),
    fOpenTicketModal: () => console.log("fOpenTicketModal"),
    fShowChatModal: () => console.log("fShowChatModal"),
    glpiGroups: fakeGlpiGroups,
    glpiUsers: fakeGlpiUsers,
    tickets: [
        fakeTicket,
        fakeTicket,
        fakeTicket,
        fakeTicket,
        fakeTicket,
        fakeTicket,
        fakeTicket,
        fakeTicket,
        fakeTicket,
        fakeTicket,
    ],
    withHover: true,
    paginationGrid: true,
};
export const DefaultHelper = Template.bind({});
DefaultHelper.args = {
    col: 2,
    row: 3,
    fCurrentTicket: () => console.log("fCurrentTicket"),
    fOpenModalCurrentTicket: () => console.log("fOpenModalCurrentTicket"),
    iconBG: true,
    tickets: [fakeTicket, fakeTicket, fakeTicket, fakeTicket],
    withHover: false,
    reverseGrid: true,
};
