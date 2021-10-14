import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import ChatCard from "../../../components/molecules/chat/chatCard";

export default {
    title: "Molecules/Chat/ChatCard",
    component: ChatCard,
} as Meta;

const Template: ComponentStory<typeof ChatCard> = (args) => <ChatCard {...args} />;

export const Dropdown = Template.bind({});
Dropdown.args = {
    // eslint-disable-next-line no-console
    fCallBack: () => console.log("ok"),
    type: "dropdown",
    message: "Please choose a category",
    placeholder: "Select a category ...",
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
};

export const SingleChoice = Template.bind({});
SingleChoice.args = {
    // eslint-disable-next-line no-console
    fCallBack: () => console.log("ok"),
    type: "single-choice",
    message: "Please choose one of the following option",
    placeholder: "Select ...",
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
};
