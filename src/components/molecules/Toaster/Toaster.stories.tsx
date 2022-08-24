/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import Toaster from "./Toaster";

export default {
    component: Toaster,
    title: "Molecules/Toaster",
} as Meta;

const Template: ComponentStory<typeof Toaster> = (args) => {
    return <Toaster {...args} />;
};

export const Default: ComponentStory<typeof Toaster> = Template.bind({});
Default.args = {
    closable: false,
    data: "Ticket updated ! This page will be refresh ...",
    dataClassName: "text-xs",
    emotion: "happy",
    fCallBackCancel: () => console.log("CANCELED!"),
    fCallBackRefresh: () => console.log("REFRESH!"),
    refreshing: true,
    refreshDuration: 5,
    title: "",
    titleClassName: "font-semibold",
};

export const ToasterSad: ComponentStory<typeof Toaster> = Template.bind({});
ToasterSad.args = {
    closable: true,
    data: "Something went wrong, please try again.",
    dataClassName: "text-xs",
    emotion: "sad",
    fCallBackCancel: () => console.log("CANCELED!"),
    fCallBackRefresh: () => console.log("REFRESH!"),
    refreshing: false,
    refreshDuration: 5,
    title: "Oh no...",
    titleClassName: "font-semibold",
};
