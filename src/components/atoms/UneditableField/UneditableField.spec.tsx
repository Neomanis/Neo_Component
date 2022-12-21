import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import UneditableField from "./UneditableField";

test.use({ viewport: { width: 500, height: 500 } });

test("should show correct text", async ({ mount }) => {
    const component = await mount(<UneditableField variant="primary" label="UneditableField" children="et hop" />);
    await expect(component).toContainText("UneditableField");
    await expect(component).toContainText("coucou Raph");
});

test("should be empty if no data", async ({ mount }) => {
    const component = await mount(<UneditableField variant="primary" />);
    await expect(component.locator('[data-testid="uneditablefield-data"]')).not.toBeVisible();
    await expect(component.locator('[data-testid="uneditablefield-label"]')).not.toBeVisible();
    await expect(component.locator("hr")).toBeVisible();
});

test("should change CSS if props are passed", async ({ mount }) => {
    const component = await mount(<UneditableField variant="primary" />);
    await expect(component.locator('[data-testid="uneditablefield-body"]')).toBeEmpty();
    await expect(component.locator('[data-testid="uneditablefield-label"]')).not.toBeVisible();
    await expect(component.locator("hr")).toBeVisible();
});

test("should get variants css with secondary bg", async ({ mount }) => {
    const component = await mount(
        <UneditableField
            variant="secondary"
            mainColor={{ text: "text-neo-green", bg: "bg-neo-pink" }}
            children="secondary button"
        />
    );
    await expect(component.locator('[data-testid="uneditablefield-body"]')).toHaveCSS(
        "background-color",
        "rgb(255, 17, 102)"
    );
    await expect(component.locator('[data-testid="uneditablefield-body"]')).toHaveCSS("color", "rgb(255, 255, 255)");
});
