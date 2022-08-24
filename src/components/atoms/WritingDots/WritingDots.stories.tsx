/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import WritingDots from "./WritingDots";

export default {
    component: WritingDots,
    title: "Atoms/Chat/WritingDots",
} as Meta;

const Template: ComponentStory<typeof WritingDots> = (args) => {
    return <WritingDots {...args} />;
};

export const Default: ComponentStory<typeof WritingDots> = Template.bind({});
Default.args = {
    animation: "animate-pulseDots",
    className: "",
    delay: 250,
    dotClassName: "",
};
