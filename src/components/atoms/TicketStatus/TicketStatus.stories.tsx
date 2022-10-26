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

export const New: ComponentStory<typeof TicketStatus> = Template.bind({});
New.args = {
    status: 1,
};

export const InProgress: ComponentStory<typeof TicketStatus> = Template.bind({});
InProgress.args = {
    status: 2,
};

export const Planned: ComponentStory<typeof TicketStatus> = Template.bind({});
Planned.args = {
    status: 3,
};

export const Pending: ComponentStory<typeof TicketStatus> = Template.bind({});
Pending.args = {
    status: 4,
};

export const solved: ComponentStory<typeof TicketStatus> = Template.bind({});
solved.args = {
    status: 5,
};

export const Closed: ComponentStory<typeof TicketStatus> = Template.bind({});
Closed.args = {
    status: 6,
};
