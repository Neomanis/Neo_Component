import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import InputDatesWrapper from "./InputDatesWrapper";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
    const component = await mount(<InputDatesWrapper />);
    await expect(component).toBeVisible();
});
