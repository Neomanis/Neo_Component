import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import InputSelectWrapper from "./InputSelectWrapper";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
    const component = await mount(<InputSelectWrapper />);
    await expect(component).toBeVisible();
});
