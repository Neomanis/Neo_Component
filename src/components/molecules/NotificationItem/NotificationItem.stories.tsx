/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { IconNotification, IconInfo, CautionLogo } from "@/img/svg";

import NotificationItem from "./NotificationItem";

export default {
    component: NotificationItem,
    title: "Molecules/Notification/NotificationItem",
} as Meta;

const Template: ComponentStory<typeof NotificationItem> = (args) => {
    return <NotificationItem {...args} />;
};

export const Default: ComponentStory<typeof NotificationItem> = Template.bind({});
Default.args = {
    date: "3 hours ago",
    content: "outage content",
    svg: <IconNotification fill="#fff" className="w-12 h-12" />,
    fDeleteNotification: (notificationId, userUid) => console.log("delete", notificationId, userUid),
    fReadNotification: (notificationId, userUid) => console.log("Read", notificationId, userUid),
    notificationId: 1,
    read: false,
    userNeoId: 22,
};
export const DefaultApproval = Template.bind({});
DefaultApproval.args = {
    title: "Demandes",
    sender: "Toto",
    date: "3 hours ago",
    content:
        "outage content Lorem ipsum dolor sit amet consectetu labore, maxime odio sequi pariatur fugiat suscipit dicta alias corrupti? Accusantium hic laboriosam praesentium est!",
    svg: <IconInfo fill="#E2DC8F" className="w-12 h-12" />,
    fManageApproval: (id, value, ticketId, errorSetter) => console.log(id, value, ticketId, errorSetter),
    approvalId: 20,
    ticketId: 2,
    textColor: "text-neo-yellow-sand",
};
export const DefaultOutage = Template.bind({});

DefaultOutage.args = {
    title: "Outage title",
    outageDate: { startAt: "20/03/5555 20:60", endAt: "22/03/4444 60:40" },
    content:
        "outage content Lorem ipsum dolor sit amet consectetu labore, maxime odio sequi pariatur fugiat suscipit dicta alias corrupti? Accusantium hic laboriosam praesentium est!",
    svg: <CautionLogo fill="#ED943B" width={48} />,
    notificationId: 1,
    userUid: "ttest",
    textColor: "text-neo-urgency",
};