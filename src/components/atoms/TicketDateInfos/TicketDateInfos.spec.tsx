import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import TicketDateInfos from "./TicketDateInfos";
import { formatDateToNow } from "../../../utils/dateTools";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
    const component = await mount(
        <TicketDateInfos createdAt={new Date().toISOString()} updatedAt={new Date().toISOString()} userLanguage="" />
    );
    await expect(component).toContainText("Created");
    await expect(component).toContainText("Updated");
    await expect(component).toContainText(formatDateToNow(new Date().toISOString(), ""));
});
