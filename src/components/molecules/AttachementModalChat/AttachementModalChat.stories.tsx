/* eslint-disable no-console */
import React, { useState } from "react";
import { ComponentStory, Meta } from "@storybook/react";

import AttachementModalChat from "./AttachementModalChat";

export default {
    component: AttachementModalChat,
    title: "Molecules/Chat/AttachementModalChat",
} as Meta;

const Template: ComponentStory<typeof AttachementModalChat> = (args) => {
    const [file, setFile] = useState<{ title: string; file: File; isEmpty: boolean }>({
        title: "neo-nico",
        file: new File(["image"], "../../utils/storiesData/neo-nico.png", { type: "image/png" }),
        isEmpty: false,
    });
    return (
        <AttachementModalChat
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

export const Default: ComponentStory<typeof AttachementModalChat> = Template.bind({});
Default.args = {
    onValidateCallback: () => console.log("validate"),
    onUndoCallback: () => console.log("undo"),
};
