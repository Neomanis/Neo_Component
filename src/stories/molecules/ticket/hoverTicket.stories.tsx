/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { fakeTicket } from "../../fakeObject";
import { i18n } from "../../../i18n";
import HoverTicket from "../../../components/molecules/ticket/hoverTicket";

export default {
    component: HoverTicket,
    title: "Molecules/Ticket/HoverTicket",
} as Meta;

const Template: ComponentStory<typeof HoverTicket> = (args) => {
    return <HoverTicket {...args} languageUser={i18n.language} />;
};

export const Default = Template.bind({});
Default.args = {
    ticket: fakeTicket,
    ticketRequester: "test User",
};
