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
        <div className="bg-neo-bg-A p-3 flex items-center" style={{ width: "300px" }}>
            <Toaster {...args} />
        </div>
    );
};

export const ToasterDefault = Template.bind({});
ToasterDefault.args = {
    className: "",
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

export const ToasterSad = Template.bind({});
ToasterSad.args = {
    className: "",
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
