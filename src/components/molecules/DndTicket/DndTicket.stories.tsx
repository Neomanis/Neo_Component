/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { fakeTicket } from "@/utils/storiesData/fakeObject";

import DndTicket from "./DndTicket";

export default {
    component: DndTicket,
    title: "Molecules/DndTicket",
} as Meta;

const Template: ComponentStory<typeof DndTicket> = (args) => {
    return <DndTicket {...args} />;
};

export const Default: ComponentStory<typeof DndTicket> = Template.bind({});
Default.args = {
    ticketProps: {
        ticket: fakeTicket,
    },
};

export const DefaultVoidIcon = Template.bind({});
DefaultVoidIcon.args = {
    ticketProps: {
        iconBG: faClock,
        ticketBG: false,
    },
};
export const LoadingTicket = Template.bind({});
LoadingTicket.args = {
    ticketProps: {
        iconBG: faClock,
        ticketBG: false,
        ticket: {
            ...fakeTicket,
            isPositionLoading: true,
        },
    },
};
