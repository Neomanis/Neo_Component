import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import DiagnosticTab from "./DiagnosticTab";
import { DiagnosticResult } from "@neomanis/neo-types";

test.use({ viewport: { width: 500, height: 500 } });

test("should work and get solved color", async ({ mount }) => {
    const component = await mount(
        <DiagnosticTab name="DiagnosticTab" diagResult={DiagnosticResult.Solved} isSelected={false} />
    );
    await expect(component).toContainText("DiagnosticTab");
    await expect(component.locator('[data-testid="diagnostic-tab-pill"]')).toHaveClass(/bg-neo-green/);
});
test("should get failed color", async ({ mount }) => {
    const component = await mount(
        <DiagnosticTab name="DiagnosticTab" diagResult={DiagnosticResult.Failed} isSelected={false} />
    );
    await expect(component.locator('[data-testid="diagnostic-tab-pill"]')).toHaveClass(/bg-neo-red/);
});
test("should get escalate color", async ({ mount }) => {
    const component = await mount(
        <DiagnosticTab name="DiagnosticTab" diagResult={DiagnosticResult.Escalate} isSelected={false} />
    );
    await expect(component.locator('[data-testid="diagnostic-tab-pill"]')).toHaveClass(/bg-neo-orange/);
});
test("should get awaiting color", async ({ mount }) => {
    const component = await mount(
        <DiagnosticTab name="DiagnosticTab" diagResult={DiagnosticResult.Awaiting} isSelected={false} />
    );
    await expect(component.locator('[data-testid="diagnostic-tab-pill"]')).toHaveClass(/bg-neo-purple-light/);
});
test("should get bg color if isSelected", async ({ mount }) => {
    const component = await mount(
        <DiagnosticTab name="DiagnosticTab" diagResult={DiagnosticResult.Solved} isSelected={true} />
    );
    await expect(component).toHaveClass(/bg-neo-blue/);
});
