import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { InputChat } from "../../..";

export default {
    title: "Molecules/Chat/InputChat",
    component: InputChat,
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
