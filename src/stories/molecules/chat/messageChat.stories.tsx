import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { MessageChat } from "../../../components/molecules";
import { imgAvatar } from "../../fakeAvatar";

export default {
    component: MessageChat,
    title: "Molecules/Chat/MessageChat",
} as Meta;

const Template: ComponentStory<typeof MessageChat> = (args) => {
    return (
        <div className="p-4 flex items-center flex-col bg-neo-expanded w-72">
            <MessageChat {...args} isMe={true} />
            <MessageChat {...args} isMe={false} />
            <MessageChat {...args} isMe={true} />
            <MessageChat {...args} isMe={false} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    content: "BURN BABY BURN!",
    date: "12:12",
    name: "Ragnaros The Firelord",
    privateMessage: false,
};
export const DefaultDot = Template.bind({});
DefaultDot.args = {
    content: "BURN BABY BURN! fdksfkdskqfkdksq kfdksqk dfk fkdskqfkd f kkfdsqk fkdskfks",
    date: "12:12",
    name: "Ragnaros The Firelord",
};

export const encodedAvatar = Template.bind({});
encodedAvatar.args = {
    content: "BURN BABY BURN! fdksfkdskqfkdksq kfdksqk dfk fkdskqfkd f kkfdsqk fkdskfks",
    date: "12:12",
    name: "Ragnaros The Firelord",
    avatar: {
        encodedAvatar: imgAvatar,
        mimetype: "image/png",
        originalname: "blob-l-eponge.png",
    },
};
