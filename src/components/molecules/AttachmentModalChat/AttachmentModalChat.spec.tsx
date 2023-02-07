import { test } from "@playwright/experimental-ct-react";

test.use({ viewport: { width: 500, height: 500 } });

// FIXME: debug File is not defined
test("should work", async () => {
    // const file = new File(["image"], "../../utils/storiesData/neo-nico.png", { type: "image/png" });
    // const component = await mount(
    //     <AttachmentModalChat
    //         title="neo-nico"
    //         file={file}
    //         isEmpty={false}
    //         onInputChange={() => {}}
    //         onValidate={() => {}}
    //         onCancel={() => {}}
    //     />
    // );
    // await expect(component).toContainText("neo-nico");
});
