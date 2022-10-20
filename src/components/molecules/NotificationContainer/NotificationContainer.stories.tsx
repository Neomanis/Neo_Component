/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { fakeNotification } from "@/utils/storiesData/fakeObject";

import NotificationItem from "../NotificationItem";
import NotificationContainer from "./NotificationContainer";
import { Approval, Notification, Outage } from "@neomanis/neo-types";

export default {
    component: NotificationContainer,
    title: "Molecules/Notification/NotificationContainer",
} as Meta;

const Template: ComponentStory<typeof NotificationContainer> = () => {
    const notifications: Notification[] = [fakeNotification, fakeNotification, fakeNotification, fakeNotification];
    const approvals: Approval[] = [
        {
            accepted: false,
            content: "Please accept this to win 200$",
            createdAt: "2021-05-20T12:00:00.000Z",
            id: 1,
            ticketUid: "1gl-1234-INC",
            recipient: 1,
            sender: 2,
        },
    ];

    const outages: Outage[] = [
        {
            content: "J'ai appuyé sur le mauvais bouton, veuillez m'excuser",
            displayAt: "2021-05-20T12:00:00.000Z",
            id: 1,
            entities: [],
            severity: "high",
            startAt: "2021-05-20T12:00:00.000Z",
            title: "C'est tout cassé sorry",
            type: "outage",
        },
        {
            content:
                "J'ai appuyé sur le mauvais bouton, veuillez m'excuser et en plus j'ai pas dormi donc la répa risque d'être longue, en même temps si j'étais mieux payer hein ?",
            displayAt: "2021-05-20T12:00:00.000Z",
            id: 1,
            entities: [],
            severity: "major",
            startAt: "2021-05-20T12:00:00.000Z",
            title: "C'est tout cassé",
            type: "outage",
        },
    ];
    return (
        <div className="bg-neo-bg-A w-[300px] overflow-y-auto no-scrollbar tracking-[0.3px]">
            <NotificationContainer title="Request" itemsToShow={3} notificationType="approval">
                {approvals.map((approval, key) => {
                    return (
                        <div key={key}>
                            <NotificationItem
                                notificationType="approval"
                                notification={approval}
                                approvalCallHandler={{
                                    answerApproval: (accepted, approvalId) => console.log(accepted, approvalId),
                                    isLoading: false,
                                    isError: true,
                                }}
                            />
                        </div>
                    );
                })}
            </NotificationContainer>
            <NotificationContainer
                title="Notifications"
                clearNotifications={() => console.log("clear all")}
                itemsToShow={3}
            >
                {notifications.map((notification, key) => {
                    return (
                        <div key={key}>
                            <NotificationItem notificationType="notification" notification={notification} />
                        </div>
                    );
                })}
            </NotificationContainer>
            <NotificationContainer title="Maintenance" itemsToShow={3} notificationType="outage">
                {outages.map((outage, key) => {
                    return (
                        <div key={key}>
                            <NotificationItem notificationType="outage" notification={outage} />
                        </div>
                    );
                })}
            </NotificationContainer>
        </div>
    );
};

export const Default: ComponentStory<typeof NotificationContainer> = Template.bind({});
