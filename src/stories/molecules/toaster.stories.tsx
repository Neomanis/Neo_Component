/* eslint-disable no-console */
import React from "react";
import Toaster from "../../components/molecules/toaster";
import { ComponentStory, Meta } from "@storybook/react";

export default {
    title: "Molecules/Toaster",
    component: Toaster,
} as Meta;

const Template: ComponentStory<typeof Toaster> = (args) => {
    return (
        <div className="bg-neo-bg-A p-10 flex items-center">
            <Toaster {...args} />
        </div>
    );
};

export const ToasterDefault = Template.bind({});
ToasterDefault.args = {
    className: "",
    closable: false,
    data: "Ticket updated ! This page will be refresh ...",
    emotion: "happy",
    fCallBackCancel: () => console.log("CANCELED!"),
    fCallBackRefresh: () => console.log("REFRESH!"),
    refreshing: true,
    refreshDuration: 5,
    title: "",
};

export const ToasterSad = Template.bind({});
ToasterSad.args = {
    className: "",
    closable: true,
    data: "Something went wrong, please try again.",
    emotion: "sad",
    fCallBackCancel: () => console.log("CANCELED!"),
    fCallBackRefresh: () => console.log("REFRESH!"),
    refreshing: false,
    refreshDuration: 5,
    title: "Oh no...",
};