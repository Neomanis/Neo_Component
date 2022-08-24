import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import InputChat from "./InputChat";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
    const component = await mount(<InputChat refForm="Burudōzā ya!" />);
    await expect(component).toBeVisible();
});
