import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import Toaster from "./Toaster";

test.use({ viewport: { width: 500, height: 500 } });

test("should render title props properly", async ({ mount }) => {
    const component = await mount(<Toaster data="Ticket updated !" title="Title" />);
    await expect(component.locator("[data-testid='toastTitle']")).toContainText("Title");
});

test("should render className props properly", async ({ mount }) => {
    const component = await mount(<Toaster data="Ticket updated !" className="classTest" />);
    await expect(component).toHaveClass(/classTest/);
});

// Neobot svg is not displayed in webkit
// test("should show an icon", async ({ mount }) => {
//     const component = await mount(<Toaster data="Ticket updated !" closable={true} />);
//     await expect(component.locator("id=COMPOSITION")).toBeVisible();
// });

test("should show a sad Neobot with shake animation", async ({ mount }) => {
    const component = await mount(<Toaster data="Ticket updated !" emotion="sad" />);
    await expect(component.locator("svg")).toHaveClass(/animate-shakeX/);
});

test("should show a happy Neobot with bounce animation", async ({ mount }) => {
    const component = await mount(<Toaster data="Ticket updated !" emotion="happy" />);
    await expect(component.locator("svg")).toHaveClass(/animate-bounceSlow/);
});

test("should call the callback function when clicking the icon", async ({ mount }) => {
    let clicked = false;
    const component = await mount(
        <Toaster data="Ticket updated !" closable={true} fCallBackCancel={() => (clicked = true)} />
    );
    await component.locator('[data-testid="toasterClose"]').click();
    expect(clicked).toBe(true);
});

// Testing timeout seems to be a bit difficult with playwright
// test("should check timeout", async ({ mount }) => {
//     let refreshed = false;
//     const component = await mount(
//         <Toaster
//             data="Ticket updated !"
//             refreshing={true}
//             fCallBackRefresh={() => (refreshed = true)}
//             refreshDuration={1}
//         />
//     );
//     await new Promise((resolve) => setTimeout(resolve, 2100));
//     expect(refreshed).toBe(true);
// });
