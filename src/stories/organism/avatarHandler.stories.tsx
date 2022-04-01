/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import AvatarHandler from "../../components/organism/avatarHandler";
import { imgAvatar } from "../fakeAvatar";

export default {
    title: "Organism/AvatarHandler",
    component: AvatarHandler,
} as Meta;

const Template: ComponentStory<typeof AvatarHandler> = (args) => {
    return (
        <div className="bg-neo-bg-A p-3 flex items-center" style={{ width: "500px" }}>
            <AvatarHandler {...args} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    user: {
        uid: "ttest",
        name: { firstName: "Tech", lastName: "Test" },
        role: "technicien",
        language: "fr-FR",
        avatar: {
            encodedAvatar: imgAvatar,
            mimetype: "image/png",
            originalname: "blob-l-eponge.png",
        },
    },
    fCallBackUploadAvatar: () => {
        console.log("upload de l'avatar");
    },
    editorWidth: 250,
};

export const WithStyle = Template.bind({});
WithStyle.args = {
    user: {
        uid: "ttest",
        name: { firstName: "Tech", lastName: "Test" },
        role: "technicien",
        language: "fr_FR",
        avatar: {
            encodedAvatar: imgAvatar,
            mimetype: "image/png",
            originalname: "blob-l-eponge.png",
        },
    },
    divEditorClassName: "border-2 border-neo-blue text-white p-8 mt-4",
    dropZoneClassName: "flex flex-row text-center justify-between items-center",
    editorWidth: 100,
    fCallBackUploadAvatar: () => {
        console.log("upload de l'avatar");
    },
    imageSize: 36,
    divInfoClassName: "flex flex-col-reverse text-center",
    nameClassName: "text-neo-yellow-sand text-xl font-bold",
    roleClassName: "text-neo-light-grey mb-5",
};
