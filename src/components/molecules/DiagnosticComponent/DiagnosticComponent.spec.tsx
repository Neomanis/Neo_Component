import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import DiagnosticComponent from "./DiagnosticComponent";
import { fakeDiag } from "@/utils/storiesData/fakeDiagnostic";

function testNavigate(bookId: string | undefined): void {
    // eslint-disable-next-line no-console
    console.log(bookId);
}
test.use({ viewport: { width: 500, height: 500 } });

test("should work with diagnostic data", async ({ mount }) => {
    const component = await mount(
        <DiagnosticComponent diagnostic={fakeDiag.diagnostics[0]} onNavigate={testNavigate} />
    );
    await expect(component.locator('[data-testid="diagnosticType"]')).toBeVisible();
});
