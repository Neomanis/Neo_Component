/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import NeoHelperTicket from "./NeoHelperTicketBanner";
import { fakeTicket } from "@/utils/storiesData/fakeObject";
import { faServer } from "@fortawesome/free-solid-svg-icons";

export default {
    component: NeoHelperTicket,
    title: "Atoms/NeoHelperTicketBanner",
} as Meta;

const Template: ComponentStory<typeof NeoHelperTicket> = (args) => {
    return (
        <div className="w-[260px]">
            <NeoHelperTicket {...args} />;
        </div>
    );
};

export const Ticket: ComponentStory<typeof NeoHelperTicket> = Template.bind({});
Ticket.args = {
    ticket: fakeTicket,
    onClick: () => console.log("clicked"),
    categoryIcon: faServer,
    type: "ticket",
    userLanguage: "fr-FR",
};

export const Banner: ComponentStory<typeof NeoHelperTicket> = Template.bind({});
Banner.args = {
    ticket: fakeTicket,
    categoryIcon: faServer,
    type: "banner",
    userLanguage: "fr-FR",
};
