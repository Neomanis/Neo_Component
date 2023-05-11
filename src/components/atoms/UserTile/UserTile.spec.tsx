import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import UserTile from "./UserTile";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
    const component = await mount(<UserTile title="UserTile" />);
    await expect(component).toContainText("UserTile");
});
