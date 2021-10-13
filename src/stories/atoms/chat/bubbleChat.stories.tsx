import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { BubbleChat } from "../../..";

export default {
    title: "Atoms/Chat/BubbleChat",
    component: BubbleChat,
} as Meta;

const Template: ComponentStory<typeof BubbleChat> = (args) => {
    return (
        <div className="p-4 flex items-center w-1/4">
            <BubbleChat {...args} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    name: "Stest Supervisor",
    date: "2020-09-28",
    content: 'content msg "Hello NeoBotlltlgtrlgrtel zgrlte glrelzg relz lrglrleglrel grle lgrel lgregrleglrelgrle !"',
    bgColor: "bg-neo_blue-modal",
};

export const Bot = Template.bind({});
Bot.args = {
    name: "BOT",
    date: "2020-09-28",
    content: 'content msg "Hello NeoBotlltlgtrlgrtel zgrlte glrelzg relz lrglrleglrel grle lgrel lgregrleglrelgrle !"',
    border: true,
};
