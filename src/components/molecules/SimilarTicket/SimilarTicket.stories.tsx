/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { fakeTicket } from "@/utils/storiesData/fakeObject";

import SimilarTicket from "./SimilarTicket";

export default {
    component: SimilarTicket,
    title: "Molecules/Ticket/SimilarTicket",
} as Meta;

const Template: ComponentStory<typeof SimilarTicket> = (args) => {
    return (
        <div className="w-full h-96 flex items-center justify-center bg-neo-bg-A">
            <div className="w1/2">
                <SimilarTicket {...args} />
            </div>
        </div>
    );
};

export const Default: ComponentStory<typeof SimilarTicket> = Template.bind({});
Default.args = {
    ticket: fakeTicket,
};
