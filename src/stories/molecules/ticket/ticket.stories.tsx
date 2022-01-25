/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { fakeTicket } from "../../fakeObject";
import { i18n } from "../../../i18n";
import Ticket from "../../../components/molecules/ticket/ticket";
import { faClock } from "@fortawesome/free-solid-svg-icons";

export default {
    component: Ticket,
    title: "Molecules/Ticket/Ticket",
} as Meta;

const Template: ComponentStory<typeof Ticket> = (args) => {
    return <Ticket {...args} languageUser={i18n.language} />;
};

export const Default = Template.bind({});
Default.args = {
    ticket: fakeTicket,
    shadow: true,
};

export const DefaultVoidIcon = Template.bind({});
DefaultVoidIcon.args = {
    iconBG: faClock,
    neoHelper: true,
};
