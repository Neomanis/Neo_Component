import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import Linkify from "./Linkify";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
    const component = await mount(
        <div>
            <Linkify children="Dayum, this video is hot right now: https://www.youtube.com/watch?v=DcJFdCmN98s" />
        </div>
    );
    await expect(component).toContainText("Dayum");
    await expect(component.locator("a")).toBeVisible();
    await expect(component.locator("a")).toHaveAttribute("href", "https://www.youtube.com/watch?v=DcJFdCmN98s");
});
