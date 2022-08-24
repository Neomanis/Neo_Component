import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import TabTitle from "./TabTitle";

test.use({ viewport: { width: 500, height: 500 } });

test("should be visible and display correctly", async ({ mount }) => {
    const component = await mount(<TabTitle handleSelectedTab={() => {}} index={0} selectedTab={1} title="Hello" />);
    await expect(component).toBeVisible();
});

test("should be have interactive button", async ({ mount }) => {
    let selectedTab = undefined;
    const component = await mount(
        <TabTitle handleSelectedTab={() => (selectedTab = 1)} index={0} selectedTab={1} title="Hello" />
    );
    await expect(component).toContainText("Hello");
    await component.locator("button").click();
    expect(selectedTab).toBe(1);
});

test("should display correct css if selectedtab and index props values are different", async ({ mount }) => {
    const component = await mount(<TabTitle handleSelectedTab={() => {}} index={0} selectedTab={1} title="Hello" />);
    await expect(component).toHaveClass(/hover:text-white/);
    await expect(component).toHaveClass(/border-opacity-0/);
    await expect(component).toHaveClass(/text-neo-link/);
});

test("should display correct css if selectedtab and index props values are equal", async ({ mount }) => {
    const component = await mount(<TabTitle handleSelectedTab={() => {}} index={1} selectedTab={1} title="Hello" />);
    await expect(component).toHaveClass(/text-neo-blue/);
    await expect(component).toHaveClass(/border-neo-blue/);
});
