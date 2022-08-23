import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import InputChoice from "./InputChoice";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
    const component = await mount(
        <InputChoice
            data={[
                { label: "data1", value: 1 },
                { label: "data2", value: 2 },
                { label: "data3", value: 3 },
            ]}
        />
    );
    expect(await component.locator("li").count()).toBe(3);
});

test("should change his style if have className props", async ({ mount }) => {
    const component = await mount(
        <InputChoice
            data={[{ label: "data1", value: 1 }]}
            className="rounded"
            cardClassName="bg-neo-light-grey"
            labelClassName="text-neo-yellow-sand"
            titleClassName="text-lg"
            label="Yolo !"
        />
    );

    await expect(component).toHaveClass(/rounded/);
    await expect(component.locator('[data-testid="inputChoice-list"]')).toHaveClass(/bg-neo-light-grey/);
    await expect(component.locator('[data-testid="inputChoice-label"]')).toContainText("Yolo !");
    await expect(component.locator('[data-testid="inputChoice-label"]')).toHaveClass(/text-lg/);
    await expect(component.locator("li").first()).toHaveClass(/text-neo-yellow-sand/);
});

test("should send correctly the callback function", async ({ mount }) => {
    let clickedChoice = undefined;

    const component = await mount(
        <InputChoice
            data={[
                { label: "data1", value: 1 },
                { label: "data2", value: 2 },
                { label: "data3", value: 3 },
            ]}
            fCallBack={(data) => (clickedChoice = data.value)}
        />
    );
    await component.locator("li").first().click();
    expect(clickedChoice).toBe(1);
    await component.locator("li").last().click();
    expect(clickedChoice).toBe(3);
});
