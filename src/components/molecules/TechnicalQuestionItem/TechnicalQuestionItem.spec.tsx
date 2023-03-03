import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import TechnicalQuestionItem from "./TechnicalQuestionItem";

test.use({ viewport: { width: 500, height: 500 } });

const fakePartialTicket = {
    id: 0,
    uid: "1gl-666-INC",
    priority: 0,
    status: 6,
};

test("component should exist and action should works", async ({ mount }) => {
    let open = false;
    const component = await mount(
        <TechnicalQuestionItem
            answerAmount={1}
            createDate={"2021-11-15T13:34:48.551Z"}
            id={2}
            selectedQuestion={undefined}
            openTechnicalQuestion={() => (open = true)}
            solved={false}
            ticket={fakePartialTicket}
            title={"Title"}
        />
    );

    await component.click();
    expect(open).toBe(true);
    await expect(component.locator('[data-testid="tq-middle"]')).toHaveClass(/opacity-100/);
    await expect(component.locator('[data-testid="tq-end"]')).toBeDefined;
    await expect(component.locator('[data-testid="tq-end"]')).toBeVisible;
});

test("should display content correctly if not selected and/or not solved", async ({ mount }) => {
    const component = await mount(
        <TechnicalQuestionItem
            answerAmount={1}
            createDate={"2021-11-15T13:34:48.551Z"}
            id={2}
            selectedQuestion={1}
            openTechnicalQuestion={() => {}}
            solved={false}
            ticket={fakePartialTicket}
            title={"Title"}
        />
    );

    await expect(component.locator('[data-testid="tq-middle"]')).toHaveClass(/opacity-50/);
    await expect(component.locator('[data-testid="tq-pill"]')).toHaveClass(/bg-neo-red/);
    await expect(component.locator('[data-testid="tq-middle-bottom"]')).toHaveClass(/text-neo-blue-secondary/);
});

test("should display content correctly if selected or/and solved", async ({ mount }) => {
    const component = await mount(
        <TechnicalQuestionItem
            answerAmount={1}
            createDate={"2021-11-15T13:34:48.551Z"}
            id={2}
            selectedQuestion={2}
            openTechnicalQuestion={() => {}}
            solved={true}
            ticket={fakePartialTicket}
            title={"Title"}
        />
    );

    await expect(component.locator('[data-testid="tq-middle"]')).toHaveClass(/opacity-100/);
    await expect(component.locator('[data-testid="tq-pill"]')).toHaveClass(/bg-neo-green/);
    await expect(component.locator('[data-testid="tq-middle-bottom"]')).toHaveClass(/text-white/);
});

test("shouldn't display information not passed", async ({ mount }) => {
    const component = await mount(
        <TechnicalQuestionItem
            answerAmount={undefined}
            createDate={undefined}
            id={2}
            selectedQuestion={2}
            openTechnicalQuestion={() => {}}
            solved={false}
            title={"Title"}
        />
    );

    await expect(component.locator('[data-testid="tq-end"]')).toBeUndefined;
    await expect(component.locator('[data-testid="tq-date"]')).toBeUndefined;
    await expect(component.locator('[data-testid="tq-answer"]')).toBeUndefined;
});
