import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import Button from "./Button";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
    const component = await mount(<Button data="Hello !" />);
    await expect(component).toContainText("Hello !");
});
