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
    // will work only with you avatar url
    avatar: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgBAMAAAAQtmoLAAAAKlBMVEUAAAAAAAApKSlBQUpiMQhzc4OcUgDFIBjelADmWkH2vSD25lL/9qT////Vai+KAAAAAXRSTlMAQObYZgAAAdlJREFUWMPtlsFqwkAQhjclhB6ztRRReqiHXnoSbz0piLX2JcwliD6A0JsgEuoDlNJTQKzsnkJpSDN9A3PpG3U2ST12J4dCKftjNML/MTObndkwZmRkZPTX5Vb0Wxe/DrQq5nRSHehWBK4PQKtFAWpiU9wctTodygI0SsCZQqfTJgK+P3ZmgAClfltsJ9k+Qf8bKQACQZZlgHptqwC+lhh+ZNleAVz5HRjrAEwGUi4Tr/wX61JaSMzm8wrygo9BD5wjENVKYI3hNDnZbRiqlHJfAHrAuVQmeH9eqooJwB3AABN5egyL+rVF3MrldDtJ5/OwDKADbkSuHJAVgJf7kE1FTmg2lCNKheoOCa7froU2OSo5owLSHeG33s+aJQCuTfKzJhQBsNjRlpEAJHZSrY4tKBNkHeNSqk3XZXUKYEFSApH18D1BfgYAmwZ7CKJhsOsRgHUB7CAMgj5lGM9AIfgJ6wtGA2Ko45UK7lPmUjPGmRThlQr3zCMAM/BxhXz1MLhPAKyiBwCkEH2PkJIlCn+apiKklGDlPQBCYoSQdKBMxUG0o6hx8O9oh53VEAHnqndIj42x/kotpjWYrGgB7Djp5c6R8GgR+Gn5G0cVXwl41bcUIyMjo/+qLw92FGczGN4XAAAAAElFTkSuQmCC",
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
