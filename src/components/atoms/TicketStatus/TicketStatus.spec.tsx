import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import TicketStatus from "./TicketStatus";

test.use({ viewport: { width: 500, height: 500 } });

test("In progress component", async ({ mount }) => {
    const component = await mount(<TicketStatus status={2} />);
    await expect(component).toContainText("A technician is currently working on your request");
    await expect(component).toContainText("ASSIGNED");
});

test("Pending", async ({ mount }) => {
    const component = await mount(<TicketStatus status={4} />);
    await expect(component).toContainText("Extra information are needed to resume your request");
    await expect(component).toContainText("PENDING");
});
