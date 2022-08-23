import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import SwitchToggle from "./SwitchToggle";

test.use({ viewport: { width: 500, height: 500 } });

test("should be visible without value", async ({ mount }) => {
    const component = await mount(<SwitchToggle defaultStatus={false} value="Helloworld" />);
    await expect(component).toContainText("Helloworld");
    await expect(component.locator("input")).not.toBeChecked();
});

test("should be able to check/uncheck and change css colors", async ({ mount }) => {
    const component = await mount(
        <SwitchToggle
            value="Helloworld"
            defaultStatus={false}
            checkBgColor="neo-blue"
            checkPillColor="neo-red"
            uncheckBgColor="neo-green"
            uncheckPillColor="neo-blue"
            labelClassName="text-neo-green"
        />
    );
    const input = component.locator("input");
    await expect(input).toHaveClass(/bg-neo-blue/);
    await expect(component.locator('[data-testid="switchToggle-bg"]')).toHaveClass(/bg-neo-green/);
    await expect(component.locator('[data-testid="switchToggle-label"]')).toHaveClass(/text-neo-green/);
    await expect(input).not.toBeChecked();
    await input.click();
    await expect(input).toBeChecked();
    await expect(input).toHaveClass(/bg-neo-red/);
    await expect(component.locator('[data-testid="switchToggle-bg"]')).toHaveClass(/bg-neo-blue/);
});
