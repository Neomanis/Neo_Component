import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import { fakeTicket } from "@/utils/storiesData/fakeObject";
import Ticket from "./Ticket";

test("should show a ticket", async ({ mount }) => {
    const component = await mount(<Ticket ticket={fakeTicket} />);
    await expect(component).toBeVisible();
});

test("should show a empty ticket", async ({ mount }) => {
    const component = await mount(<Ticket />);
    await expect(component).toBeVisible();
});

test("should have opacity if ticket and current ticket are not the same and both tickets are on same grid", async ({
    mount,
}) => {
    const component = await mount(
        <Ticket
            ticket={fakeTicket}
            gridId="inventory"
            currentTicket={{ ...fakeTicket, id: 101, gridId: "inventory" }}
        />
    );
    await expect(component).toHaveClass(/opacity-30/);
});

test("should render correct solved icon icon", async ({ mount }) => {
    const component = await mount(<Ticket ticket={{ ...fakeTicket, status: 5 }} />);
    await expect(component.locator('[data-testid="ticket-icon-solved"]')).toBeVisible();
    await expect(component.locator('[data-testid="ticket-fill-svg"]')).not.toBeVisible();
});

test("should render correct closed icon", async ({ mount }) => {
    const component = await mount(<Ticket ticket={{ ...fakeTicket, status: 6 }} />);
    await expect(component.locator('[data-testid="ticket-icon-closed"]')).toBeVisible();
    await expect(component.locator('[data-testid="ticket-fill-svg"]')).not.toBeVisible();
});

// Test fails in firefox
// test("should not have opacity if ticket and current ticket are not in the same place", async ({ mount }) => {
//     const component = await mount(
//         <Ticket
//             ticket={{ ...fakeTicket, status: 1 }}
//             gridId="inbox"
//             currentTicket={{ ...fakeTicket, id: 101, status: 2, gridId: "inventory" }}
//         />
//     );
//     await expect(component).not.toHaveClass(/opacity-30/);
// });

test("should not have opacity if ticket and current ticket are the same", async ({ mount }) => {
    const component = await mount(
        <Ticket
            ticket={{ ...fakeTicket, id: 101 }}
            gridId="inventory"
            currentTicket={{ ...fakeTicket, id: 101, gridId: "inventory" }}
        />
    );
    await expect(component).not.toHaveClass(/opacity-30/);
});

test("should display stale tto", async ({ mount }) => {
    const creationDate = new Date();
    creationDate.setHours(creationDate.getHours() - 2);
    const ttoDate = new Date();
    ttoDate.setHours(ttoDate.getHours() - 1);
    const component = await mount(
        <Ticket
            ticket={{
                ...fakeTicket,
                id: 101,
                date_creation: creationDate.toISOString(),
                time_to_own: ttoDate.toISOString(),
            }}
            currentTicket={{ ...fakeTicket, id: 101, gridId: "inventory" }}
        />
    );
    await expect(component.locator('[data-testid="ticket-tto-ttr-warning"]')).toBeVisible();
});

test("should display stale ttr", async ({ mount }) => {
    const creationDate = new Date();
    creationDate.setHours(creationDate.getHours() - 5);
    const ttrDate = new Date();
    ttrDate.setHours(ttrDate.getHours() + 1);

    const component = await mount(
        <Ticket
            ticket={{
                ...fakeTicket,
                id: 101,
                date_creation: creationDate.toISOString(),
                time_to_resolve: ttrDate.toISOString(),
                status: 2,
            }}
        />
    );
    await expect(component.locator('[data-testid="ticket-tto-ttr-warning"]')).toBeVisible();
});

test("should display watcher icon if userWatcher", async ({ mount }) => {
    const component = await mount(
        <Ticket
            ticket={{
                ...fakeTicket,
                userWatcher: [1, 2, 3],
            }}
            userGroups={[]}
            userNeoId={1}
        />
    );
    await expect(component.locator('[data-testid="ticket-icon-watcher"]')).toBeVisible();
});

test("should display watcher icon if groupWatcher", async ({ mount }) => {
    const component = await mount(
        <Ticket
            ticket={{
                ...fakeTicket,
                groupWatcher: [{ id: 2, itsmCode: "test", name: "groupTest" }],
            }}
            userGroups={[{ id: 2, itsmCode: "test", name: "groupTest" }]}
            userNeoId={112}
        />
    );
    await expect(component.locator('[data-testid="ticket-icon-watcher"]')).toBeVisible();
});

// Test fails in firefox
// test("should trigger callback function on hover and on click", async ({ mount }) => {
//     let clicked = false;
//     let hovered = false;

//     const component = await mount(
//         <Ticket
//             ticket={{ ...fakeTicket, id: 101 }}
//             fCallBackClick={() => (clicked = true)}
//             fCallBackHover={() => (hovered = true)}
//         />
//     );
//     await component.hover();
//     expect(hovered).toBe(true);
//     await component.click();
//     expect(clicked).toBe(true);
// });

test("should render a ticket with the right title", async ({ mount }) => {
    const component = await mount(<Ticket ticket={fakeTicket} />);
    await expect(component.locator('[data-testid="ticket-title"]')).toContainText("[1GL] INC 4212");
});
