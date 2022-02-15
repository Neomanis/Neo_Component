import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { MessageChat } from "../../../components/molecules";
import WritingDots from "../../../components/atoms/chat/writingDots";
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

const Template2: ComponentStory<typeof MessageChat> = (args) => {
    return (
        <div className="p-4 flex items-center flex-col bg-neo-expanded w-72">
            <MessageChat {...args} name={"It's me"} content={"My interloctor is writting now"} isMe={true} />
            <MessageChat {...args} name={"It's who write"} content={<WritingDots />} isMe={false} />
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

export const EncodedAvatar = Template.bind({});
EncodedAvatar.args = {
    content: "BURN BABY BURN! And this message is very very very long to show how many line are displayed",
    date: "12:12",
    name: "Ragnaros The Firelord",
    privateMessage: false,
    avatar: {
        encodedAvatar: imgAvatar,
        mimetype: "image/png",
        originalname: "blob-l-eponge.png",
    },
};

export const IsWriting = Template2.bind({});
IsWriting.args = {
    date: "12:12",
    privateMessage: false,
};
