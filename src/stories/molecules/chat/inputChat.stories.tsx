import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { InputChat } from "../../..";

export default {
    component: InputChat,
    title: "Molecules/Chat/InputChat",
} as Meta;

const Template: ComponentStory<typeof InputChat> = (args) => {
    return (
        <div className="p-4 flex items-center w-1/4">
            <InputChat {...args} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {};
