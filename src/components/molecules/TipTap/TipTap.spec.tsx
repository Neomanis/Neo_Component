import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import TipTapTestWrapper from "./TipTapTestWrapper";

test.use({ viewport: { width: 500, height: 500 } });

test("should edit delete default value and write a bold hello world", async ({ mount }) => {
    const component = await mount(<TipTapTestWrapper />);
    const textEditor = component.locator('[id="text-editor"]');
    const boldButton = component.locator('[id="bold-button"]');
    await expect(textEditor).toContainText("Default value");
    await textEditor.selectText();
    await textEditor.press("Backspace");
    await boldButton.click();
    await textEditor.type("Hello world!");
    await expect(textEditor.locator("p > strong")).toHaveText("Hello world!");
});

test("should handle updater properly", async ({ mount }) => {
    const component = await mount(<TipTapTestWrapper isUpdateField />);
    const textEditor = component.locator('[id="text-editor"]');
    await expect(textEditor).toContainText("Default value");
    await textEditor.selectText();
    await textEditor.press("Backspace");
    await textEditor.type("Hello world!");
    await expect(component.getByTestId("dotClose")).toBeVisible();
    await component.getByTestId("dotClose").click();
    await expect(textEditor).toContainText("Default value");
    await textEditor.type("Hello world!");
    await textEditor.blur();
    await expect(component.getByTestId("dotUpdating")).toBeVisible();
    await component.getByTestId("dotSuccess").waitFor();
    await expect(component.getByTestId("dotSuccess")).toBeVisible();
});
