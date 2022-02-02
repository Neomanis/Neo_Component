import React from "react";
import SimilarTicket from "../../../components/molecules/ticket/similarTicket";
import { ComponentStory, Meta } from "@storybook/react";
import { fakeTicket } from "../../fakeObject";
import { i18n } from "../../../i18n";

export default {
    title: "Molecules/Ticket/SimilarTicket",
    component: SimilarTicket,
} as Meta;

const Template: ComponentStory<typeof SimilarTicket> = (args) => {
    return (
        <div className="w-full h-96 flex items-center justify-center bg-neo-bg-A">
            <div className="w1/2">
                <SimilarTicket {...args} languageUser={i18n.language} />
            </div>
        </div>
    );
};

export const SimilarTicketDefault = Template.bind({});
SimilarTicketDefault.args = {
    ticket: fakeTicket,
};
