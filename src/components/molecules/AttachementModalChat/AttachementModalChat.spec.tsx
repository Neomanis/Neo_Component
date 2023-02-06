import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import AttachementModalChat from "./AttachementModalChat";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
    const file = new File(["image"], "../../utils/storiesData/neo-nico.png", { type: "image/png" });
    const component = await mount(
        <AttachementModalChat
            title="neo-nico"
            file={file}
            isEmpty={false}
            onChangeCallback={() => {}}
            onValidateCallback={() => {}}
            onUndoCallback={() => {}}
        />
    );
    await expect(component).toContainText("neo-nico");
});
