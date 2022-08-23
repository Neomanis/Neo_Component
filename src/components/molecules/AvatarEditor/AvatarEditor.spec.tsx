import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import { Role } from "@neomanis/neo-types";
import { imgAvatar } from "@/utils/storiesData/fakeAvatar";
import AvatarEditor from "./AvatarEditor";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
    const component = await mount(
        <AvatarEditor
            user={{
                uid: "ttest",
                name: { firstName: "Tech", lastName: "Test" },
                role: Role.TECHNICIAN,
                language: "fr-FR",
                avatar: {
                    encodedAvatar: imgAvatar,
                    mimetype: "image/png",
                    originalname: "blob-l-eponge.png",
                },
            }}
            editorWidth={250}
            setShowAvatarEditor={() => {}}
            fCallBackUploadAvatar={async () => {}}
        />
    );
    await expect(component).toBeVisible();
});
