import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import TicketStatus from "./TicketStatus";

test.use({ viewport: { width: 500, height: 500 } });

test("In progress component", async ({ mount }) => {
    const component = await mount(<TicketStatus status={2} />);
    await expect(component).toContainText("Your request is being processed.");
    await expect(component).toContainText("IN PROGRESS (ASSIGNED)");
});

test("Pending", async ({ mount }) => {
    const component = await mount(<TicketStatus status={4} />);
    await expect(component).toContainText("Your request is pending, we are collecting more informations.");
    await expect(component).toContainText("PENDING");
});
