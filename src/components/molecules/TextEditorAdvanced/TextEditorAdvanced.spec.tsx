import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import TextEditorAdvancedTestWrapper from "./TextEditorAdvancedTestWrapper";

test.use({ viewport: { width: 500, height: 500 } });

test("should display default value and change content", async ({ mount }) => {
    const component = await mount(<TextEditorAdvancedTestWrapper />);
    const textEditor = component.locator('[id="text-editor"]');
    const boldButton = component.locator('[id="bold-button"]');
    await expect(textEditor).toContainText("Default value");
    await textEditor.selectText();
    await textEditor.press("Backspace");
    await boldButton.click();
    await textEditor.type("Hello world!");
    await expect(textEditor.locator("p > strong")).toHaveText("Hello world!");
});

test("should display a error message if empty", async ({ mount }) => {
    const component = await mount(<TextEditorAdvancedTestWrapper required />);
    const textEditor = component.locator('[id="text-editor"]');
    await expect(textEditor).toContainText("Default value");
    await textEditor.selectText();
    await textEditor.press("Backspace");
    await expect(component.locator('[data-testid="text-editor-advanced-error"]')).toHaveText("Required field");
});
