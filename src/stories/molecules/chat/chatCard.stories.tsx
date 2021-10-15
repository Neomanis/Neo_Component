/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { ChatCard } from "../../..";

export default {
    component: ChatCard,
    title: "Molecules/Chat/ChatCard",
} as Meta;

const Template: ComponentStory<typeof ChatCard> = (args) => <ChatCard {...args} />;

export const Dropdown = Template.bind({});
Dropdown.args = {
    datas: [
        {
            label: "Network",
            value: "network",
        },
        {
            label: "Printer",
            value: "printer",
        },
        {
            label: "Telephony",
            value: "telephony",
        },
    ],
    fCallBack: () => console.log("ok"),
    message: "Please choose a category",
    placeholder: "Select a category ...",
    type: "dropdown",
};

export const SingleChoice = Template.bind({});
SingleChoice.args = {
    datas: [
        {
            label: "Network",
            value: "network",
        },
        {
            label: "Printer",
            value: "printer",
        },
        {
            label: "Telephony",
            value: "telephony",
        },
        {
            label: "System",
            value: "System",
        },
    ],
    fCallBack: () => console.log("ok"),
    message: "Please choose one of the following option",
    placeholder: "Select ...",
    type: "single-choice",
};
