import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import Img from "./Img";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
    const component = await mount(<Img type="imgProfile" />);
    await expect(component).toBeVisible();
});

test("should be visible and display correctly with type logoImg", async ({ mount }) => {
    const component = await mount(
        <Img className="text-neo-red" type="logoImg" data={{ alt: "Helloworld", height: 200 }} />
    );
    await expect(component).toHaveAttribute("data-testid", "logoImg-body");
    await expect(component).toHaveClass(/text-neo-red/);
});

test("should be visible and display correctly with type logoSvg", async ({ mount }) => {
    const component = await mount(
        <Img className="text-neo-red" type="logoSvg" data={{ alt: "Helloworld", height: 200 }} />
    );
    await expect(component).toHaveAttribute("data-testid", "logoSvg-body");
    await expect(component).toHaveClass(/text-neo-red/);
});

test("should be visible and display correctly with type imgProfile with data", async ({ mount }) => {
    const component = await mount(
        <Img className="text-neo-red" type="imgProfile" data={{ alt: "Helloworld", height: 200 }} />
    );
    await expect(component).toHaveAttribute("data-testid", "profileImg-with-data-body");
    await expect(component).toHaveClass(/text-neo-red/);
});

test("should be visible and display correctly with type imgProfile without data", async ({ mount }) => {
    const component = await mount(<Img type="imgProfile" />);
    await expect(component).toHaveAttribute("data-testid", "profileImg-without-data-body");
});

test("should be visible and display correctly with type img-background", async ({ mount }) => {
    const component = await mount(
        <Img className="text-neo-red" type="img-background" data={{ alt: "Helloworld", height: 200 }} />
    );
    await expect(component).toHaveAttribute("data-testid", "backgroundImg-body");
    await expect(component).toHaveClass(/text-neo-red/);
});

test("should be visible and display correctly with type default", async ({ mount }) => {
    const component = await mount(<Img type="" data={{ alt: "Helloworld", height: 200 }} />);
    await expect(component).toHaveAttribute("data-testid", "default-body");
});
