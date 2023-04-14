import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import Link from "./Link";

test.use({ viewport: { width: 500, height: 500 } });

test("display correct text and have correct href", async ({ mount }) => {
    const component = await mount(<Link content="Hello world" href="https://google.com" />);
    await expect(component).toContainText("Hello world");
    await expect(component).toHaveAttribute("href", "https://google.com");
});
