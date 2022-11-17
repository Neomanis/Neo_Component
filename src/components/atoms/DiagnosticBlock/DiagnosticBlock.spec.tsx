import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import DiagnosticBlock from "./DiagnosticBlock";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
    const component = await mount(<DiagnosticBlock />);
    await expect(component).toBeVisible();
});

test("should be visible with type Book", async ({ mount }) => {
    const component = await mount(
        <DiagnosticBlock
            book={{
                name: "Book Name",
                lastElement: {},
                isAwaiting: false,
                isError: false,
            }}
        />
    );
    await expect(component.locator('[data-testid="blockIsBook"]')).toBeVisible();
});
test("should be visible with type Action", async ({ mount }) => {
    const component = await mount(
        <DiagnosticBlock
            Action={{
                description: "Action description",
                id: 1,
                date: new Date(),
                executionTime: 496,
                result: "OK",
            }}
        />
    );
    await expect(component.locator('[data-testid="blockIsAction"]')).toBeVisible();
});
test("should be visible with type Exit", async ({ mount }) => {
    const component = await mount(
        <DiagnosticBlock
            Exit={{
                id: 456,
                type: "escalate",
                action: "Action Exit",
            }}
        />
    );
    await expect(component.locator('[data-testid="blockIsExit"]')).toBeVisible();
});
test("should be visible with type Error", async ({ mount }) => {
    const component = await mount(
        <DiagnosticBlock
            Error={{
                message: "Error Name",
                code: 404,
                runId: "1664376143263",
            }}
        />
    );
    await expect(component.locator('[data-testid="blockIsError"]')).toBeVisible();
});
test("should be visible with type Awaiting", async ({ mount }) => {
    const component = await mount(
        <DiagnosticBlock
            Awaiting={{
                description: "Awaiting description",
            }}
        />
    );
    await expect(component.locator('[data-testid="blockIsAwaiting"]')).toBeVisible();
});
