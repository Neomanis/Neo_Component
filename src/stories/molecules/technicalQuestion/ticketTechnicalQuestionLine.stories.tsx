/* eslint-disable no-console */
import React from "react";
import { TicketTechnicalQuestionLine } from "../../..";
import { ComponentStory, Meta } from "@storybook/react";

export default {
    title: "Molecules/TechnicalQuestion/TicketTechnicalQuestionLine",
    component: TicketTechnicalQuestionLine,
} as Meta;

const Template: ComponentStory<typeof TicketTechnicalQuestionLine> = (args) => {
    return (
        <div className="">
            <TicketTechnicalQuestionLine {...args} />
        </div>
    );
};

export const TechnicalQuestionDefault = Template.bind({});
TechnicalQuestionDefault.args = {
    answersNumber: 42,
    openTechnicalQuestion: () => console.log("yo"),
    solved: true,
    title: "No rat shall survive… burn them all to honor Hashut!",
};
