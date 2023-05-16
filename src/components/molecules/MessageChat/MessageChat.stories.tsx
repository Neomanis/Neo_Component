/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import WritingDots from "@/components/atoms/WritingDots";

import MessageChat from "./MessageChat";
import { MessageType } from "@neomanis/neo-types";
import { fakeUser } from "@/utils/storiesData/fakeObject";

export default {
    component: MessageChat,
    title: "Molecules/Chat/MessageChat",
} as Meta;

function downloadStory(attachmentId: string): void {
    console.log("download attachement " + attachmentId);
}

function deleteStory(attachmentId: string): void {
    console.log("delete attachement " + attachmentId);
}

const Template: ComponentStory<typeof MessageChat> = (args) => {
    return (
        <div className="p-4 flex items-center flex-col bg-neo-expanded w-[283px]">
            <MessageChat {...args} isMe={true} isFailed={true} />
            <MessageChat {...args} isMe={false} privateMessage={true} />
            <MessageChat {...args} isMe={true} isLoading={true} isValidate={false} />
            <MessageChat {...args} isMe={false} />
            <MessageChat {...args} isMe={true} privateMessage={true} />
        </div>
    );
};

const Template2: ComponentStory<typeof MessageChat> = (args) => {
    return (
        <div className="p-4 flex items-center flex-col bg-neo-expanded w-[330px]">
            <MessageChat {...args} name={"It's me"} content={"My interloctor is writting now"} isMe={true} />
            <MessageChat {...args} name={"It's who write"} content={<WritingDots />} isMe={false} />
        </div>
    );
};

const Template3: ComponentStory<typeof MessageChat> = (args) => {
    return (
        <div className="p-4 flex items-center flex-col bg-neo-bg-A w-[330px]">
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
                content={
                    "this_message_is_a_fileeeeeeegk regktrk gktr ekgtr elgtkr egltkr egltkr glkt relgktrel gktrlk egtlrk egltkr eglktre kgtr legkrt keeeeeeeeeeeeeeeeeeeeeeeeee.jpeg"
                }
                isMe={false}
                type={MessageType.ATTACHMENT}
                deleteDate="04/14/2023"
            />
            <MessageChat
                {...args}
                name={"It's me"}
                content={
                    "send_by_megfred vkre kvre kzerk ez kre krke zfkr ekzfr kezkf  kgrfke kgfre kgkre kgrek grek zgkre kgrek zgkre kzgr ekzg kregzk rek gzrek.jpeg"
                }
                isMe={false}
                type={MessageType.ATTACHMENT}
            />
            <MessageChat
                {...args}
                name={"It's not me"}
                content={"UNE PEPENEeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"}
                isMe={false}
                type={MessageType.MESSAGE}
            />
            <MessageChat {...args} name={"It's me"} content={"isFailed"} isMe={true} type={MessageType.MESSAGE} />
        </div>
    );
};

const Template4: ComponentStory<typeof MessageChat> = (args) => {
    return (
        <div className="p-4 flex items-center flex-col bg-neo-expanded w-[735px]">
            <MessageChat {...args} isMe={true} isFailed={true} />
            <MessageChat {...args} isMe={false} privateMessage={true} />
            <MessageChat {...args} isMe={true} isLoading={true} isValidate={false} />
            <MessageChat
                {...args}
                name={"It's not me"}
                content={
                    "this_message_is_a_fileeeeeeegk regktrk gktr ekgtr elgtkr egltkr egltkr glkt relgktrel gktrlk egtlrk egltkr eglktre kgtr legkrt keeeeeeeeeeeeeeeeeeeeeeeeee.jpeg"
                }
                isMe={false}
                type={MessageType.ATTACHMENT}
                deleteDate="04/14/2023"
            />
            <MessageChat
                {...args}
                name={"It's me"}
                content={"send_by_megfredgzreftghbfgdhbfgchbdfgchfghnfhk.jpeg"}
                isMe={false}
                type={MessageType.ATTACHMENT}
            />
            <MessageChat {...args} isMe={false} />
        </div>
    );
};

export const Default: ComponentStory<typeof MessageChat> = Template.bind({});
Default.args = {
    content: "BURN BABY BURN!",
    date: "12:12",
    name: "Ragnaros The Firelord",
    type: MessageType.MESSAGE,
};

export const EncodedAvatar: ComponentStory<typeof MessageChat> = Template.bind({});
EncodedAvatar.args = {
    content: "BURNBABYBURN!Andthismessageisveryveryverylongtoshowhowmanylinearedisplayed",
    date: "12:12",
    name: "Ragnaros The Firelord",
    type: MessageType.MESSAGE,
    avatar: fakeUser.avatar,
};

export const IsWriting: ComponentStory<typeof MessageChat> = Template2.bind({});
IsWriting.args = {
    date: "12:12",
};

export const ContainFile: ComponentStory<typeof MessageChat> = Template3.bind({});
ContainFile.args = {
    date: "15:15",
    attachmentId: "12",
    downloadAttachmentCallback: downloadStory,
    deleteAttachmentCallback: deleteStory,
};

export const ContainFileReadOnly: ComponentStory<typeof MessageChat> = Template3.bind({});
ContainFileReadOnly.args = {
    date: "15:15",
    attachmentId: "12",
    downloadAttachmentCallback: downloadStory,
    deleteAttachmentCallback: deleteStory,
    attachmentReadOnly: true,
};

export const IsWide: ComponentStory<typeof MessageChat> = Template4.bind({});
IsWide.args = {
    content: "BURN BABY BURN!",
    date: "12:12",
    name: "Ragnaros The Firelord",
    type: MessageType.MESSAGE,
    classNames: {
        hoverInformations: "text-lg text-neo-blue-secondary font-bold",
        icon: "w-[10%]",
        message: "w-[90%] px-2 text-lg",
    },
    attachmentId: "12",
    downloadAttachmentCallback: downloadStory,
    deleteAttachmentCallback: deleteStory,
};
