import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { MessageChat } from "../../../components/molecules";

export default {
    component: MessageChat,
    title: "Molecules/Chat/MessageChat",
} as Meta;

const Template: ComponentStory<typeof MessageChat> = (args) => {
    return (
        <div className="p-4 flex items-center flex-col bg-neo-expanded w-72">
            <MessageChat {...args} isMe={true} />
            <MessageChat {...args} />
            <MessageChat {...args} isMe={true} />
            <MessageChat {...args} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    content: "BURN BABY BURN!",
    date: "12:12",
    name: "Ragnaros The Firelord",
    isMe: true,
};
export const DefaultDot = Template.bind({});
DefaultDot.args = {
    content: "BURN BABY BURN! fdksfkdskqfkdksq kfdksqk dfk fkdskqfkd f kkfdsqk fkdskfks",
    date: "12:12",
    name: "Ragnaros The Firelord",
};
