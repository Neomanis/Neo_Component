import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import { faCheckSquare, faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import ButtonSwitch from "./ButtonSwitch";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
    let clicked = false;
    const component = await mount(
        <ButtonSwitch
            testId="buttonSwitch-body"
            activeData="Helloworld"
            activeClassName="group text-white hover:text-neo-bg-A"
            inactiveClassName="group hover:text-white"
            inactiveData="Byeworld"
            activeFontIcon={faCheckSquare}
            inactiveFontIcon={faCheckDouble}
            activeIconClassName="text-white group-hover:text-neo-bg-A"
            inactiveIconClassName="text-neo-bg-A group-hover:text-white"
            fCallback={() => (clicked = true)}
        />
    );

    await expect(component).toContainText("Byeworld");
    await expect(component.locator("svg")).toHaveClass(/fa-check-double/);
    await component.click();
    await expect(component).toContainText("Helloworld");
    await expect(component.locator("svg")).toHaveClass(/fa-square-check/);
    expect(clicked).toBe(true);
});
