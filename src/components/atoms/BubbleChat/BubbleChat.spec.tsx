import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import BubbleChat from "./BubbleChat";

test.use({ viewport: { width: 500, height: 500 } });

test.describe("BubbleChat", () => {
    test("should work", async ({ mount }) => {
        const component = await mount(<BubbleChat content="BubbleChat" />);
        await expect(component).toContainText("BubbleChat");
    });

    test("should have the correct classes", async ({ mount }) => {
        const component = await mount(
            <BubbleChat content="BubbleChat" bgColor="bg-neo-bg-B" border="border-neo-bg-A" />
        );
        await expect(component).toHaveClass(/bg-neo-bg-B/);
        await expect(component).toHaveClass(/border-neo-bg-A/);
    });
});
