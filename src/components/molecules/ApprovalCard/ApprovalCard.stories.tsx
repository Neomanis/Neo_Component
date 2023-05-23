/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import ApprovalCard from "./ApprovalCard";

export default {
    component: ApprovalCard,
    title: "Molecules/Notification/ApprovalCard",
} as Meta;

const Template: ComponentStory<typeof ApprovalCard> = (args) => {
    return <ApprovalCard {...args} />;
};

export const Default: ComponentStory<typeof ApprovalCard> = Template.bind({});
Default.args = {
    content:
        "access to Printer. \n test de saut de ligne blzalfdls fledslf lsezl ferzl flre ferl \n fkdks fkk sfkd skfkd s",
    date: "2021-09-05 10:58:24",
    fManageApproval: async () => console.log("hello"),
    sender: "Toto",
    approvalId: 1,
    ticketId: 15,
    approvalErrorText: "sorry you can't",
    approvalRequestText: "request",
};
