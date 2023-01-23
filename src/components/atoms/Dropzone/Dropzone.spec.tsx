import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import DropzoneTestWrapper from "./DropzoneTestWrapper";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
    const component = await mount(<DropzoneTestWrapper />);
    await expect(component).toBeVisible();
});
