/* eslint-disable no-console */
import React from "react";
import { Meta, Story } from "@storybook/react";

import NotificationItem, { NotificationItemProps } from "./NotificationItem";
import { fakeNotification } from "@/utils/storiesData/fakeObject";

export default {
    component: NotificationItem,
    title: "Molecules/Notification/NotificationItem",
} as Meta;

export const Default: Story<NotificationItemProps> = () => {
    return <NotificationItem notificationType="notification" notification={fakeNotification} />;
};

export const WithTicketUid: Story<NotificationItemProps> = () => {
    return (
        <NotificationItem
            notificationType="notification"
            notification={{
                notification: {
                    id: 0,
                    content: "Where is Ryan ? Looking for [1IT] INC 666.",
                    createdAt: "2021-11-10T15:21:13.856Z",
                    objectId: "1it-666-INC",
                    objectType: "test",
                    type: "test",
                },
                read: false,
                lastUpdatedAt: "",
            }}
            navigateTo={() => console.log("Let's navigate else where")}
        />
    );
};

export const DefaultApproval: Story<NotificationItemProps> = () => {
    return (
        <div className="group hover:bg-neo-yellow">
            <NotificationItem
                notificationType="approval"
                notification={{
                    accepted: false,
                    content: "Please accept this to win 200$",
                    createdAt: "2021-05-20T12:00:00.000Z",
                    id: 1,
                    ticketUid: "1gl-1234-INC",
                    recipient: 1,
                    sender: 2,
                }}
                approvalCallHandler={{
                    answerApproval: (accepted, approvalId) => console.log(accepted, approvalId),
                    isLoading: false,
                    isError: false,
                }}
            />
        </div>
    );
};

export const DefaultOutage: Story<NotificationItemProps> = () => {
    return (
        <NotificationItem
            notificationType="outage"
            notification={{
                content: "J'ai appuyé sur le mauvais bouton, veuillez m'excuser",
                displayAt: "2021-05-20T12:00:00Z",
                id: 1,
                entities: [],
                severity: "high",
                startAt: "2021-06-20T12:00:00Z",
                title: "C'est tout cassé sorry",
                type: "outage",
            }}
        />
    );
};
