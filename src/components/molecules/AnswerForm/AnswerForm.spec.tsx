import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import AnswerForm from "./AnswerForm";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
    const component = await mount(<AnswerForm />);
    await expect(component).toBeVisible();
});
