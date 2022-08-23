import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import Tab from "./Tab";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
    const component = await mount(<Tab title="Let's go!">Ce soir, chez Boris, c'est ... soirée disco!</Tab>);
    await expect(component).toContainText("Ce soir, chez Boris, c'est ... soirée disco!");
});
