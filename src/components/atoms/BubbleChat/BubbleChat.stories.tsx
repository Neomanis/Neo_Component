/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import BubbleChat from "./BubbleChat";

export default {
    component: BubbleChat,
    title: "Atoms/Chat/BubbleChat",
} as Meta;

const Template: ComponentStory<typeof BubbleChat> = (args) => {
    return <BubbleChat {...args} />;
};

export const Default: ComponentStory<typeof BubbleChat> = Template.bind({});
Default.args = {
    bgColor: "bg-neo-bg-B",
    content: "I am more monster than man.",
};

export const Bot: ComponentStory<typeof BubbleChat> = Template.bind({});
Bot.args = {
    border: "border-white",
    content: "I've been really busy being dead. You know, after you MURDERED ME.",
};

export const WithLink: ComponentStory<typeof BubbleChat> = Template.bind({});
WithLink.args = {
    bgColor: "bg-neo-bg-B",
    content:
        "Regarde cette question : https://mortis.neomanis.bzh/technical-questions/64108b9f45cc87da8ae3a0dc et sinon tu peux toujours google.com",
};
