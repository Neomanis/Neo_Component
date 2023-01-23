import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import AttachmentChat from "./AttachmentChat";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
    const component = await mount(<AttachmentChat title="AttachmentChat" />);
    await expect(component).toContainText("AttachmentChat");
});
