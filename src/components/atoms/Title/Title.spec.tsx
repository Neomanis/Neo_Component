import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import Title from "./Title";

test.use({ viewport: { width: 500, height: 500 } });

test("should be visible with type h1", async ({ mount }) => {
    const component = await mount(<Title type="h1" data="Helloworld" />);
    await expect(component).toHaveAttribute("data-testid", "title-h1-body");
});

test("should be visible with type h2", async ({ mount }) => {
    const component = await mount(<Title type="h2" data="Helloworld" />);
    await expect(component).toHaveAttribute("data-testid", "title-h2-body");
});

test("should be visible with type h3", async ({ mount }) => {
    const component = await mount(<Title type="h3" data="Helloworld" />);
    await expect(component).toHaveAttribute("data-testid", "title-h3-body");
});

test("should be visible with type h4", async ({ mount }) => {
    const component = await mount(<Title type="h4" data="Helloworld" />);
    await expect(component).toHaveAttribute("data-testid", "title-h4-body");
});

test("should be visible with type default", async ({ mount }) => {
    const component = await mount(<Title data="Helloworld" type="default" />);
    await expect(component).toHaveAttribute("data-testid", "title-default-body");
});
