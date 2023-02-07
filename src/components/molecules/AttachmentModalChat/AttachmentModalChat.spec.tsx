import { test } from "@playwright/experimental-ct-react";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async () => {
    // const file = new File(["image"], "../../utils/storiesData/neo-nico.png", { type: "image/png" });
    // const component = await mount(
    //     <AttachmentModalChat
    //         title="neo-nico"
    //         file={file}
    //         isEmpty={false}
    //         onChangeCallback={() => {}}
    //         fCallBackValidate={() => {}}
    //         fCallBackCancel={() => {}}
    //     />
    // );
    // await expect(component).toContainText("neo-nico");
});
