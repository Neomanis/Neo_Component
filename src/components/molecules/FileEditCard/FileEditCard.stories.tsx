/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import FileEditCard from "./FileEditCard";

export default {
    component: FileEditCard,
    title: "Molecules/InputAttachments/FileEditCard",
} as Meta;

const Template: ComponentStory<typeof FileEditCard> = (args) => {
    return <FileEditCard {...args} />;
};

export const Default: ComponentStory<typeof FileEditCard> = Template.bind({});
Default.args = {
    data: {
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
    },
    deleteFile: () => console.log("delete"),
    onChangeInput: (data) => console.log(data),
};
