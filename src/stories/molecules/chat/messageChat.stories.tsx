import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { MessageChat } from "../../..";

export default {
    component: MessageChat,
    title: "Molecules/Chat/MessageChat",
} as Meta;

const Template: ComponentStory<typeof MessageChat> = (args) => {
    return (
        <div className="p-4 flex items-center w-1/4">
            <MessageChat {...args} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    content: "BURN BABY BURN!",
    date: "12:12",
    name: "Ragnaros The Firelord",
};
