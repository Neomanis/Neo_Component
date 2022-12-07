import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import ButtonSelect from "./ButtonSelect";
import { fakeUser } from "@/utils/storiesData/fakeObject";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
    const component = await mount(
        <ButtonSelect
            array={fakeUser.membership.entities.map((item) => {
                return {
                    label: `[${item.itsmCode}] ${item.name}`,
                    value: item,
                };
            })}
            // eslint-disable-next-line no-console
            onClick={(data) => console.log(data)}
            button={{ children: "ButtonTest" }}
        />
    );
    await expect(component).toContainText("ButtonTest");
});
