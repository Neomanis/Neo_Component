import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import HexaPill from "./HexaPill";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
    const component = await mount(<HexaPill ticketUid="1gl-5462-INC" color="#F0F" ticketType={1} />);
    await expect(component).toContainText("[1GL]INC5462");
    await expect(component.locator("svg")).toHaveAttribute("stroke", "#F0F");
});
