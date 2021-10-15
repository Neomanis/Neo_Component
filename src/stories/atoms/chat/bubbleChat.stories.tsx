import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { BubbleChat } from "../../..";

export default {
    component: BubbleChat,
    title: "Atoms/Chat/BubbleChat",
} as Meta;

const Template: ComponentStory<typeof BubbleChat> = (args) => {
    return (
        <div className="p-4 flex items-center w-1/4 bg-neo_blue">
            <BubbleChat {...args} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    bgColor: "bg-neo_blue-modal",
    content: "I am more monster than man.",
    date: "2020-09-28",
    name: "Alexei Stukov",
};

export const Bot = Template.bind({});
Bot.args = {
    border: true,
    content: "I've been really busy being dead. You know, after you MURDERED ME.",
    date: "2020-09-28",
    name: "Glados ",
};
