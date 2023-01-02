import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import Table from "./Table";
import { columns, data } from "./TableDataExemple";

test.use({ viewport: { width: 500, height: 500 } });

test.describe("Table Component", () => {
    test("Table component has the correct number of columns and rows", async ({ mount }) => {
        const component = await mount(<Table columns={columns} data={data} />);
        await expect(component).toBeVisible();
        const rows = await component.getByRole("row").all();
        expect(rows).toHaveLength(data.length + 1);
        expect(await rows[0].getByRole("cell").all()).toHaveLength(columns.length);
    });

    test("Table component renders with correct data and sorting functionality works as expected", async ({ mount }) => {
        const component = await mount(<Table columns={columns} data={data} />);

        const rows = await component.getByRole("row").all();
        const firstHeaderCell = rows[0].getByRole("cell").first();
        await expect(rows[1].getByRole("cell").first()).toHaveText("The Elephant");
        await firstHeaderCell.click();
        await expect(rows[1].getByRole("cell").first()).toHaveText("Bain");
        await firstHeaderCell.click();
        await expect(rows[1].getByRole("cell").first()).toHaveText("Vlad");
        await firstHeaderCell.click();
        await expect(rows[1].getByRole("cell").first()).toHaveText("The Elephant");
    });
});
