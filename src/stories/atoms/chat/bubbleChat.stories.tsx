import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { BubbleChat } from "../../..";

export default {
    title: "Atoms/Chat/BubbleChat",
    component: BubbleChat,
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
    name: "Alexei Stukov",
    date: "2020-09-28",
    content: "I am more monster than man.",
    bgColor: "bg-neo_blue-modal",
};

export const Bot = Template.bind({});
Bot.args = {
    name: "Glados ",
    date: "2020-09-28",
    content: "I've been really busy being dead. You know, after you MURDERED ME.",
    border: true,
};
