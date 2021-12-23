/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { NotificationCard, NotificationContainer } from "../../../components/molecules";
import { getFormatedTimeToNow } from "../../../components/utils";
import { fakeNotification } from "../../fakeObject";

export default {
    component: NotificationContainer,
    title: "Molecules/Notification/NotificationContainer",
} as Meta;

const Template: ComponentStory<typeof NotificationContainer> = (args) => {
    return (
        <div className="bg-neo-bg-A p-2 flex items-center" style={{ width: 400 }}>
            <NotificationContainer {...args} />
        </div>
    );
};

const notifications = [fakeNotification, fakeNotification, fakeNotification];
export const Default = Template.bind({});

Default.args = {
    children: notifications.map((notification, key) => {
        return (
            <div key={key} className="w-full pb-2">
                <NotificationCard
                    content={notification.notification.content}
                    date={getFormatedTimeToNow(notification.notification.createdAt)}
                    fDeleteNotification={(id, uid) => console.log(id, uid)}
                    fReadNotification={(id, uid) => console.log(id, uid)}
                    notificationId={notification.notification.id}
                    read={notification.read}
                    userUid={"ttest"}
                />
            </div>
        );
    }),
    childrenlength: 2,
    clearAllNotifications: true,
    fCallBackClear: () => console.log("ok"),
    languageUser: "en_US",
    title: "Notification",
};
