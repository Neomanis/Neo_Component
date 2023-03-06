import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import TqFilterButton from "./TQFilterButton";

test.use({ viewport: { width: 500, height: 500 } });

test("should exist ans have right classes", async ({ mount }) => {
    const component = await mount(
        <TqFilterButton name="TqFilterButton" svgIcon={undefined} isSelected={false} onClick={() => {}} />
    );
    await expect(component).toBeVisible();
    await expect(component.locator('[data-testid="tq-filter-icon"]')).toHaveClass(/fill-neo-link/);
    await expect(component.locator('[data-testid="tq-filter-name"]')).toHaveClass(/text-neo-link/);
});

test("onClick should work and apply changes", async ({ mount }) => {
    let clicked = false;
    const component = await mount(
        <TqFilterButton name="TqFilterButton" svgIcon={undefined} isSelected={true} onClick={() => (clicked = true)} />
    );
    await component.click();
    expect(clicked).toBe(true);
});

test("should apply changes", async ({ mount }) => {
    const component = await mount(
        <TqFilterButton name="TqFilterButton" svgIcon={undefined} isSelected={true} onClick={() => {}} />
    );
    await expect(component.locator('[data-testid="tq-filter-icon"]')).toHaveClass(/fill-neo-blue/);
    await expect(component.locator('[data-testid="tq-filter-name"]')).toHaveClass(/text-neo-blue/);
});
