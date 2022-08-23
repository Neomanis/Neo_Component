import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import ApprovalCard from "./ApprovalCard";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
    const component = await mount(
        <ApprovalCard
            approvalErrorText="nope"
            approvalId={1}
            approvalRequestText="Pretty please"
            content="It's PAYDAY"
            date="2020-09-05 10:58:24"
            fManageApproval={async () => {}}
            sender="Toto"
            ticketId={15}
        />
    );
    await expect(component).toBeVisible();
});
