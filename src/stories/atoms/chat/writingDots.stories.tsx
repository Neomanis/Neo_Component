import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import WritingDots from "../../../components/atoms/chat/writingDots";

export default {
    component: WritingDots,
    title: "Atoms/Chat/WritingDots",
} as Meta;

const Template: ComponentStory<typeof WritingDots> = (args) => {
    return (
        <div className="p-4 flex items-center w-1/4 bg-neo-expanded">
            <WritingDots {...args} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {};
