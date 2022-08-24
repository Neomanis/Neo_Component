import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import Input from "./Input";

test.use({ viewport: { width: 500, height: 500 } });

test("should be visible", async ({ mount }) => {
    const component = await mount(<Input refForm="input" required={false} typeInput="text" />);
    await expect(component).toBeVisible();
});

test("should show correct label", async ({ mount }) => {
    const component = await mount(<Input refForm="input" required={false} typeInput="text" label="I'm a input" />);
    await expect(component).toHaveText("I'm a input");
});

test("should trigger onBlurCallBack and onChangeCallBack", async ({ mount }) => {
    let blurred = false;
    let text = "";

    const input = (
        await mount(
            <Input
                refForm="input"
                required={false}
                typeInput="text"
                onBlurCallBack={() => (blurred = true)}
                onChangeCallBack={(data) => (text = data)}
            />
        )
    ).locator("input");

    await input.type("Hello");
    expect(text).toBe("Hello");
    await input.evaluate((e) => e.blur());
    expect(blurred).toBe(true);
});
