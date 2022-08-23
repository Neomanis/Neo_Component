/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import TicketTechnicalQuestionLine from "./TicketTechnicalQuestionLine";

export default {
    component: TicketTechnicalQuestionLine,
    title: "Molecules/TechnicalQuestion/TicketTechnicalQuestionLine",
} as Meta;

const Template: ComponentStory<typeof TicketTechnicalQuestionLine> = (args) => {
    return <TicketTechnicalQuestionLine {...args} />;
};

export const Default: ComponentStory<typeof TicketTechnicalQuestionLine> = Template.bind({});
Default.args = {
    answersNumber: 0,
    openTechnicalQuestion: () => console.log("yo"),
    solved: false,
    title: "No rat shall survive… burn them all to honor Hashut!",
};
