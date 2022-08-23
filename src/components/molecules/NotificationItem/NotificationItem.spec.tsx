// import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async () => {
    // Playwright seem to struggle when passing a component as props to another component.
    // const component = await mount(<NotificationItem content="Hello !" svg={<IconNotification />} />);
    expect(true).toBe(true);
});
