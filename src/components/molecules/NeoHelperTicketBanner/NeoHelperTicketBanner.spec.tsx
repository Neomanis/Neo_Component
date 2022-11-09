/* eslint-disable no-console */
import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import NeoHelperTicketBanner from "./NeoHelperTicketBanner";
import { fakeTicket } from "@/utils/storiesData/fakeObject";

test("should show ticket component", async ({ mount }) => {
    const component = await mount(
        <NeoHelperTicketBanner
            userLanguage="fr-FR"
            type="ticket"
            ticket={fakeTicket}
            onClick={() => console.log("clicked")}
        />
    );
    await expect(component).toBeVisible();
});

test("should trigger callback function on click", async ({ mount }) => {
    let clicked = false;
    const component = await mount(
        <NeoHelperTicketBanner
            type="ticket"
            userLanguage="fr-FR"
            ticket={{ ...fakeTicket, id: 101 }}
            onClick={() => (clicked = true)}
        />
    );
    await component.click();
    expect(clicked).toBe(true);
});

test("should get right colors", async ({ mount }) => {
    const component = await mount(
        <NeoHelperTicketBanner
            type="ticket"
            userLanguage="fr-FR"
            ticket={{ ...fakeTicket }}
            onClick={() => console.log("clicked")}
        />
    );
    await expect(component.locator('[data-testid="NHticket-blockTitle"]')).toHaveClass(/bg-neo-blue text-neo-bg-B/);
    await expect(component.locator('[data-testid="NHticket-blockDesc"]')).toHaveClass(/text-neo-blue/);
});

test("should display ticket info", async ({ mount }) => {
    const component = await mount(
        <NeoHelperTicketBanner
            type="ticket"
            userLanguage="fr-FR"
            ticket={{ ...fakeTicket }}
            onClick={() => console.log("clicked")}
        />
    );
    await expect(component.locator('[data-testid="NHticket-title"]')).toContainText("test with new groups");
    await expect(component.locator('[data-testid="NHticket-ticketUid"]')).toContainText("[1GL] INC 4212");
    await expect(component.locator('[data-testid="NHticket-ticketCreationDate"]')).toBeVisible();
});

test("should display correct classes with type banner", async ({ mount }) => {
    const component = await mount(
        <NeoHelperTicketBanner userLanguage="fr-FR" type="banner" ticket={{ ...fakeTicket }} />
    );
    await expect(component.locator('[data-testid="NHticket-title"]')).toHaveClass("py-1 line-clamp-2 leading-[18px]");
    await expect(component.locator('[data-testid="NHticket-blockTitle"]')).toHaveClass(
        "font-bold flex items-center px-3 h-[40px] bg-neo-blue text-neo-bg-B"
    );
});
