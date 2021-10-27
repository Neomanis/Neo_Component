/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { fakeTicket } from "../../fakeObject";
import i18n from "../../../i18n";
import Grid from "../../../components/molecules/ticket/grid";

export default {
    component: Grid,
    title: "Molecules/Ticket/Grid",
} as Meta;

const Template: ComponentStory<typeof Grid> = (args) => {
    return (
        <div className="p-4">
            <Grid {...args} languageUser={i18n.language} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    col: 2,
    row: 3,
    tickets: [fakeTicket, fakeTicket, fakeTicket, fakeTicket],
    withHover: true,
    fOpenModalCurrentTicket: () => console.log("fOpenModalCurrentTicket"),
    fCurrentTicket: () => console.log("fCurrentTicket"),
    fShowChatModal: () => console.log("fShowChatModal"),
    fOpenTicketModal: () => console.log("fOpenTicketModal"),
};
export const DefaultHelper = Template.bind({});
DefaultHelper.args = {
    col: 2,
    row: 3,
    tickets: [fakeTicket, fakeTicket, fakeTicket, fakeTicket],
    withHover: false,
    iconBG: true,
    fOpenModalCurrentTicket: () => console.log("fOpenModalCurrentTicket"),
    fCurrentTicket: () => console.log("fCurrentTicket"),
};
