import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import ButtonV2 from "./ButtonV2";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
    const component = await mount(<ButtonV2>Button</ButtonV2>);
    await expect(component).toContainText("Button");
});
