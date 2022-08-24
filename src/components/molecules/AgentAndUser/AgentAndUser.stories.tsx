/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import AgentAndUser from "./AgentAndUser";

export default {
    component: AgentAndUser,
    title: "Molecules/Statistics/AgentAndUser",
} as Meta;

const Template: ComponentStory<typeof AgentAndUser> = (args) => {
    return <AgentAndUser {...args} />;
};

export const Default: ComponentStory<typeof AgentAndUser> = Template.bind({});
Default.args = {
    agentNumber: 10,
    userNumber: 96,
    className: "bg-neo-bg-stat text-white",
};

export const AgentAndUserWithBorder: ComponentStory<typeof AgentAndUser> = Template.bind({});
AgentAndUserWithBorder.args = {
    agentNumber: 10,
    userNumber: 96,
    className: "border-2 border-neo-bg-B text-neo-link",
};
