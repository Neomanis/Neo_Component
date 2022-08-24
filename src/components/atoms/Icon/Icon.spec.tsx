import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import Icon from "./Icon";

test.use({ viewport: { width: 500, height: 500 } });

test("should be visible and display icon link type", async ({ mount }) => {
    const component = await mount(<Icon type="iconLink" fontIcon={faCheckSquare} />);
    await expect(component).toHaveAttribute("data-testid", "icon-link-body");
});
test("should be visible and display icon placeholder type", async ({ mount }) => {
    const component = await mount(
        <Icon type="placeholderInput" fontIcon={faCheckSquare} className="p-4 text-neo-bg-B text-4xl" />
    );
    await expect(component).toHaveAttribute("data-testid", "icon-placeholder-body");
});
test("should be visible and display icon red dot type", async ({ mount }) => {
    const component = await mount(<Icon type="iconWithRedDot" fontIcon={faCheckSquare} />);
    await expect(component).toHaveAttribute("data-testid", "icon-reddot-body");
});
test("should be visible and display icon default type", async ({ mount }) => {
    const component = await mount(<Icon fontIcon={faCheckSquare} />);
    await expect(component).toHaveAttribute("data-testid", "icon-default-body");
});

// TODO: Search why there is a error "Objects are not valid as a React child React error" when passing a component as a prop.
// test("should display svg if svg prop exist link type", async ({ mount }) => {
//     const component = await mount(<Icon type="iconLink" svg={<IconAdd />} />);
//     await expect(component.locator("svg")).toBeVisible();
// });
// test("should display svg if svg prop exist placeholder type", async ({ mount }) => {
//     const component = await mount(<Icon type="placeholderInput" svg={<IconAdd />} />);
//     await expect(component.locator("svg")).toBeVisible();
// });
// test("should display svg if svg prop exist redDot type", async ({ mount }) => {
//     const component = await mount(<Icon type="iconWithRedDot" svg={<IconAdd />} />);
//     await expect(component.locator("svg")).toBeVisible();
// });
// test("should display svg if svg prop exist default type", async ({ mount }) => {
//     const component = await mount(<Icon svg={<IconAdd />} />);
//     await expect(component.locator("svg")).toBeVisible();
// });

test("should display redDot if icon is redDot", async ({ mount }) => {
    const component = await mount(<Icon type="iconWithRedDot" redDot={true} />);
    await expect(component.locator("svg")).toBeVisible();
});

test("should change style if ClassName prop exist", async ({ mount }) => {
    const component = await mount(<Icon fontIcon={faCheckSquare} className="text-neo-red" style={{ width: "50px" }} />);
    await expect(component).toHaveClass(/text-neo-red/);
    await expect(component).toHaveCSS("width", "50px");
});
test("should call Callback if callback props exist", async ({ mount }) => {
    let clicked = false;
    const component = await mount(<Icon fontIcon={faCheckSquare} fCallBack={() => (clicked = true)} />);
    await component.click();
    expect(clicked).toBe(true);
});
