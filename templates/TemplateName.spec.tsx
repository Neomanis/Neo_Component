import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import TemplateName from "./TemplateName";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
    const component = await mount(<TemplateName title="TemplateName" />);
    await expect(component).toContainText("TemplateName");
});
