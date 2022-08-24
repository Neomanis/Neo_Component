/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { Role } from "@neomanis/neo-types";
import { imgAvatar } from "@/utils/storiesData/fakeAvatar";

import AvatarEditor from "./AvatarEditor";

export default {
    component: AvatarEditor,
    title: "Molecules/AvatarEditor",
} as Meta;

const Template: ComponentStory<typeof AvatarEditor> = (args) => {
    return <AvatarEditor {...args} />;
};

export const Default: ComponentStory<typeof AvatarEditor> = Template.bind({});
Default.args = {
    user: {
        uid: "ttest",
        name: { firstName: "Tech", lastName: "Test" },
        role: Role.TECHNICIAN,
        language: "fr-FR",
        avatar: {
            encodedAvatar: imgAvatar,
            mimetype: "image/png",
            originalname: "blob-l-eponge.png",
        },
    },
    editorWidth: 250,
};

export const WithStyle: ComponentStory<typeof AvatarEditor> = Template.bind({});
WithStyle.args = {
    user: {
        uid: "ttest",
        name: { firstName: "Tech", lastName: "Test" },
        role: Role.TECHNICIAN,
        language: "fr-FR",
        avatar: {
            encodedAvatar: imgAvatar,
            mimetype: "image/png",
            originalname: "blob-l-eponge.png",
        },
    },
    editorWidth: 250,
    divEditorClassName: "border-2 border-neo-blue-modal p-8",
    dropZoneClassName: "flex flex-row text-center justify-between items-center",
};
