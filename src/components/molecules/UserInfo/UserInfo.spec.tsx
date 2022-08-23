import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import { User } from "@neomanis/neo-types";
import { imgAvatar } from "@/utils/storiesData/fakeAvatar";
import UserInfo from "./UserInfo";

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

const defaultEmptyUser = {
    uid: "ttest",
    language: "fr-FR",
} as User;

test("should be visible and display content props value", async ({ mount }) => {
    const component = await mount(<UserInfo user={defaultUser} setShowAvatarEditor={() => {}} />);
    await expect(component).toContainText("Test TechTECHNICIAN");
});

test("should change style when asked", async ({ mount }) => {
    const component = await mount(
        <UserInfo
            user={defaultUser}
            setShowAvatarEditor={() => {}}
            imageSize={36}
            divInfoClassName={"bg-neo-blue"}
            nameClassName={"text-neo-yellow-sand"}
            roleClassName={"text-neo-light-grey"}
        />
    );

    await expect(component).toHaveClass(/bg-neo-blue/);
    await expect(component.locator('[data-testid="name-info-user"]')).toHaveClass(/text-neo-yellow-sand/);
    await expect(component.locator('[data-testid="role-info-user"]')).toHaveClass(/text-neo-light-grey/);
    await expect(component.locator('[data-testid="profileImg-with-data-body"]')).toHaveCSS("height", "144px");
});

test("should show and hide hover bubble when image is hover", async ({ mount }) => {
    const component = await mount(<UserInfo user={defaultUser} setShowAvatarEditor={() => {}} />);
    await component.locator('[data-testid="user-image-zone"]').hover();
    await expect(component.locator('[data-testid="hover-bubble"]')).toBeVisible();
    await component.locator('[data-testid="name-info-user"]').hover();
    await expect(component.locator('[data-testid="hover-bubble"]')).not.toBeVisible();
});

test("should launch function on click", async ({ mount }) => {
    let clicked = false;

    const component = await mount(<UserInfo user={defaultUser} setShowAvatarEditor={() => (clicked = true)} />);
    await component.locator('[data-testid="user-image-zone"]').click();
    expect(clicked).toBe(true);
});

test("should write default value if missing information on the user", async ({ mount }) => {
    const component = await mount(<UserInfo user={defaultEmptyUser} setShowAvatarEditor={() => {}} />);
    await expect(component.locator('[data-testid="profileImg-with-data-body"]')).toHaveAttribute("alt", "default img");
});
