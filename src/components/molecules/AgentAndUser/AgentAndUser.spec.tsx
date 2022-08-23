import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import AgentAndUser from "./AgentAndUser";

test.use({ viewport: { width: 500, height: 500 } });

test("Should display correct data and have correct class", async ({ mount }) => {
    const component = await mount(<AgentAndUser agentNumber={10} userNumber={12} className="text-neo-yellow-sand" />);
    await expect(component).toContainText("10");
    await expect(component).toContainText("12");
    await expect(component).toHaveClass(/text-neo-yellow-sand/);
});
