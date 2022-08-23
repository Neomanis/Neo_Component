import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import Loader from "./Loader";

test.use({ viewport: { width: 500, height: 500 } });

test("should display default loader with text", async ({ mount }) => {
    const component = await mount(<Loader data="Example" />);
    await expect(component).toContainText("Example");
    await expect(component).toHaveAttribute("data-testid", "loader-default-body");
});

test("should display cicle loader", async ({ mount }) => {
    const component = await mount(<Loader type="circleOnly" />);
    await expect(component).toHaveAttribute("data-testid", "loader-circle-body");
});
