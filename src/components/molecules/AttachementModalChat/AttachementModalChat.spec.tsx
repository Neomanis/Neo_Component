import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import AttachementModalChat from "./AttachementModalChat";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
    const component = await mount(
        <AttachementModalChat
            title="AttachementModalChat"
            onChangeCallback={() => {}}
            onValidateCallback={() => {}}
            onUndoCallback={() => {}}
        />
    );
    await expect(component).toContainText("AttachementModalChat");
});
