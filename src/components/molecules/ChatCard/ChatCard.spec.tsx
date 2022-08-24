import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import ChatCard from "./ChatCard";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
    const component = await mount(<ChatCard data={[{ label: "Wolf", value: 1 }]} fCallBack={() => {}} />);
    await expect(component).toBeVisible();
});
