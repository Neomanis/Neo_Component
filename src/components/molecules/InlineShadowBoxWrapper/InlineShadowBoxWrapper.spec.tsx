import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import TestWrapper from "./TestWrapper";

test.use({ viewport: { width: 500, height: 500 } });

// Shadow boxes values are not the same between chromium and firefox/webkit
// test("should have to correct classNames and linear gradient", async ({ mount }) => {
//     const component = await mount(<TestWrapper width="w-60" />);
//     await expect(component.locator('[data-testid="inlineShadowBoxWrapperContainer"]')).toHaveClass(
//         /flex overflow-x-scroll no-scrollbar w-60/
//     );
//     await component
//         .locator('[data-testid="inlineShadowBoxWrapperContainer"]')
//         .evaluate((el) => el.scrollTo({ left: el.clientWidth / 2 }));
//     await expect(component.locator('[data-testid="inlineShadowBoxWrapperRightShadowBox"]')).toHaveClass(
//         /w-10 h-10 absolute right-0 z-20/
//     );
//     await expect(component.locator('[data-testid="inlineShadowBoxWrapperRightShadowBox"]')).toHaveAttribute(
//         "style",
//         "background: linear-gradient(270deg, rgb(21, 37, 53) 0%, rgb(21, 48, 76) 35%, rgba(255, 0, 0, 0) 100%);"
//     );
//     await expect(component.locator('[data-testid="inlineShadowBoxWrapperLeftShadowBox"]')).toHaveClass(
//         /w-10 h-10 absolute left-0 z-20/
//     );
//     await expect(component.locator('[data-testid="inlineShadowBoxWrapperLeftShadowBox"]')).toHaveAttribute(
//         "style",
//         "background: linear-gradient(90deg, rgb(21, 37, 53) 0%, rgb(21, 48, 76) 35%, rgba(255, 0, 0, 0) 100%);"
//     );
// });

test("should display the correct shadowbox", async ({ mount }) => {
    const component = await mount(<TestWrapper width="w-60" />);

    await expect(component.locator('[data-testid="inlineShadowBoxWrapperRightShadowBox"]')).toBeVisible();
    await expect(component.locator('[data-testid="inlineShadowBoxWrapperLeftShadowBox"]')).not.toBeVisible();

    await component
        .locator('[data-testid="inlineShadowBoxWrapperContainer"]')
        .evaluate((el) => el.scrollTo({ left: el.clientWidth / 2 }));
    await expect(component.locator('[data-testid="inlineShadowBoxWrapperRightShadowBox"]')).toBeVisible();
    await expect(component.locator('[data-testid="inlineShadowBoxWrapperLeftShadowBox"]')).toBeVisible();

    await component
        .locator('[data-testid="inlineShadowBoxWrapperContainer"]')
        .evaluate((el) => el.scrollTo({ left: el.clientWidth }));
    await expect(component.locator('[data-testid="inlineShadowBoxWrapperRightShadowBox"]')).not.toBeVisible();
    await expect(component.locator('[data-testid="inlineShadowBoxWrapperLeftShadowBox"]')).toBeVisible();

    await component
        .locator('[data-testid="inlineShadowBoxWrapperContainer"]')
        .evaluate((el) => el.scrollTo({ left: 0 }));
    await expect(component.locator('[data-testid="inlineShadowBoxWrapperRightShadowBox"]')).toBeVisible();
    await expect(component.locator('[data-testid="inlineShadowBoxWrapperLeftShadowBox"]')).not.toBeVisible();
});

test("should not display shadowboxes if content is not overflowing", async ({ mount }) => {
    const component = await mount(<TestWrapper width="w-full" />);
    await expect(component.locator('[data-testid="inlineShadowBoxWrapperRightShadowBox"]')).not.toBeVisible();
    await expect(component.locator('[data-testid="inlineShadowBoxWrapperLeftShadowBox"]')).not.toBeVisible();
});
