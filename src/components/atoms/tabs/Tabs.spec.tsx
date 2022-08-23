import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import Tab from "../Tab";
import Tabs from "./Tabs";

test.use({ viewport: { width: 500, height: 500 } });

test("should be visible and display correctly", async ({ mount }) => {
    const component = await mount(
        <Tabs>
            <Tab title="Hello">Hello</Tab>
            <Tab title="World">World</Tab>
        </Tabs>
    );
    await expect(component).toBeVisible();
    await expect(component.locator('[data-testid="tabTitle-body-0"]')).toContainText("Hello");
    await expect(component.locator('[data-testid="tabTitle-body-1"]')).toContainText("World");
});

test("should display correct chidren when click on TabTitle", async ({ mount }) => {
    const component = await mount(
        <Tabs>
            <Tab title="Hello">Hello</Tab>
            <Tab title="World">World</Tab>
        </Tabs>
    );
    await expect(component.locator('[data-testid="tabTitle-body-1"]')).toHaveClass(/text-neo-link/);
    await component.locator('[data-testid="tabTitle-body-1"]').click();
    await expect(component.locator('[data-testid="tabTitle-body-1"]')).toHaveClass(/text-neo-blue/);
});
