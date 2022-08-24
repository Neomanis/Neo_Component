import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import MessageChat from "./MessageChat";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
    const component = await mount(<MessageChat content="Burudōzā o yatta!" date="21:12" isMe name="Jiro" />);
    await expect(component).toContainText("Burudōzā o yatta!");
});
