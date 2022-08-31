import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import TechnicalQuestionItem from "./TechnicalQuestionItem";

test.use({ viewport: { width: 500, height: 500 } });

test("action should works", async ({ mount }) => {
    let open = false;
    const component = await mount(
        <TechnicalQuestionItem
            answerAmount={1}
            createDate={"2021-11-15T13:34:48.551Z"}
            id={2}
            isSelected={false}
            openTechnicalQuestion={() => (open = true)}
            solved={false}
            ticket={{
                id: 0,
                uid: "1gl-666-INC",
                priority: 0,
                status: 6,
            }}
            title={"Title"}
        />
    );

    await component.click();
    expect(open).toBe(true);
});

test("should display content correctly if not selected", async ({ mount }) => {
    const component = await mount(
        <TechnicalQuestionItem
            answerAmount={1}
            createDate={"2021-11-15T13:34:48.551Z"}
            id={2}
            isSelected={false}
            openTechnicalQuestion={() => {}}
            solved={false}
            ticket={{
                id: 0,
                uid: "1gl-666-INC",
                priority: 0,
                status: 6,
            }}
            title={"Title"}
        />
    );

    await expect(component.locator('[data-testid="tq-middle"]')).toHaveClass(/bg-neo-bg-B/);
    await expect(component.locator('[data-testid="tq-middle-bottom"]')).toHaveClass(/text-neo-blue-secondary/);
});

test("should display content correctly if selected", async ({ mount }) => {
    const component = await mount(
        <TechnicalQuestionItem
            answerAmount={1}
            createDate={"2021-11-15T13:34:48.551Z"}
            id={2}
            isSelected
            openTechnicalQuestion={() => {}}
            solved={false}
            ticket={{
                id: 0,
                uid: "1gl-666-INC",
                priority: 0,
                status: 6,
            }}
            title={"Title"}
        />
    );

    await expect(component.locator('[data-testid="tq-middle"]')).toHaveClass(/bg-neo-blue/);
    await expect(component.locator('[data-testid="tq-middle-bottom"]')).toHaveClass(/text-white/);
});
