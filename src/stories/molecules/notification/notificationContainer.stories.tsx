/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { fakeNotification } from "../../fakeObject";
import NotificationContainer from "../../../components/molecules/notification/notificationContainer";
import { NotificationItem } from "../../../components/molecules";
import { IconNotification } from "../../../img/svg";

export default {
    component: NotificationContainer,
    title: "Molecules/Notification/NotificationContainer",
} as Meta;

const Template: ComponentStory<typeof NotificationContainer> = (args) => {
    return (
        <div className="bg-neo-bg-A p-2 flex items-center" style={{ width: 290 }}>
            <NotificationContainer {...args} />
        </div>
    );
};

const notifications = [fakeNotification, fakeNotification, fakeNotification, fakeNotification];

export const Default = Template.bind({});
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
                    userUid="ttest"
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
    title: "DEMANDES DE WORKFLOW",
    viewItem: 3,
};
