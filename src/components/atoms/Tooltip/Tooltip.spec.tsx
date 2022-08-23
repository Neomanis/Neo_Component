import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import Tooltip from "./Tooltip";

test.use({ viewport: { width: 500, height: 500 } });

test("should show data on hover", async ({ mount }) => {
    const component = await mount(
        <Tooltip position="top" text="El data">
            <p>Hey oh</p>
        </Tooltip>
    );
    await expect(component).toContainText("Hey oh");
    await expect(component.locator('[data-testid="tooltip-bubble"]')).toHaveCSS("opacity", "0");
    await component.hover();
    await expect(component.locator('[data-testid="tooltip-bubble"]')).toHaveCSS("opacity", "1");
});

test("should show tooltip bubble at the top", async ({ mount }) => {
    const component = await mount(<Tooltip text="El data" position="top" />);
    await expect(component.locator('[data-testid="tooltip-bubble"]')).toHaveClass(/-translate-y-full/);
    await expect(component.locator('[data-testid="tooltip-bubble"]')).toHaveClass(/top-0/);
});

test("should show tooltip bubble at the bottom", async ({ mount }) => {
    const component = await mount(<Tooltip text="El data" position="bottom" />);
    await expect(component.locator('[data-testid="tooltip-bubble"]')).toHaveClass(/translate-y-full/);
    await expect(component.locator('[data-testid="tooltip-bubble"]')).toHaveClass(/bottom-0/);
    await expect(component.locator('[data-testid="tooltip-bubble"]')).toHaveClass(/flex-col-reverse/);
});
