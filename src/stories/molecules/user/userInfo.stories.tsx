import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import UserInfo from "../../../components/molecules/user/userInfo";
import { imgAvatar } from "../../fakeAvatar";

export default {
    title: "Molecules/User/Info",
    component: UserInfo,
} as Meta;

const Template: ComponentStory<typeof UserInfo> = (args) => {
    return (
        <div className="bg-neo-bg-A p-3 flex items-center" style={{ width: "300px" }}>
            <UserInfo {...args} setShowAvatarEditor={() => true} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    user: {
        uid: "ttest",
        name: { firstName: "Tech", lastName: "Test" },
        role: "Technician",
        language: "fr_FR",
        avatar: {
            encodedAvatar: imgAvatar,
            mimetype: "image/png",
            originalname: "blob-l-eponge.png",
        },
    },
};

export const WithoutAvatar = Template.bind({});
WithoutAvatar.args = {
    user: {
        uid: "ttest",
        name: { firstName: "Tech", lastName: "Test" },
        role: "Technician",
        language: "fr_FR",
    },
};

export const WithStyle = Template.bind({});
WithStyle.args = {
    user: {
        uid: "ttest",
        name: { firstName: "Tech", lastName: "Test" },
        role: "Technician",
        language: "fr_FR",
        avatar: {
            encodedAvatar: imgAvatar,
            mimetype: "image/png",
            originalname: "blob-l-eponge.png",
        },
    },
    imageSize: 36,
    divInfoClassName: "flex flex-col-reverse text-center",
    nameClassName: "text-neo-yellow-sand text-xl font-bold",
    roleClassName: "text-neo-light-grey mb-5",
};
