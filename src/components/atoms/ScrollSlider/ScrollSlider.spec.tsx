import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import ScrollSlider from "./ScrollSlider";

test.use({ viewport: { width: 500, height: 500 } });

test("should change value with the arrows", async ({ mount }) => {
    let scrollValue = 0;
    const component = await mount(<ScrollSlider onChange={(value) => (scrollValue = value)} />);
    await component.locator('[data-testid="slider-plus"]').click();
    expect(scrollValue).toEqual(1);
    await component.locator('[data-testid="slider-minus"]').click();
    expect(scrollValue).toEqual(0);
});

test("should change value with the arrows with bigger gaps", async ({ mount }) => {
    let scrollValue = 0;
    const component = await mount(<ScrollSlider onChange={(value) => (scrollValue = value)} arrowsValue={20} />);
    await component.locator('[data-testid="slider-plus"]').click();
    expect(scrollValue).toEqual(20);
    await component.locator('[data-testid="slider-minus"]').click();
    expect(scrollValue).toEqual(0);
});

test("should change value with the slider", async ({ mount }) => {
    let scrollValue = 0;
    const component = await mount(<ScrollSlider onChange={(value) => (scrollValue = value)} />);
    await component.locator("div:nth-child(2)").first().click();
    expect(scrollValue).toEqual(50);
});

test("should display disabled component properly", async ({ mount }) => {
    const component = await mount(<ScrollSlider onChange={(value) => value} disabled />);
    await expect(component).toHaveClass(/cursor-not-allowed opacity-20/);
    await expect(component.locator("div:nth-child(2)").first()).toHaveClass(/disabled/);
    await expect(component.locator("div:nth-child(2) > div:nth-child(3)")).toHaveClass(/hidden/);
});
