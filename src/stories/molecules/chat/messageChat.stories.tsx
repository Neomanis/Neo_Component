import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { MessageChat } from "../../..";

export default {
    title: "Molecules/Chat/MessageChat",
    component: MessageChat,
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
    date: "12:12",
    content: "BURN BABY BURN!",
    name: "Ragnaros The Firelord",
};
