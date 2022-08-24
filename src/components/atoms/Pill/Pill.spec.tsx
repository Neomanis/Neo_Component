import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import Pill from "./Pill";

test.use({ viewport: { width: 500, height: 500 } });

test("should display correct text and have correct className", async ({ mount }) => {
    const component = await mount(<Pill data="Helloworld" className="bg-neo-light-grey" />);
    await expect(component).toContainText("Helloworld");
    await expect(component).toHaveClass(/bg-neo-light-grey/);
});
