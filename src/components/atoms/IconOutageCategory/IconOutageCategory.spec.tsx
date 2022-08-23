import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import IconOutageCategory from "./IconOutageCategory";

test.use({ viewport: { width: 500, height: 500 } });

test("should be visible and display correct component corresponding to id 1", async ({ mount }) => {
    const component = await mount(<IconOutageCategory id={1} />);
    await expect(component).toHaveAttribute("data-testid", "iconOutageCategorie-id-1");
});
test("should be visible and display correct component corresponding to id 2", async ({ mount }) => {
    const component = await mount(<IconOutageCategory id={2} />);
    await expect(component).toHaveAttribute("data-testid", "iconOutageCategorie-id-2");
});
test("should be visible and display correct component corresponding to default", async ({ mount }) => {
    const component = await mount(<IconOutageCategory id={3} />);
    await expect(component).toHaveAttribute("data-testid", "iconOutageCategorie-default");
});
test("should have corresponding className if props className is defined and be default", async ({ mount }) => {
    const component = await mount(<IconOutageCategory id={99} className="bg-neo-bg-A" />);
    await expect(component).toHaveClass(/bg-neo-bg-A/);
});
