/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { fakeTicket } from "@/utils/storiesData/fakeObject";

import Grid from "./Grid";

export default {
    component: Grid,
    title: "Molecules/Grid",
} as Meta;

const Template: ComponentStory<typeof Grid> = (args) => {
    return <Grid {...args} />;
};

export const Default: ComponentStory<typeof Grid> = Template.bind({});
Default.args = {
    fCurrentTicket: () => console.log("fCurrentTicket"),
    reverseGrid: false,
    ticketList: Array.from({ length: 24 }, () => ({
        ...fakeTicket,
        id: Math.floor(Math.random() * 20),
    })),
    rows: 4,
    cols: 4,
    showPagination: true,
};

export const DefaultHelper: ComponentStory<typeof Grid> = Template.bind({});
DefaultHelper.args = {
    fCurrentTicket: () => console.log("fCurrentTicket"),
    reverseGrid: true,
    ticketBG: true,
    ticketList: Array.from({ length: 50 }, () => ({
        ...fakeTicket,
        id: Math.floor(Math.random() * 20),
    })),
    rows: 4,
    cols: 1,
    showPagination: true,
};
