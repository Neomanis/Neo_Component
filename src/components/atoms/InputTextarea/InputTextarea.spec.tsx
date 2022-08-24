import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import InputTextareaWrapper from "./InputTextareaWrapper";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
    const component = await mount(<InputTextareaWrapper />);
    await expect(component).toBeVisible();
});
