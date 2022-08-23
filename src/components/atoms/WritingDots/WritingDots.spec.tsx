import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import WritingDots from "./WritingDots";

test.use({ viewport: { width: 500, height: 500 } });

test("should display className props properly", async ({ mount }) => {
    const component = await mount(<WritingDots className="bg-neo-expanded" />);
    await expect(component).toHaveClass(/bg-neo-expanded/);
});

test("should display dotClassName props properly", async ({ mount }) => {
    const component = await mount(<WritingDots className="bg-neo-expanded" dotClassName="animate-pulseDots" />);

    await expect(component.locator("div >> nth=0")).toHaveClass(/animate-pulseDots/);
    await expect(component.locator("div >> nth=1")).toHaveClass(/animate-pulseDots/);
    await expect(component.locator("div >> nth=2")).toHaveClass(/animate-pulseDots/);
});

test("should create correct delay between dots", async ({ mount }) => {
    const component = await mount(<WritingDots delay={250} />);
    await expect(component.locator("div >> nth=1")).toHaveCSS("animation-delay", "0.25s");
    await expect(component.locator("div >> nth=2")).toHaveCSS("animation-delay", "0.5s");
});
