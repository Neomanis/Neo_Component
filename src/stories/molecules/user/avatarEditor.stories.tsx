import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { AvatarEditor } from "../../../components/molecules";
import { imgAvatar } from "../../fakeAvatar";

export default {
    component: AvatarEditor,
    title: "Molecules/User/AvatarEditor",
} as Meta;

const Template: ComponentStory<typeof AvatarEditor> = (args) => {
    return (
        <div style={{ width: "400px" }}>
            <AvatarEditor
                {...args}
                setShowAvatarEditor={() => true}
                fCallBackUploadAvatar={() => {
                    ("");
                }}
            />
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
    editorWidth: 250,
};

export const WithStyle = Template.bind({});
WithStyle.args = {
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
    editorWidth: 250,
    divEditorClassName: "border-2 border-neo-blue-modal p-8",
    dropZoneClassName: "flex flex-row text-center justify-between items-center",
};
