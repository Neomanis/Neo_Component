import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import AvatarEditor from "./AvatarEditor";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
    const component = await mount(
        <AvatarEditor editorWidth={250} setShowAvatarEditor={() => {}} fCallBackUploadAvatar={async () => {}} />
    );
    await expect(component).toBeVisible();
});
