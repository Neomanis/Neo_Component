/* eslint-disable no-console */
import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import InputAttachments from "./InputAttachments";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
    const component = await mount(<InputAttachments sendFilesArray={(data) => console.log(data)} />);
    await expect(component).toBeVisible();
});
