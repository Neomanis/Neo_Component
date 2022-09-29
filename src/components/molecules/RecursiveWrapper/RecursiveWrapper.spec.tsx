import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import RecursiveWrapper from "./RecursiveWrapper";
import { fakeDiag2 } from "@/utils/storiesData/fakeObject";

function testNavigate(url: string, state: { state: string }): void {
    // eslint-disable-next-line no-console
    console.log(url, state);
}
test.use({ viewport: { width: 500, height: 500 } });

test("should find first class", async ({ mount }) => {
    const component = await mount(
        <RecursiveWrapper diagnostics={fakeDiag2} bookName="book" url="/url" navigate={testNavigate} />
    );
    await expect(component).toHaveAttribute("class", "bg-neo-bg-B p-4");
});
