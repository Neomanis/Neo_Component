import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import OutageItem from "./OutageItem";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
    const component = await mount(
        <OutageItem
            data={{
                entities: [],
                id: 1,
                title: "Outage 1",
                content: "Printer out",
                severity: "major",
                type: "",
                startAt: new Date().toDateString(),
                endAt: new Date("2034/06/05").toDateString(),
                displayAt: new Date().toDateString(),
                hideAt: new Date("2034/06/05").toDateString(),
            }}
        />
    );
    await expect(component).toBeVisible();
});
