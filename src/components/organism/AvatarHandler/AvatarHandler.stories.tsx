/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { Role } from "@neomanis/neo-types";
import AvatarHandler from "./AvatarHandler";

export default {
    component: AvatarHandler,
    title: "Organism/AvatarHandler",
} as Meta;

const Template: ComponentStory<typeof AvatarHandler> = (args) => {
    return <AvatarHandler {...args} />;
};

const userTest = {
    uid: "ttest",
    firstname: "Tech",
    lastname: "Test",
    role: Role.TECHNICIAN,
    language: "fr-FR",
    // will work only with you avatar url
    avatar: "http://" + "localhost:9000/d78679d3/3030/4c66/8e92/e456e1630304/blob-l-eponge.png",
    dn: "dn",
    isActive: true,
    level: 1,
    membership: {
        entities: [],
        groups: [],
    },
    neoId: 1,
    timezone: null,
    xmpp: {},
    title: "totle",
};

export const Default: ComponentStory<typeof AvatarHandler> = Template.bind({});
Default.args = {
    user: userTest,
    fCallBackUploadAvatar: () => {
        console.log("upload de l'avatar");
    },
    editorWidth: 250,
};

export const WithStyle: ComponentStory<typeof AvatarHandler> = Template.bind({});
WithStyle.args = {
    user: userTest,
    divEditorClassName: "border-2 border-neo-blue text-white p-8 mt-4",
    dropZoneClassName: "flex flex-row text-center justify-between items-center",
    editorWidth: 100,
    fCallBackUploadAvatar: () => {
        console.log("upload de l'avatar");
    },
    divInfoClassName: "flex flex-col-reverse text-center",
    nameClassName: "text-neo-yellow-sand text-xl font-bold",
    roleClassName: "text-neo-light-grey mb-5",
};
