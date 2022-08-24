import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import Checkbox from "./Checkbox";

test.use({ viewport: { width: 500, height: 500 } });

test("should display correct data and have correct properties", async ({ mount }) => {
    const component = await mount(
        <Checkbox
            checked
            classNameInput="bg-neo-light-grey"
            classNameLabel="text-neo-yellow-sand"
            data="El label"
            name="El checkcheck"
            testId="checkBox-body"
        />
    );
    const checkbox = component.locator('[data-testid="checkBox-body"]');
    const checkboxLabel = component.locator('[data-testid="checkBox-label"]');

    await expect(checkbox).toHaveAttribute("id", "El checkcheck");
    await expect(checkbox).toHaveAttribute("name", "El checkcheck");
    await expect(checkbox).toHaveClass(/bg-neo-light-grey/);
    await expect(checkbox).toBeChecked();

    await expect(checkboxLabel).toHaveAttribute("for", "El checkcheck");
    await expect(checkboxLabel).toHaveClass(/text-neo-yellow-sand/);
    await expect(checkboxLabel).toContainText("El label");
});

test("should do the callback logic when clicked", async ({ mount }) => {
    let clicked = false;
    const component = await mount(
        <Checkbox fCallBack={() => (clicked = true)} data="El label" name="El checkcheck" testId="checkBox-body" />
    );
    const checkbox = component.locator('[data-testid="checkBox-body"]');
    await checkbox.click();
    expect(clicked).toBe(true);
});
