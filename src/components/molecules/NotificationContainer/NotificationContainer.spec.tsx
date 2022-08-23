import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import NotificationContainer from "./NotificationContainer";

test("should work", async ({ mount }) => {
    const component = await mount(
        <NotificationContainer title="Notification">
            <p>Insert notification here</p>
        </NotificationContainer>
    );
    await expect(component).toBeVisible();
});
