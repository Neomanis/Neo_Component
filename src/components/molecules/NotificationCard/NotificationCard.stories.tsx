/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import NotificationCard from "./NotificationCard";

export default {
    component: NotificationCard,
    title: "Molecules/Notification/NotificationCard",
} as Meta;

const Template: ComponentStory<typeof NotificationCard> = (args) => {
    return <NotificationCard {...args} />;
};

export const Default: ComponentStory<typeof NotificationCard> = Template.bind({});
Default.args = {
    content: "Ticket [1IT] INC 123 has been updated ",
    date: "2 minutes ago",
    fDeleteNotification: () => console.log("fDeleteNotification"),
    fReadNotification: () => console.log("fReadNotification"),
    notificationId: 1,
    read: false,
    title: "Ticket updated",
    neoId: 2,
    objectId: "Some othe object id",
    navigateTo: () => console.log("Shore ahead!"),
};

export const LinkClickable: ComponentStory<typeof NotificationCard> = Template.bind({});
LinkClickable.args = {
    content: "Ticket [1IT] INC 123 has been updated ",
    date: "2 minutes ago",
    fDeleteNotification: () => console.log("fDeleteNotification"),
    fReadNotification: () => console.log("fReadNotification"),
    notificationId: 1,
    read: false,
    title: "Ticket updated",
    neoId: 2,
    objectId: "1it-123-INC",
    navigateTo: () => console.log("Shore ahead!"),
};
