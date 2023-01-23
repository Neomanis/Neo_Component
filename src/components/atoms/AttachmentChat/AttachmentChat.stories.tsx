/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import AttachmentChat from "./AttachmentChat";

export default {
    component: AttachmentChat,
    title: "Atoms/Chat/AttachmentChat",
} as Meta;

const Template: ComponentStory<typeof AttachmentChat> = (args) => {
    return <AttachmentChat {...args} />;
};

export const Default: ComponentStory<typeof AttachmentChat> = Template.bind({});
Default.args = {
    content: "ceci_est_un_jpeg.jpeg",
    bgColor: "bg-neo-bg-B",
};
