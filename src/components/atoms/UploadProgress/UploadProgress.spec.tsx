import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import UploadProgress from "./UploadProgress";

test.use({ viewport: { width: 500, height: 500 } });

test("should display progress bar at right width", async ({ mount }) => {
    const component = await mount(<UploadProgress uploadProgress={15} />);
    await expect(component.locator('[data-testid="progress-bar"]')).toHaveAttribute("style", "width: 15%;");
});
