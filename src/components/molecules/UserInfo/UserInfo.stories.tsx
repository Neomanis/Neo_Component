/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import UserInfo from "./UserInfo";
import { Role } from "@neomanis/neo-types";

export default {
    component: UserInfo,
    title: "Molecules/UserInfo",
} as Meta;

const Template: ComponentStory<typeof UserInfo> = (args) => {
    return <UserInfo {...args} />;
};

const userTest = {
    uid: "ttest",
    firstname: "Tech",
    lastname: "Test",
    role: Role.TECHNICIAN,
    language: "fr-FR",
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

export const Default: ComponentStory<typeof UserInfo> = Template.bind({});
Default.args = {
    user: userTest,
};

export const WithoutAvatar: ComponentStory<typeof UserInfo> = Template.bind({});
WithoutAvatar.args = {
    user: userTest,
};

export const WithStyle: ComponentStory<typeof UserInfo> = Template.bind({});
WithStyle.args = {
    user: userTest,
    imageSize: 144,
    divInfoClassName: "flex flex-col-reverse text-center",
    nameClassName: "text-neo-yellow-sand text-xl font-bold",
    roleClassName: "text-neo-light-grey mb-5",
};
