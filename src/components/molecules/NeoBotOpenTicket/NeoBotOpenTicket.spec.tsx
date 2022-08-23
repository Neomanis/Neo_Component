import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import NeoBotOpenTicket from "./NeoBotOpenTicket";
// import { QueueIconEmpty } from "@/img/png";

test.use({ viewport: { width: 500, height: 500 } });

test("should have className and message", async ({ mount }) => {
    const component = await mount(<NeoBotOpenTicket message="test" className="bg-opacity-0" />);
    await expect(component).toHaveClass(/bg-opacity-0/);
    await expect(component).toContainText("test");
});

test("should render message and ellipsis props properly", async ({ mount }) => {
    const component = await mount(<NeoBotOpenTicket message="Processing" showEllipsis={true} />);
    await expect(component).toContainText("Processing...");
});

test("should render ellipsis props properly", async ({ mount }) => {
    const component = await mount(<NeoBotOpenTicket message="Processing" showEllipsis={true} />);
    await expect(component.locator('[data-testid="neobot-openTicket-ellipsis"]')).toContainText("...");
    await expect(component.locator('[data-testid="neobot-openTicket-ellipsis"] >> div >> nth=0')).toHaveClass(
        /animate-show/
    );
    await expect(component.locator('[data-testid="neobot-openTicket-ellipsis"] >> div >> nth=1')).toHaveClass(
        /animate-show/
    );
    await expect(component.locator('[data-testid="neobot-openTicket-ellipsis"] >> div >> nth=1')).toHaveCSS(
        "animation-delay",
        "0.3s"
    );
    await expect(component.locator('[data-testid="neobot-openTicket-ellipsis"] >> div >> nth=2')).toHaveClass(
        /animate-show/
    );
    await expect(component.locator('[data-testid="neobot-openTicket-ellipsis"] >> div >> nth=2')).toHaveCSS(
        "animation-delay",
        "0.6s"
    );
});

// Test fails in webkit, Neobot logo not shown
// test("should render neoBot logo and its animation properly", async ({ mount }) => {
//     const component = await mount(<NeoBotOpenTicket message="Processing" showEllipsis={true} />);
//     await expect(component.locator("id=COMPOSITION")).toBeVisible();
//     await expect(component.locator("id=COMPOSITION")).toHaveClass(/animate-swing/);
// });

test("should render ticket image and its animation properly", async ({ mount }) => {
    const component = await mount(<NeoBotOpenTicket message="Processing" showEllipsis={true} />);
    await expect(component.locator("svg").first()).toHaveClass(/animate-fadeJump/);
    await expect(component.locator('[data-testid="neobot-openTicket-logo"] >> div').first()).toHaveClass(/jumpIn/);
});

// test("should render img props properly", async ({ mount }) => {
//     const component = await mount(
//         <NeoBotOpenTicket message="Processing" topRightImg={QueueIconEmpty} showEllipsis={true} />
//     );
//     await expect(component.locator('[data-testid="neobot-openTicket-inbox"] >> img').first()).toBeVisible();
// });

test("should add the right class when message is too long", async ({ mount }) => {
    const component = await mount(<NeoBotOpenTicket message="Processing processing processing" showEllipsis={true} />);
    await expect(component.locator('[data-testid="neobot-openTicket-message"]')).toHaveClass(/flex-col/);
});
