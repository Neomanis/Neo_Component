/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import AttachmentChat from "./AttachmentChat";

export default {
    component: AttachmentChat,
    title: "Atoms/Chat/AttachmentChat",
} as Meta;

function downloadStory(attachmentId: string): void {
    console.log("download attachement " + attachmentId);
}

function deleteStory(attachmentId: string): void {
    console.log("delete attachement " + attachmentId);
}

const Template: ComponentStory<typeof AttachmentChat> = (args) => {
    return (
        <div className="p-4 flex items-center flex-col bg-neo-expanded w-72">
            <AttachmentChat {...args} />
        </div>
    );
};

export const Default: ComponentStory<typeof AttachmentChat> = Template.bind({});
Default.args = {
    attachmentId: "attachment ID",
    content: "ceci_est_un_jpeg.jpeg",
    bgColor: "bg-neo-bg-B",
    downloadCallback: downloadStory,
    deleteCallback: deleteStory,
};
