import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { RequesterInfo } from "../../..";

export default {
    component: RequesterInfo,
    title: "Atoms/Ticket/RequesterInfo",
} as Meta;

const Template: ComponentStory<typeof RequesterInfo> = (args) => <RequesterInfo {...args} />;

export const Default = Template.bind({});
Default.args = {};
export const CompactTicket = Template.bind({});
CompactTicket.args = {
    isGroup: true,
    requester: { name: "Requester" },
    type: "compactTicket",
};
