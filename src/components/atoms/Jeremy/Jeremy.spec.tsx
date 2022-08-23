import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import Jeremy from "./Jeremy";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
    const component = await mount(<Jeremy title="Jeremy" />);
    await expect(component).toContainText("Jeremy");
});
