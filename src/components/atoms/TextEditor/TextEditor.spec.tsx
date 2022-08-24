import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import TextEditor from "./TextEditor";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
    const component = await mount(<TextEditor refForm="input" required={false} className="w-full" />);
    await expect(component).toBeVisible();
});
