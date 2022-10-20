/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import TicketStatus from "./TicketStatus";

export default {
    component: TicketStatus,
    title: "Atoms/TicketStatus",
} as Meta;

const Template: ComponentStory<typeof TicketStatus> = (args) => {
    return <TicketStatus {...args} />;
};

export const InProgress: ComponentStory<typeof TicketStatus> = Template.bind({});
InProgress.args = {
    status: 2,
};

export const Pending: ComponentStory<typeof TicketStatus> = Template.bind({});
Pending.args = {
    status: 4,
};
