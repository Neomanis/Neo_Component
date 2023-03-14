/* eslint-disable no-console */
import { test, expect } from "@playwright/experimental-ct-react";
import NotificationItem from "./NotificationItem";

test.use({ viewport: { width: 500, height: 500 } });

const notifWithUid = {
    notification: {
        notification: {
            id: 0,
            content: "Where is Ryan ? Looking for [1IT] INC 666.",
            createdAt: "2021-11-10T15:21:13.856Z",
            objectId: "1it-666-INC",
            objectType: "test",
            type: "test",
        },
        read: false,
        lastUpdatedAt: "2021-11-10T15:21:13.856Z",
    },
    navigateTo: () => console.log("Let's navigate else where"),
};

const notifWithoutUid = {
    notification: {
        notification: {
            id: 0,
            content: "Where is Ryan?",
            createdAt: "2021-11-10T15:21:13.856Z",
            objectId: "1it-666-INC",
            objectType: "test",
            type: "test",
        },
        read: false,
        lastUpdatedAt: "2021-11-10T15:21:13.856Z",
    },
};

const outageTest = {
    content: "J'ai appuyé sur le mauvais bouton, veuillez m'excuser",
    displayAt: "2021-05-20T12:00:00Z",
    id: 1,
    entities: [],
    severity: "high",
    startAt: "2021-06-20T12:00:00Z",
    title: "C'est tout cassé sorry",
    type: "outage",
};

test("should display a notif with ticketUid", async ({ mount }) => {
    const component = await mount(
        <NotificationItem
            notificationType="notification"
            notification={notifWithUid.notification}
            navigateTo={notifWithUid.navigateTo}
        />
    );
    const content = component.locator('[data-testid="notifItem-content"]');
    const span = component.locator('[data-testid="notifItem-span"]');
    const approval = component.locator('[data-testid="notifItem-approvalType"]');
    const outage = component.locator('[data-testid="notifItem-outageType"]');
    await expect(content).toContainText("Where is Ryan ? Looking for");
    await expect(span).toContainText("[1IT] INC 666");
    expect(await approval.isVisible()).toBeFalsy();
    expect(await outage.isVisible()).toBeFalsy();
});

test("should display a notif without ticketUid", async ({ mount }) => {
    const component = await mount(
        <NotificationItem notificationType="notification" notification={notifWithoutUid.notification} />
    );
    const content = component.locator('[data-testid="notifItem-content"]');
    const contentNoTicketUid = component.locator('[data-testid="notifItem-content-no-ticketUid"]');
    expect(await content.isVisible()).toBeFalsy();
    expect(await contentNoTicketUid.isVisible()).toBeTruthy();
});

test("should display an outage", async ({ mount }) => {
    const component = await mount(<NotificationItem notificationType="outage" notification={outageTest} />);
    const title = component.locator('[data-testid="notifItem-outageType-title"]');
    await expect(title).toContainText("C'est tout cassé sorry");
});

test("should display an approval", async ({ mount }) => {
    const component = await mount(
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
                answerApproval: () => console.log("coucou"),
                isLoading: false,
                isError: false,
            }}
        />
    );
    await expect(component).toContainText("Please accept this to win 200$");
    await expect(component.locator('[data-testid="notifItem-approvalType-accept"]')).toContainText("Validate");
    await expect(component.locator('[data-testid="notifItem-approvalType-decline"]')).toContainText("refuse");
});
