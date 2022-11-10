import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import Output from "./Output";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
    const component = await mount(<Output title="Output" description="description" />);
    await expect(component).toContainText("Output");
    await expect(component.locator('[data-testid="output-title"]')).toContainText("Output");
    await expect(component.locator('[data-testid="output-desc"]')).toContainText("description");
});
