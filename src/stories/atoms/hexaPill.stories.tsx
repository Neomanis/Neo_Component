import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { HexaPill } from "../..";

export default {
    argTypes: {
        ticketNumber: {
            description: "Ticket id",
        },
        ticketPriority: {
            description: "Can go from 1 to 6",
        },
    },
    component: HexaPill,
    title: "Atoms/HexaPill",
} as Meta;

const Template: ComponentStory<typeof HexaPill> = (args) => {
    return (
        <div className=" bg-neo-bg-A p-2 flex items-center justify-center w-full h-screen">
            <HexaPill {...args} />
        </div>
    );
};

export const HexaPillDefault = Template.bind({});
HexaPillDefault.args = {
    color: "#7FEF7F",
    ticketUid: "1gl-5462-INC",
};
