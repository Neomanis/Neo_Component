/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import BubbleChat from "./BubbleChat";
import { MessageType } from "@neomanis/neo-types";

export default {
    component: BubbleChat,
    title: "Atoms/Chat/BubbleChat",
} as Meta;

function downloadStory(attachmentId: string): void {
    console.log("download attachement " + attachmentId);
}

function deleteStory(attachmentId: string): void {
    console.log("delete attachement " + attachmentId);
}

const Template: ComponentStory<typeof BubbleChat> = (args) => {
    return (
        <div className="p-4 flex items-center flex-col bg-neo-expanded w-80">
            <div className="w-full">
                <BubbleChat {...args} />
            </div>
        </div>
    );
};

export const Default: ComponentStory<typeof BubbleChat> = Template.bind({});
Default.args = {
    attachmentId: "attachment ID",
    content: "ceci_est_un_jpeg.jpeg",
    bgColor: "bg-neo-bg-B",
    downloadCallback: downloadStory,
    deleteCallback: deleteStory,
    type: MessageType.MESSAGE,
};

export const Readonly: ComponentStory<typeof BubbleChat> = Template.bind({});
Readonly.args = {
    attachmentId: "attachment ID",
    content: "ceci_est_un_jpeg.jpeg",
    bgColor: "bg-neo-bg-B",
    downloadCallback: downloadStory,
    deleteCallback: deleteStory,
    readOnly: true,
    type: MessageType.ATTACHMENT,
};

export const Deleted: ComponentStory<typeof BubbleChat> = Template.bind({});
Deleted.args = {
    attachmentId: "attachment ID",
    content: "ceci_est_un_jpeg.jpeg",
    bgColor: "bg-neo-bg-B",
    downloadCallback: downloadStory,
    deleteCallback: deleteStory,
    deleteDate: "04/14/2023",
    isValidate: true,
    readOnly: true,
    type: MessageType.ATTACHMENT,
};

export const Attachment: ComponentStory<typeof BubbleChat> = Template.bind({});
Attachment.args = {
    attachmentId: "attachment ID",
    content: "ceci_est_un_jpegtrestresloooonnnnng.jpeg",
    bgColor: "bg-neo-bg-B",
    downloadCallback: downloadStory,
    deleteCallback: deleteStory,
    readOnly: false,
    type: MessageType.ATTACHMENT,
};

export const WithLink: ComponentStory<typeof BubbleChat> = Template.bind({});
WithLink.args = {
    bgColor: "bg-neo-bg-B",
    content:
        "Regarde cette question : https://mortis.neomanis.bzh/technical-questions/64108b9f45cc87da8ae3a0dc et sinon tu peux toujours google.com",
};

export const WithTicketId: ComponentStory<typeof BubbleChat> = Template.bind({});
WithTicketId.args = {
    bgColor: "bg-neo-bg-B",
    content:
        "Le ticket [TRI] INC 212 a été créé, un technicien reviendra vers vous dès que possible. Et pour le plaisir tiens ça ressemble à lui: [RIT] DEM 666",
};
