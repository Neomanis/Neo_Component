import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import UserTile from "./UserTile";
import { fakeUser } from "@/utils/storiesData/fakeObject";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
    const component = await mount(
        <UserTile type={"user"} selectedId={0} user={fakeUser} onSelectCallback={() => {}} />
    );
    await expect(component).toContainText("Admin Test");
});
