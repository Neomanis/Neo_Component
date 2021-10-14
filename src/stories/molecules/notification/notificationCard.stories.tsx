/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { NotificationCard } from "../../..";

export default {
    title: "Molecules/Notification/NotificationCard",
    component: NotificationCard,
} as Meta;

const Template: ComponentStory<typeof NotificationCard> = (args) => {
    return (
        <div className="bg-neo_black-black_1 p-2 w-1/4 flex items-center">
            <NotificationCard {...args} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    read: false,
    content: "Where is Ryan ?",
    date: "2021-09-05 10:58:24",
    notificationId: 1,
    userUid: "21",
    fInitialRender: () => console.log("hello"),
    fReadNotification: () => console.log("hello"),
    fDeleteNotification: () => console.log("hello"),
};
