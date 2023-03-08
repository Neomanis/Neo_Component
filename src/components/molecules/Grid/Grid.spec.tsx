import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import Grid from "./Grid";
import { fakeTicket } from "@/utils/storiesData/fakeObject";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
    const component = await mount(
        <Grid
            cols={2}
            rows={2}
            ticketList={Array.from({ length: 28 }, () => ({ ...fakeTicket, id: Math.floor(Math.random() * 20) }))}
        />
    );
    await expect(component).toBeVisible();
});

// Hexagon svg is not displayed in webkit
// test("should render empty ticket hexagon if there is no tickets", async ({ mount }) => {
//     const component = await mount(<Grid cols={2} rows={2} />);
//     expect(await component.locator('[data-testid="ticket-empty-body"]').count()).toBe(4);
// });

test("should not show the pagination ", async ({ mount }) => {
    const component = await mount(
        <Grid
            cols={2}
            rows={2}
            ticketList={Array.from({ length: 3 }, () => ({ ...fakeTicket, id: Math.floor(Math.random() * 20) }))}
        />
    );
    await expect(component.locator('[data-testid="grid-page-number"]')).not.toBeVisible();
});

test("should display rows correctly ", async ({ mount }) => {
    const component = await mount(
        <Grid
            cols={2}
            rows={2}
            ticketList={Array.from({ length: 3 }, () => ({ ...fakeTicket, id: Math.floor(Math.random() * 20) }))}
        />
    );
    await expect(component.locator('[data-testid="grid-row"]').nth(0)).not.toHaveClass(/translate-x-\[81px\]/);
    await expect(component.locator('[data-testid="grid-row"]').nth(1)).toHaveClass(/translate-x-\[81px\]/);
});

test("should show display rows correctly in reverse", async ({ mount }) => {
    const component = await mount(
        <Grid
            cols={2}
            rows={2}
            ticketList={Array.from({ length: 3 }, () => ({ ...fakeTicket, id: Math.floor(Math.random() * 20) }))}
            reverseGrid
        />
    );
    await expect(component.locator('[data-testid="grid-row"]').nth(0)).toHaveClass(/translate-x-\[81px\]/);
    await expect(component.locator('[data-testid="grid-row"]').nth(1)).not.toHaveClass(/translate-x-\[81px\]/);
});

test("should add position to unpositioned tickets", async ({ mount }) => {
    let positioned = false;
    const component = await mount(
        <Grid
            cols={2}
            rows={2}
            ticketList={[
                { ...fakeTicket, position: { col: 0, grid: 0, row: 0 } },
                ...Array.from({ length: 3 }, () => ({ ...fakeTicket, id: Math.floor(Math.random() * 20) })),
            ]}
            gridId="inventory"
            fNewPositionedTicket={() => (positioned = true)}
        />
    );
    const newPositionedTicket = component.locator('div[role="button"] >> nth=3');
    await newPositionedTicket.waitFor();
    expect(positioned).toBe(true);
});

test("should change pages when clicking on button", async ({ mount }) => {
    const component = await mount(
        <Grid
            cols={2}
            rows={2}
            ticketList={Array.from({ length: 28 }, () => ({ ...fakeTicket, id: Math.floor(Math.random() * 20) }))}
            showPagination
        />
    );
    const rightButton = component.locator('[data-testid="grid-page-right-button"]');
    const leftButton = component.locator('[data-testid="grid-page-left-button"]');
    const pageNumb = component.locator('[data-testid="grid-page-number"]');
    await rightButton.click();
    await expect(pageNumb).toHaveText("2 / 7");
    await leftButton.click();
    await expect(pageNumb).toHaveText("1 / 7");
    await rightButton.click();
    await expect(pageNumb).toHaveText("2 / 7");
});

test("should trigger all callback", async ({ mount }) => {
    let clicked = false;
    const component = await mount(
        <Grid
            cols={2}
            rows={2}
            ticketList={Array.from({ length: 28 }, () => ({ ...fakeTicket, id: Math.floor(Math.random() * 20) }))}
            showPagination
            fCurrentTicket={() => (clicked = true)}
        />
    );
    await component.locator('[data-testid="grid-ticket"]').first().click();
    expect(clicked).toBe(true);
});
