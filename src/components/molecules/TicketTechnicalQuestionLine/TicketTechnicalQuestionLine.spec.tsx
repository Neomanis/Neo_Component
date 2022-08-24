import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import TicketTechnicalQuestionLine from "./TicketTechnicalQuestionLine";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
    const component = await mount(
        <TicketTechnicalQuestionLine answersNumber={2} openTechnicalQuestion={() => {}} solved title="Piggy bank" />
    );
    await expect(component).toContainText("Piggy bank");
});
