/* eslint-disable no-console */
import React from "react";
import AgentAndUser from "../../components/molecules/statistics/agentAndUser";
import { ComponentStory, Meta } from "@storybook/react";

export default {
    title: "Molecules/Statistics/AgentAndUser",
    component: AgentAndUser,
} as Meta;

const Template: ComponentStory<typeof AgentAndUser> = (args) => {
    return (
        <div className="p-10 flex items-center w-1/3">
            <AgentAndUser {...args} />
        </div>
    );
};

export const AgentAndUserDefault = Template.bind({});
AgentAndUserDefault.args = {
    agentNumber: 10,
    userNumber: 96,
    className: "bg-neo-stats-black text-white",
};

export const AgentAndUserWithBorder = Template.bind({});
AgentAndUserWithBorder.args = {
    agentNumber: 10,
    userNumber: 96,
    className: "border-2 border-neo-bg-B text-neo-link",
    svgHexaColor: "#000",
};
