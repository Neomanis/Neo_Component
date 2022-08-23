/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import SimilarTicket from "./SimilarTicket";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
    // No test written yet. Good luck!
    // const component = await mount(<SimilarTicket title="SimilarTicket" />);
    expect(true).toBe(true);
});
