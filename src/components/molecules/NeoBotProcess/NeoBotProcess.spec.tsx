import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import NeoBotProcess from "./NeoBotProcess";

test.use({ viewport: { width: 500, height: 500 } });

test("should render message props properly", async ({ mount }) => {
    const component = await mount(<NeoBotProcess message="Processing" showEllipsis={false} />);
    await expect(component).toContainText("Processing");
});

test("should render message and ellipsis props properly", async ({ mount }) => {
    const component = await mount(<NeoBotProcess message="Processing" showEllipsis={true} />);
    await expect(component).toContainText("Processing...");
});

test("should render ellipsis props properly", async ({ mount }) => {
    const component = await mount(<NeoBotProcess message="Processing" showEllipsis={true} />);
    await expect(component.locator('[data-testid="process-ellipsis"]')).toContainText("...");
    await expect(component.locator('[data-testid="process-ellipsis"] >> div >> nth=0')).toHaveClass(/animate-show/);
    await expect(component.locator('[data-testid="process-ellipsis"] >> div >> nth=1')).toHaveClass(/animate-show/);
    await expect(component.locator('[data-testid="process-ellipsis"] >> div >> nth=1')).toHaveCSS(
        "animation-delay",
        "0.3s"
    );
    await expect(component.locator('[data-testid="process-ellipsis"] >> div >> nth=2')).toHaveClass(/animate-show/);
    await expect(component.locator('[data-testid="process-ellipsis"] >> div >> nth=2')).toHaveCSS(
        "animation-delay",
        "0.6s"
    );
});

test("should render className props properly", async ({ mount }) => {
    const component = await mount(<NeoBotProcess message="Processing" showEllipsis={true} className="bg-opacity-75" />);
    await expect(component).toHaveClass(/bg-opacity-75/);
});

test("should render cogs and their animation properly", async ({ mount }) => {
    const component = await mount(<NeoBotProcess message="Processing" showEllipsis={true} />);
    await expect(component.locator('[data-testid="process-cogs"] >> div >> nth=0')).toHaveClass(/animate-spinBack/);
    await expect(component.locator('[data-testid="process-cogs"] >> div >> nth=1')).toHaveClass(/animate-spinSlow/);
});

// Neobot svg is not displayed in webkit
// test("should render neoBot logo properly", async ({ mount }) => {
//     const component = await mount(<NeoBotProcess message="Processing" showEllipsis={true} />);
//     await expect(component.locator("id=COMPOSITION")).toBeVisible();
// });
