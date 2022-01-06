/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { NotificationItem } from "../../../components/molecules";
import { CautionLogo, IconInfo, IconNotification } from "../../../img/svg";

export default {
    component: NotificationItem,
    title: "Molecules/Notification/NotificationItem",
} as Meta;

const Template: ComponentStory<typeof NotificationItem> = (args) => {
    return (
        <div className=" bg-neo-bg-A p-2 rounded" style={{ width: 300 }}>
            <NotificationItem {...args} />
        </div>
    );
};

export const DefaultNotif = Template.bind({});
DefaultNotif.args = {
    title: "Notif title",
    date: "3 hours ago",
    content:
        "outage content Lorem ipsum dolor sit amet consectetu labore, maxime odio sequi pariatur fugiat suscipit dicta alias corrupti? Accusantium hic laboriosam praesentium est!",
    svg: <IconNotification fill="#fff" className="w-12 h-12" />,
    fDeleteNotification: (notificationId, userUid) => console.log("delete", notificationId, userUid),
    fReadNotification: (notificationId, userUid) => console.log("Read", notificationId, userUid),
    notificationId: 1,
    read: false,
    userUid: "21",
};
export const DefaultWorkflow = Template.bind({});
DefaultWorkflow.args = {
    sender: "Toto",
    date: "3 hours ago",
    content:
        "outage content Lorem ipsum dolor sit amet consectetu labore, maxime odio sequi pariatur fugiat suscipit dicta alias corrupti? Accusantium hic laboriosam praesentium est!",
    svg: <IconInfo fill="#E2DC8F" className="w-12 h-12" />,
    fManageWorkflow: (id, value, errorSetter) => console.log(id, value, errorSetter),
    workflowId: 20,
    textColor: "text-neo-yellow-sand",
};
export const DefaultOutage = Template.bind({});
DefaultOutage.args = {
    title: "Outage title",
    date: "3 hours ago",
    content:
        "outage content Lorem ipsum dolor sit amet consectetu labore, maxime odio sequi pariatur fugiat suscipit dicta alias corrupti? Accusantium hic laboriosam praesentium est!",
    svg: <CautionLogo fill="#ED943B" className="w-12 h-12" />,
    notificationId: 1,
    userUid: "21",
    textColor: "text-neo-urgency",
};
