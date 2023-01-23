/* eslint-disable no-console */
import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import FileEditCard from "./FileEditCard";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
    const component = await mount(
        <FileEditCard
            data={{
                title: "title file",
                file: {
                    lastModified: 1674051592527,
                    name: "changelog.md",
                    path: "changelog.md",
                    size: 5815,
                    type: "",
                    webkitRelativePath: "",
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } as any,
            }}
            deleteFile={() => console.log("delete")}
            onChangeInput={(data) => console.log(data)}
            isEmptyCallBack={(data) => console.log(data)}
        />
    );
    await expect(component).toBeVisible();
});
