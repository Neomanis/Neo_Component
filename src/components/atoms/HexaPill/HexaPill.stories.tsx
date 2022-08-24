/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import HexaPill from "./HexaPill";

export default {
    component: HexaPill,
    title: "Atoms/HexaPill",
} as Meta;

const Template: ComponentStory<typeof HexaPill> = (args) => {
    return <HexaPill {...args} />;
};

export const Default: ComponentStory<typeof HexaPill> = Template.bind({});
Default.args = {
    color: "#7FEF7F",
    ticketUid: "1gl-5462-INC",
};
