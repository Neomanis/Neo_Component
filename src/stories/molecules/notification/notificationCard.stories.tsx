/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { NotificationCard } from "../../../components/molecules";

export default {
    component: NotificationCard,
    title: "Molecules/Notification/NotificationCard",
} as Meta;

const Template: ComponentStory<typeof NotificationCard> = (args) => {
    return (
        <div className="bg-neo-bg-A p-2 flex flex-col items-center w-1/5">
            <NotificationCard {...args} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    content: "Ticket BQS-6521 has been updated ",
    date: "2 minutes ago",
    fDeleteNotification: () => console.log("fDeleteNotification"),
    fReadNotification: () => console.log("fReadNotification"),
    notificationId: 1,
    read: false,
    title: "Ticket updated",
    userUid: "21",
};
