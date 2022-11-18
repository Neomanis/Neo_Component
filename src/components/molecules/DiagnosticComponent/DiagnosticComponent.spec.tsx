import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import DiagnosticComponent from "./DiagnosticComponent";
import { fakeDiag, fakeDiagChild } from "@/utils/storiesData/fakeDiagnostic";

function testNavigate(url: string, state: { state: string }): void {
    // eslint-disable-next-line no-console
    console.log(url, state);
}
test.use({ viewport: { width: 500, height: 500 } });

test("should work with diagnostic data", async ({ mount }) => {
    const component = await mount(
        <DiagnosticComponent diagnostic={fakeDiag.diagnostics[0]} redirectUrl="/url" navigate={testNavigate} />
    );
    await expect(component.locator('[data-testid="diagnosticType"]')).toBeVisible();
});
// test("should work with diagChild data", async ({ mount }) => {
//     const component = await mount(
//         <DiagnosticComponent diagChild={fakeDiagChild} redirectUrl="/url" navigate={testNavigate} />
//     );
//     await expect(component.locator('[data-testid="diagChildType"]')).toBeVisible();
// });
