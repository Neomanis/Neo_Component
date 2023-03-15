import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import MessageChat from "./MessageChat";
import { MessageType } from "@neomanis/neo-types";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
    const component = await mount(
        <MessageChat
            content="Burudōzā o yatta!"
            date="21:12"
            isMe
            name="Jiro"
            downloadAttachmentCallback={() => {}}
            deleteAttachmentCallback={() => {}}
            type={MessageType.MESSAGE}
            attachmentReadOnly={false}
        />
    );
    await expect(component).toContainText("Burudōzā o yatta!");
    await expect(component).toContainText("21:12");
    await expect(component).toContainText("Jiro");
    await expect(component.locator('[data-testid="bubbleChat-body"]')).toHaveClass(/bg-neo-bg-B/);
});

test("should have right properties if isNotMe", async ({ mount }) => {
    const component = await mount(
        <MessageChat
            content="Burudōzā o yatta!"
            date="21:12"
            isMe={false}
            name="Jiro"
            type={MessageType.ATTACHMENT}
            downloadAttachmentCallback={() => {}}
            deleteAttachmentCallback={() => {}}
            attachmentReadOnly={false}
        />
    );

    await expect(component.locator('[data-testid="message-hover-information"]')).not.toHaveClass(/flex-flow-reverse/);
    await expect(component.locator('[data-testid="message-icon-container"]')).not.toHaveClass(/flex-flow-reverse/);
    await expect(component.locator('[data-testid="attachment-content"]')).toHaveClass(/border-neo-bg-B/);
});

test("should get classNames", async ({ mount }) => {
    const component = await mount(
        <MessageChat
            content="Burudōzā o yatta!"
            date="21:12"
            isMe
            name="Jiro"
            type={MessageType.ATTACHMENT}
            downloadAttachmentCallback={() => {}}
            deleteAttachmentCallback={() => {}}
            classNames={{ icon: "w-[50%]", message: "w-[50%] px-4" }}
            attachmentReadOnly={false}
        />
    );

    await expect(component.locator('[data-testid="message-content"]')).toHaveClass("w-[50%] px-4 relative");
    await expect(component.locator('[data-testid="message-icon"]')).toHaveClass("w-[50%]");
    await expect(component.locator('[data-testid="message-hover-information"]')).toHaveClass(/text-xxs/);
});

test("should show error", async ({ mount }) => {
    const component = await mount(
        <MessageChat
            content="Burudōzā o yatta!"
            date="21:12"
            isMe
            name="Jiro"
            type={MessageType.ATTACHMENT}
            downloadAttachmentCallback={() => {}}
            deleteAttachmentCallback={() => {}}
            isFailed={true}
            attachmentReadOnly={false}
        />
    );

    await expect(component.locator('[data-testid="error-message-icon"]')).toBeVisible();
});

test("should show private", async ({ mount }) => {
    const component = await mount(
        <MessageChat
            content="Burudōzā o yatta!"
            date="21:12"
            isMe
            name="Jiro"
            type={MessageType.ATTACHMENT}
            downloadAttachmentCallback={() => {}}
            deleteAttachmentCallback={() => {}}
            attachmentReadOnly={false}
            privateMessage={true}
        />
    );

    await expect(component.locator('[data-testid="private-message-icon"]')).toBeVisible();
});

test("should show loading", async ({ mount }) => {
    const component = await mount(
        <MessageChat
            content="Burudōzā o yatta!"
            date="21:12"
            isMe
            name="Jiro"
            isLoading={true}
            isValidate={false}
            type={MessageType.ATTACHMENT}
            downloadAttachmentCallback={() => {}}
            attachmentReadOnly={false}
            deleteAttachmentCallback={() => {}}
        />
    );

    await expect(component.locator('[data-testid="message-is-loading"]')).toBeVisible();
});

test("should launch callback", async ({ mount }) => {
    let downloadClicked = false;
    let deleteClicked = false;

    const component = await mount(
        <MessageChat
            content="Burudōzā o yatta!"
            date="21:12"
            isMe
            name="Jiro"
            type={MessageType.ATTACHMENT}
            downloadAttachmentCallback={() => (downloadClicked = true)}
            deleteAttachmentCallback={() => (deleteClicked = true)}
            attachmentReadOnly={false}
        />
    );

    await component.locator('[data-testid="on-click-download"]').click();
    expect(downloadClicked).toBe(true);

    await component.locator('[data-testid="attachment-chat-delete-icon"]').click();
    await expect(component.locator('[data-testid="validation-card-container"]')).toBeVisible();
    await component.locator('[data-testid="on-click-validate"]').click();
    expect(deleteClicked).toBe(true);
});

test("should have correct default sizing", async ({ mount }) => {
    const component = await mount(
        <div className="w-72">
            <MessageChat
                content="Burudōzāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāā"
                date="21:12"
                isMe
                name="Jiro"
                type={MessageType.ATTACHMENT}
                downloadAttachmentCallback={() => {}}
                deleteAttachmentCallback={() => {}}
                attachmentReadOnly={false}
            />
        </div>
    );

    const messageSize = await component.locator('[data-testid="message-content"]').boundingBox();
    expect(messageSize.width).toEqual(240);
});

test("should have correct custom sizing", async ({ mount }) => {
    const component = await mount(
        <div className="w-24">
            <MessageChat
                content="Burudōzāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāā"
                date="21:12"
                isMe
                name="Jiro"
                type={MessageType.ATTACHMENT}
                downloadAttachmentCallback={() => {}}
                deleteAttachmentCallback={() => {}}
                attachmentReadOnly={false}
                classNames={{ icon: "w-[50%]", message: "w-[50%]" }}
            />
        </div>
    );

    const messageSize1 = await component.locator('[data-testid="message-content"]').boundingBox();
    expect(messageSize1.width).toEqual(48);
});
