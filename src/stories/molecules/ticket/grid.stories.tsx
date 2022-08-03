/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { Grid } from "../../../components/molecules";
import { fakeTicket } from "../../fakeObject";

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
