import React from "react";
import SimilarTicket from "../../../components/molecules/ticket/similarTicket";
import { ComponentStory, Meta } from "@storybook/react";
import { fakeTicket } from "../../fakeObject";

export default {
    title: "Molecules/Ticket/SimilarTicket",
    component: SimilarTicket,
} as Meta;

const Template: ComponentStory<typeof SimilarTicket> = (args) => {
    return (
        <div className="w-full p-4 bg-neo_blue-modal">
            <SimilarTicket {...args} />
        </div>
    );
};

export const SimilarTicketDefault = Template.bind({});
SimilarTicketDefault.args = {
    ticket: fakeTicket,
};
