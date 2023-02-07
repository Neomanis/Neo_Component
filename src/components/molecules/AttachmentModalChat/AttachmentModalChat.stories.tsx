/* eslint-disable no-console */
import React, { useState } from "react";
import { ComponentStory, Meta } from "@storybook/react";

import AttachmentModalChat from "./AttachmentModalChat";

export default {
    component: AttachmentModalChat,
    title: "Molecules/Chat/AttachmentModalChat",
} as Meta;

const Template: ComponentStory<typeof AttachmentModalChat> = (args) => {
    const [file, setFile] = useState<{ title: string; file: File; isEmpty: boolean }>({
        title: "neo-nico",
        file: new File(["image"], "../../utils/storiesData/neo-nico.png", { type: "image/png" }),
        isEmpty: false,
    });
    return (
        <AttachmentModalChat
            onChangeCallback={(e) => {
                const isEmpty = e.target.value === "";
                setFile((oldFile) => {
                    if (oldFile) {
                        return { title: e.target.value, file: oldFile.file, isEmpty: isEmpty };
                    }
                });
            }}
            title={file.title}
            file={file.file}
            isEmpty={false}
            {...args}
        />
    );
};

export const Default: ComponentStory<typeof AttachmentModalChat> = Template.bind({});
Default.args = {
    fCallBackValidate: () => console.log("validate"),
    fCallBackCancel: () => console.log("undo"),
};
