import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import Hexagon from "./Hexagon";

test.use({ viewport: { width: 500, height: 500 } });

test("should display hexagon ticket type", async ({ mount }) => {
    const component = await mount(<Hexagon type="ticket" />);
    await expect(component).toHaveAttribute("data-testid", "hexagonTicket-svg");
});

test("should display hexagon default type", async ({ mount }) => {
    const component = await mount(<Hexagon />);
    await expect(component).toHaveAttribute("data-testid", "hexagonDefault-svg");
});
