/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { fakeTicket, fakeUser } from "@/utils/storiesData/fakeObject";

import Grid from "./Grid";
import { Ticket } from "@neomanis/neo-types";
import { faUserCog } from "@fortawesome/free-solid-svg-icons";

export default {
    component: Grid,
    title: "Molecules/Grid",
} as Meta;

const Template: ComponentStory<typeof Grid> = (args) => {
    return <Grid {...args} />;
};

const ticketList = Array.from({ length: 24 }, () => ({
    ...fakeTicket,
    id: Math.floor(Math.random() * 20),
})) as Ticket[];

export const Default: ComponentStory<typeof Grid> = Template.bind({});
Default.args = {
    fCurrentTicket: () => console.log("fCurrentTicket"),
    reverseGrid: false,
    ticketList: ticketList,
    categoriesIcons: [{ name: "server", icon: faUserCog }],
    rows: 4,
    cols: 4,
    showPagination: true,
    userNeoId: fakeUser.neoId,
};

export const DefaultHelper: ComponentStory<typeof Grid> = Template.bind({});
DefaultHelper.args = {
    fCurrentTicket: () => console.log("fCurrentTicket"),
    reverseGrid: true,
    ticketBG: true,
    ticketList: ticketList,
    rows: 4,
    cols: 1,
    showPagination: true,
};
