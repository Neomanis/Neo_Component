import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import NumberAndSLA from "./NumberAndSLA";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
    const component = await mount(
        <NumberAndSLA
            title={"Tickets Outside SLA"}
            subtitle={"service level agreement"}
            TTO={20}
            TTR={15}
            className="text-neo-yellow-sand"
        />
    );
    await expect(component).toContainText("Tickets Outside SLA");
    await expect(component).toContainText("service level agreement".toUpperCase());
    await expect(component).toContainText("20");
    await expect(component).toContainText("15");
    await expect(component).toHaveClass(/text-neo-yellow-sand/);
});
