/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { IconNotification } from "@/img/svg";
import { fakeNotification } from "@/utils/storiesData/fakeObject";

import NotificationItem from "../NotificationItem";
import NotificationContainer from "./NotificationContainer";

export default {
    component: NotificationContainer,
    title: "Molecules/Notification/NotificationContainer",
} as Meta;

const Template: ComponentStory<typeof NotificationContainer> = (args) => {
    return <NotificationContainer {...args} />;
};

export const Default: ComponentStory<typeof NotificationContainer> = Template.bind({});
const notifications = [fakeNotification, fakeNotification, fakeNotification, fakeNotification];
Default.args = {
    children: notifications.map((notification, key) => {
        return (
            <div className="pb-4" key={key}>
                <NotificationItem
                    content={notification.notification.content}
                    date={notification.notification.createdAt}
                    fDeleteNotification={() => console.log("delete")}
                    fReadNotification={() => console.log("read")}
                    notificationId={notification.notification.id}
                    read={false}
                    userNeoId={22}
                    svg={<IconNotification fill="#fff" className="w-10 h-10" />}
                />
            </div>
        );
    }),
    childrenLength: notifications.length,
    clearAllNotifications: true,
    fCallBackClear: () => console.log("clear"),
    fCallBackSeeAll: () => console.log("SeeAll"),
    languageUser: "fr-FR",
    title: "DEMANDES D'APPROBATION",
    viewItem: 3,
};
