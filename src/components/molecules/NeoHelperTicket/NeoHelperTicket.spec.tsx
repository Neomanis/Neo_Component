import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import NeoHelperTicket from "./NeoHelperTicket";

test.use({ viewport: { width: 500, height: 500 } });

// test("should work", async ({ mount }) => {
//     const component = await mount(<NeoHelperTicket title="NeoHelperTicket" />);
//     await expect(component).toContainText("NeoHelperTicket");
// });
