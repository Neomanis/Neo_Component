import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import Updater from "./Updater";

test.use({ viewport: { width: 500, height: 500 } });

test("should call the callback function when clicking the icon", async ({ mount }) => {
    let clicked = false;
    const component = await mount(
        <Updater isSuccess={true} isCancelable={true} fCallBackCancel={() => (clicked = true)} />
    );
    await expect(component.locator('[data-testid="dotClose"]')).toContainText("CANCEL");
    await component.locator('[data-testid="dotClose"]').click();
    expect(clicked).toBe(true);
});

test("should disable isCancelable props properly", async ({ mount }) => {
    const component = await mount(<Updater isSuccess={false} isCancelable={false} className="test" />);
    await expect(component.locator('[data-testid="dotClose"]')).not.toBeVisible();
});

test("should render className props properly", async ({ mount }) => {
    const component = await mount(<Updater isSuccess={true} isCancelable={true} className="test" />);
    await expect(component).toHaveClass(/test/);
});

test("should render isSuccess props properly", async ({ mount }) => {
    const component = await mount(<Updater isSuccess={true} isCancelable={true} className="test" updateCooldown={1} />);
    await expect(component.locator('[data-testid="dotSuccess"]')).toContainText("SUCCESS");
    await expect(component.locator('[data-testid="dotSuccess"]')).toHaveClass(/text-neo-green/);
});

test("should render isError props properly", async ({ mount }) => {
    const component = await mount(
        <Updater isError={true} isSuccess={false} isCancelable={true} className="test" updateCooldown={1} />
    );
    await expect(component.locator('[data-testid="dotError"]')).toContainText("ERROR");
    await expect(component.locator('[data-testid="dotError"]')).toHaveClass(/text-neo-red/);
});

test("should render updating message properly", async ({ mount }) => {
    const component = await mount(
        <Updater isUpdate={true} trigger={true} isSuccess={false} isCancelable={true} className="test" />
    );
    await expect(component.locator('[data-testid="dotUpdating"]')).toContainText("UPDATING");
    await expect(component.locator('[data-testid="dotUpdating"]')).toHaveClass(/text-neo-blue/);
});
