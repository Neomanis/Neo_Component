import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import ScrollSlider from "./ScrollSlider";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
    const component = await mount(<ScrollSlider onChange={(value) => console.log(value)} />);
    await expect(component).toContainText("ScrollSlider");
});
