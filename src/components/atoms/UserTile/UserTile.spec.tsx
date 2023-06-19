import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import UserTile from "./UserTile";
import { fakeGroups, fakeUser } from "@/utils/storiesData/fakeObject";

test.use({ viewport: { width: 500, height: 500 } });

test("should display add user variant", async ({ mount }) => {
    let clicked = false;
    const component = await mount(<UserTile tileWidth={128} type="user" onSelect={() => (clicked = true)} showName />);
    await expect(component.locator("div").first()).toHaveClass(/hover:bg-neo-blue/);
    await expect(component.locator('[data-testid="add-user"]')).toBeVisible();
    await expect(component).toContainText("Add");
    await component.click();
    expect(clicked).toBeTruthy();
});

test("should display user variant", async ({ mount }) => {
    const component = await mount(
        <UserTile tileWidth={128} type="user" user={fakeUser} onSelect={() => {}} showName />
    );
    await expect(component.locator("div > img")).toBeVisible();
    await expect(component).toContainText("Admin Test");
});

test("should display add group variant", async ({ mount }) => {
    let clicked = false;
    const component = await mount(<UserTile tileWidth={128} type="group" onSelect={() => (clicked = true)} showName />);
    await expect(component.locator("div").first()).toHaveClass(/hover:bg-neo-blue/);
    await expect(component.locator('[data-testid="add-group"]')).toBeVisible();
    await expect(component).toContainText("Add");
    await component.click();
    expect(clicked).toBeTruthy();
});

test("should display group variant", async ({ mount }) => {
    const component = await mount(
        <UserTile tileWidth={128} type="group" group={fakeGroups[0]} onSelect={() => {}} showName />
    );
    await expect(component).toContainText("G");
    await expect(component).toContainText("gojira");
});
