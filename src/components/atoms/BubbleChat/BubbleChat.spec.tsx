import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import BubbleChat from "./BubbleChat";
import { MessageType } from "@neomanis/neo-types";

test.use({ viewport: { width: 500, height: 500 } });

test("should work and display content properly", async ({ mount }) => {
    const component = await mount(
        <BubbleChat
            attachmentId="12"
            content={"THISISSPARTA!!!"}
            downloadCallback={() => {}}
            deleteCallback={() => {}}
            type={MessageType.MESSAGE}
        />
    );
    await expect(component).toContainText("THISISSPARTA");
});

test("should launch callback", async ({ mount }) => {
    let downloadClicked = false;
    let deleteClicked = false;

    const component = await mount(
        <BubbleChat
            attachmentId="12"
            content={"THISISSPARTA!!!"}
            downloadCallback={() => {
                downloadClicked = true;
            }}
            deleteCallback={() => {
                deleteClicked = true;
            }}
            type={MessageType.ATTACHMENT}
        />
    );
    await component.locator('[data-testid="on-click-download"]').click();
    expect(downloadClicked).toBeTruthy();

    await component.locator('[data-testid="attachment-chat-delete-icon"]').click();
    await component.locator('[data-testid="on-click-validate"]').click();
    expect(deleteClicked).toBeTruthy();
});

test("should have right classes", async ({ mount }) => {
    const component = await mount(
        <BubbleChat
            attachmentId="12"
            content={"THISISSPARTA!!!"}
            downloadCallback={() => {}}
            deleteCallback={() => {}}
            type={MessageType.MESSAGE}
            bgColor="bg-neo-bg-B"
            border="border-neo-bg-A"
        />
    );
    await expect(component.first()).toHaveClass(/bg-neo-bg-B/);
    await expect(component.first()).toHaveClass(/border-neo-bg-A/);
});

test("should display delete date properly", async ({ mount }) => {
    const component = await mount(
        <BubbleChat
            attachmentId="12"
            content={"THISISSPARTA!!!"}
            downloadCallback={() => {}}
            deleteCallback={() => {}}
            type={MessageType.ATTACHMENT}
            bgColor="bg-neo-bg-B"
            border="border-neo-bg-A"
            deleteDate="04/14/2023"
        />
    );
    await expect(component.locator('[data-testid="bubbleChat-deleteDate"]')).toContainText("14/04/2023, 00:00");
});

test("should display attachment readonly properly", async ({ mount }) => {
    const component = await mount(
        <BubbleChat
            attachmentId="12"
            content={"THISISSPARTA!!!"}
            downloadCallback={() => {}}
            deleteCallback={() => {}}
            type={MessageType.ATTACHMENT}
            bgColor="bg-neo-bg-B"
            border="border-neo-bg-A"
            deleteDate="04/14/2023"
            readOnly
        />
    );

    await expect(component.locator('[data-testid="attachment-chat-delete-icon"]')).not.toBeVisible();
    await expect(component.locator('[data-testid="on-click-download"]')).toHaveClass(/w-full/);
    await expect(component.locator('[data-testid="bubbleChat-content"]')).toHaveClass("w-[90%]");
});
