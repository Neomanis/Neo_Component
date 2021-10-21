/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { WorkflowCard } from "../../..";

export default {
    component: WorkflowCard,
    title: "Molecules/Notification/WorkflowCard",
} as Meta;

const Template: ComponentStory<typeof WorkflowCard> = (args) => {
    return (
        <div className="bg-neo_black-black_1 p-2 w-2/4 flex items-center">
            <WorkflowCard {...args} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    content: "access to Ryan.",
    date: "2021-09-05 10:58:24",
    workflowId: 1,
    fManageWorkflow: () => console.log("hello"),
    sender: "Toto",
    workFlowRequestText: "request",
    workFlowErrorText: "sorry you can't",
};
