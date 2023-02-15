import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import TextEditorWrapper from "./TextEditorWrapper";

test.use({ viewport: { width: 500, height: 500 } });
test("should work", async ({ mount }) => {
    const component = await mount(<TextEditorWrapper refForm="content" />);
    await expect(component).toBeVisible();
});
