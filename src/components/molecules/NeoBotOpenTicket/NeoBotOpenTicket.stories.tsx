/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import NeoBotOpenTicket from "./NeoBotOpenTicket";

export default {
    component: NeoBotOpenTicket,
    title: "Molecules/NeoBotOpenTicket",
} as Meta;

const Template: ComponentStory<typeof NeoBotOpenTicket> = (args) => {
    return <NeoBotOpenTicket {...args} />;
};

export const Default: ComponentStory<typeof NeoBotOpenTicket> = Template.bind({});
Default.args = {
    className: "",
    message: "Creating a new ticket",
    showEllipsis: true,
};
