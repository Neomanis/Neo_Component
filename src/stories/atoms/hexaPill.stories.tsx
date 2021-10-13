import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { HexaPill } from "../..";

export default {
    title: "Atoms/HexaPill",
    component: HexaPill,
    argTypes: {
        ticketNumber: {
            description: "Ticket id",
        },
        ticketPriority: {
            description: "Can go from 1 to 6",
        },
    },
} as Meta;

const Template: ComponentStory<typeof HexaPill> = (args) => {
    return (
        <div className="bg-neo_black-black_1 p-2 flex items-center w-16">
            <HexaPill {...args} />
        </div>
    );
};

export const HexaPillDefault = Template.bind({});
HexaPillDefault.args = {
    ticketNumber: 7,
    color: "#7FEF7F",
};
