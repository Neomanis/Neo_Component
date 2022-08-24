import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import ValidationCard from "./ValidationCard";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
    const component = await mount(<ValidationCard fCallBackCancel={() => {}} fCallBackValidate={() => {}} />);
    await expect(component).toBeVisible();
});
