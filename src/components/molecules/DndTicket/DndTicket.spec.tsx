import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import DndTicket from "./DndTicket";
import { fakeTicket } from "@/utils/storiesData/fakeObject";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
    const component = await mount(
        <DndTicket dndId="dndId" ticketProps={{ currentTicket: { ...fakeTicket, gridId: "inbox" } }} />
    );
    await expect(component).toBeVisible();
});
