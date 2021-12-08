/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { ChatCard } from "../../../components/molecules";

export default {
    component: ChatCard,
    title: "Molecules/Chat/ChatCard",
} as Meta;

const Template: ComponentStory<typeof ChatCard> = (args) => (
    <div className="w-72">
        <ChatCard {...args} />
    </div>
);

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
    title: "Please choose a category",
    placeholder: "Select a category ...",
    type: "dropdown",
};

export const SingleChoice = Template.bind({});
SingleChoice.args = {
    datas: [
        {
            label: "Some network information",
            value: "network",
        },
        {
            label: "Some very long printer informartion that are not usefull and can be very boring",
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
    title: "Please choose one of the following options",
    placeholder: "Select ...",
    type: "single-choice",
};
