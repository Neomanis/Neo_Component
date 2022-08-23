import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import OutageCard from "./OutageCard";
import { Role } from "@neomanis/neo-types";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
    const component = await mount(
        <OutageCard
            data={{
                id: 1,
                title: "Outage kkhfhhfh fkdskfdk k fkdskfkdskfk",
                content:
                    "outage content   Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quod cum nihil quasi deleniti, ut, labore, maxime odio sequi pariatur fugiat suscipit dicta alias corrupti? Accusantium hic laboriosam praesentium est!",
                severity: "",
                type: "outage",
                startAt: "2021-09-05T06:58:34.000Z",
                endAt: "2021-09-05T06:58:34.000Z",
                displayAt: "2021-09-05T06:58:34.000Z",
                hideAt: null,
                entities: [],
            }}
            deleteCallBack={() => {}}
            hoverInCallBack={() => {}}
            hoverOutCallBack={() => {}}
            modifCallBack={() => {}}
            role={Role.ADMINISTRATOR}
        />
    );
    await expect(component).toBeVisible();
});
