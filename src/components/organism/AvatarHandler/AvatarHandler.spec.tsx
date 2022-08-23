import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import { User } from "@neomanis/neo-types";
import { imgAvatar } from "@/utils/storiesData/fakeAvatar";
import AvatarHandler from "./AvatarHandler";

test.use({ viewport: { width: 500, height: 500 } });
const defaultUser = {
    uid: "ttest",
    name: { firstName: "Tech", lastName: "Test" },
    role: "technician",
    language: "fr-FR",
    avatar: {
        encodedAvatar: imgAvatar,
        mimetype: "image/png",
        originalname: "blob-l-eponge.png",
    },
} as User;

test("should userInfo be visible and avatarEditor not", async ({ mount }) => {
    const component = await mount(
        <AvatarHandler user={defaultUser} fCallBackUploadAvatar={() => {}} editorWidth={150} />
    );
    await expect(component.locator('[data-testid="global-div-info-user"]')).toBeVisible();
    await expect(component.locator('[data-testid="global-div-avatar-editor"]')).not.toBeVisible();
});

test("should show avatarEditor on user image click", async ({ mount }) => {
    const component = await mount(
        <AvatarHandler user={defaultUser} fCallBackUploadAvatar={() => {}} editorWidth={150} />
    );
    await expect(component.locator('[data-testid="global-div-avatar-editor"]')).not.toBeVisible();
    await component.locator('[data-testid="user-image-zone"]').click();
    await expect(component.locator('[data-testid="global-div-avatar-editor"]')).toBeVisible();
});
