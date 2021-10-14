import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { RequesterInfo } from "../../..";

export default {
    title: "Atoms/Ticket/RequesterInfo",
    component: RequesterInfo,
} as Meta;

const Template: ComponentStory<typeof RequesterInfo> = (args) => <RequesterInfo {...args} />;

export const Default = Template.bind({});
Default.args = {};
export const CompactTicket = Template.bind({});
CompactTicket.args = {
    type: "compactTicket",
    isGroup: true,
    requester: { name: "Requester" },
};
