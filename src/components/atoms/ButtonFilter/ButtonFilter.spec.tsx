import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import ButtonFilter from "./ButtonFilter";

test.use({ viewport: { width: 500, height: 500 } });

test("should display activated button filter", async ({ mount }) => {
    let clicked = false;
    const component = await mount(
        <ButtonFilter id="base-filter" title="Base filter" isActive onClick={() => (clicked = true)} />
    );
    await expect(component).toContainText("Base filter");
    await expect(component).toHaveAttribute("id", "base-filter");
    await expect(component).toHaveAttribute("data-is-active", "true");
    await expect(component).toHaveClass(/bg-neo-bg-B/);
    await component.click();
    expect(clicked).toBeTruthy();
});

test("should display deactivated button filter", async ({ mount }) => {
    let clicked = true;
    const component = await mount(
        <ButtonFilter id="base-filter" title="Base filter" isActive={false} onClick={() => (clicked = false)} />
    );
    await expect(component).toHaveAttribute("data-is-active", "false");
    await expect(component).toHaveClass(/bg-neo-blue-extraDark/);
    await component.click();
    expect(clicked).toBeFalsy();
});
