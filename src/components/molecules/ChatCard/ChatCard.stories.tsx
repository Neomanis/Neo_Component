/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import ChatCard from "./ChatCard";

export default {
    component: ChatCard,
    title: "Molecules/Chat/ChatCard",
} as Meta;

const Template: ComponentStory<typeof ChatCard> = (args) => {
    return <ChatCard {...args} />;
};

export const Default: ComponentStory<typeof ChatCard> = Template.bind({});
Default.args = {
    data: [
        {
            label: "Network",
            value: 1,
        },
        {
            label: "Printer",
            value: 2,
        },
        {
            label: "Telephony",
            value: 3,
        },
    ],
    fCallBack: () => console.log("ok"),
};
