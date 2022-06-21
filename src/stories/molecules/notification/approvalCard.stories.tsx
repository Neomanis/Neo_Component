/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { ApprovalCard } from "../../../components/molecules";

export default {
    component: ApprovalCard,
    title: "Molecules/Notification/ApprovalCard",
} as Meta;

const Template: ComponentStory<typeof ApprovalCard> = (args) => {
    return (
        <div className=" bg-neo-bg-A p-2 w-2/4 flex items-center">
            <ApprovalCard {...args} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    content: "access to Printer.",
    date: "2021-09-05 10:58:24",
    fManageApproval: () => console.log("hello"),
    sender: "Toto",
    approvalId: 1,
    ticketId: 15,
    approvalErrorText: "sorry you can't",
    approvalRequestText: "request",
};
