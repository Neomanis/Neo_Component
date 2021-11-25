/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { NotificationCard } from "../../..";

export default {
    component: NotificationCard,
    title: "Molecules/Notification/NotificationCard",
} as Meta;

const Template: ComponentStory<typeof NotificationCard> = (args) => {
    return (
        <div className=" bg-neo_bg_A p-2 flex items-center">
            <NotificationCard {...args} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    content: "Where is Ryan ?",
    date: "2021-09-05 10:58:24",
    fDeleteNotification: () => console.log("hello"),
    fInitialRender: () => console.log("hello"),
    fReadNotification: () => console.log("hello"),
    notificationId: 1,
    read: false,
    userUid: "21",
};
