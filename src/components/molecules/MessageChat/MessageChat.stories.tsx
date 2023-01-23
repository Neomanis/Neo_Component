/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { imgAvatar } from "@/utils/storiesData/fakeAvatar";
import WritingDots from "@/components/atoms/WritingDots";

import MessageChat from "./MessageChat";
import { MessageType } from "@neomanis/neo-types";

export default {
    component: MessageChat,
    title: "Molecules/Chat/MessageChat",
} as Meta;

const Template: ComponentStory<typeof MessageChat> = (args) => {
    return (
        <div className="p-4 flex items-center flex-col bg-neo-expanded w-72">
            <MessageChat {...args} isMe={true} isFailed={true} />
            <MessageChat {...args} isMe={false} privateMessage={true} />
            <MessageChat {...args} isMe={true} isLoading={true} />
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

const Template3: ComponentStory<typeof MessageChat> = (args) => {
    return (
        <div className="p-4 flex items-center flex-col bg-neo-expanded w-72">
            <MessageChat
                {...args}
                name={"It's me"}
                content={"We are sending some attachment"}
                isMe={true}
                type={MessageType.MESSAGE}
            />
            <MessageChat
                {...args}
                name={"It's not me"}
                content={"this_message_is_a_file.jpeg"}
                isMe={false}
                type={MessageType.ATTACHMENT}
            />
            <MessageChat
                {...args}
                name={"It's me"}
                content={"send_by_me_i_can_delete_it.jpeg"}
                isMe={true}
                type={MessageType.ATTACHMENT}
            />
        </div>
    );
};

export const Default: ComponentStory<typeof MessageChat> = Template.bind({});
Default.args = {
    content: "BURN BABY BURN!",
    date: "12:12",
    name: "Ragnaros The Firelord",
    privateMessage: false,
    type: MessageType.MESSAGE,
    isValidate: true,
    isFailed: false,
};

export const EncodedAvatar: ComponentStory<typeof MessageChat> = Template.bind({});
EncodedAvatar.args = {
    content: "BURN BABY BURN! And this message is very very very long to show how many line are displayed",
    date: "12:12",
    name: "Ragnaros The Firelord",
    privateMessage: false,
    type: MessageType.MESSAGE,
    avatar: {
        encodedAvatar: imgAvatar,
        mimetype: "image/png",
        originalname: "blob-l-eponge.png",
    },
};

export const IsWriting: ComponentStory<typeof MessageChat> = Template2.bind({});
IsWriting.args = {
    date: "12:12",
    privateMessage: false,
};

export const ContainFile: ComponentStory<typeof MessageChat> = Template3.bind({});
ContainFile.args = {
    date: "15:15",
    privateMessage: false,
    attachmentId: 1,
};
