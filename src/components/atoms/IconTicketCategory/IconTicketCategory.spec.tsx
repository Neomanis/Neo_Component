import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import IconTicketCategory from "./IconTicketCategory";

test.use({ viewport: { width: 500, height: 500 } });

test("should be visible id 1", async ({ mount }) => {
    const component = await mount(<IconTicketCategory id={1} />);
    await expect(component).toHaveAttribute("data-testid", "iconTicketCategorie-1-body");
});

test("should be visible id 2", async ({ mount }) => {
    const component = await mount(<IconTicketCategory id={2} />);
    await expect(component).toHaveAttribute("data-testid", "iconTicketCategorie-2-body");
});

test("should be visible id 3", async ({ mount }) => {
    const component = await mount(<IconTicketCategory id={3} />);
    await expect(component).toHaveAttribute("data-testid", "iconTicketCategorie-3-body");
});

test("should be visible id 4", async ({ mount }) => {
    const component = await mount(<IconTicketCategory id={4} />);
    await expect(component).toHaveAttribute("data-testid", "iconTicketCategorie-4-body");
});

test("should be visible id 5", async ({ mount }) => {
    const component = await mount(<IconTicketCategory id={5} />);
    await expect(component).toHaveAttribute("data-testid", "iconTicketCategorie-5-body");
});

test("should be visible id 6", async ({ mount }) => {
    const component = await mount(<IconTicketCategory id={6} />);
    await expect(component).toHaveAttribute("data-testid", "iconTicketCategorie-6-body");
});

test("should be visible id 7", async ({ mount }) => {
    const component = await mount(<IconTicketCategory id={7} />);
    await expect(component).toHaveAttribute("data-testid", "iconTicketCategorie-7-body");
});

test("should be visible id default", async ({ mount }) => {
    const component = await mount(<IconTicketCategory id={0} />);
    await expect(component).toHaveAttribute("data-testid", "iconTicketCategorie-default-body");
});
