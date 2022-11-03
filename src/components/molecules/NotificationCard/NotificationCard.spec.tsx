import { test, expect } from "@playwright/experimental-ct-react";
import NotificationCard from "./NotificationCard";

test.use({ viewport: { width: 500, height: 500 } });

test("should display classic content", async ({ mount }) => {
    let deleted = false;
    let read = false;
    const component = await mount(
        <NotificationCard
            title="Notif title"
            content="Kurōkā ga oru zo!"
            date="2 days ago"
            notificationId={0}
            color="text-neo-light-grey"
            read={false}
            neoId={1}
            fDeleteNotification={() => (deleted = true)}
            fReadNotification={() => (read = true)}
            objectId="OID"
        />
    );
    await expect(component.locator('[data-testid="notifCard-title"]')).toContainText("Notif title");
    await expect(component.locator('[data-testid="notifCard-content-classic"]')).toContainText("Kurōkā ga oru zo!");
    await expect(component.locator('[data-testid="notifCard-date"]')).toContainText("2 days ago");
    await expect(component.locator('[data-testid="notifCard-color-text"]')).toHaveClass(/text-neo-light-grey/);
    await component.click();
    expect(read).toBe(true);
    await component.locator('[data-testid="icon-default-body"]').last().click();
    expect(deleted).toBe(true);
});

test("should display clickable content", async ({ mount }) => {
    let deleted = false;
    let read = false;
    const component = await mount(
        <NotificationCard
            title="Notif title"
            content="Kurōkā ga [1IT] 111 INC oru zo!"
            date="2 days ago"
            notificationId={0}
            color="text-neo-light-grey"
            read={false}
            neoId={1}
            fDeleteNotification={() => (deleted = true)}
            fReadNotification={() => (read = true)}
            objectId="1it-INC-111"
        />
    );
    await expect(component.locator('[data-testid="notifCard-title"]')).toContainText("Notif title");
    await expect(component.locator('[data-testid="notifCard-content-clickable"]')).toContainText("[1IT] 111 INC");
    await expect(component.locator('[data-testid="notifCard-date"]')).toContainText("2 days ago");
    await expect(component.locator('[data-testid="notifCard-color-text"]')).toHaveClass(/text-neo-light-grey/);
    await component.click();
    expect(read).toBe(true);
    await component.locator('[data-testid="icon-default-body"]').last().click();
    expect(deleted).toBe(true);
});
