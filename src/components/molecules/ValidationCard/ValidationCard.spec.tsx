import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import ValidationCard from "./ValidationCard";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
    const component = await mount(<ValidationCard fCallBackCancel={() => {}} fCallBackValidate={() => {}} />);
    await expect(component).toBeVisible();
});

test("should launch callback", async ({ mount }) => {
    let validateClick = false;
    let cancelClick = false;

    const component = await mount(
        <ValidationCard
            fCallBackCancel={() => {
                cancelClick = true;
            }}
            fCallBackValidate={() => {
                validateClick = true;
            }}
        />
    );

    await component.locator('[data-testid="on-click-validate"]').click();
    expect(validateClick).toBe(true);
    await component.locator('[data-testid="on-click-cancel"]').click();
    expect(cancelClick).toBe(true);
});
