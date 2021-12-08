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
        <div className="p-4 bg-neo-bg-B">
            <SimilarTicket {...args} languageUser={i18n.language} />
        </div>
    );
};

export const SimilarTicketDefault = Template.bind({});
SimilarTicketDefault.args = {
    ticket: fakeTicket,
};
