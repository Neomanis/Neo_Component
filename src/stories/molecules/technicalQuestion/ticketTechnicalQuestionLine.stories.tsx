/* eslint-disable no-console */
import React from "react";
import { TicketTechnicalQuestionLine } from "../../../components/molecules/";
import { ComponentStory, Meta } from "@storybook/react";

export default {
    title: "Molecules/TechnicalQuestion/TicketTechnicalQuestionLine",
    component: TicketTechnicalQuestionLine,
} as Meta;

const Template: ComponentStory<typeof TicketTechnicalQuestionLine> = (args) => {
    return (
        <div className="w-1/2 p-4 bg-neo-bg-A">
            <TicketTechnicalQuestionLine {...args} />
        </div>
    );
};

export const TechnicalQuestionDefault = Template.bind({});
TechnicalQuestionDefault.args = {
    answersNumber: 0,
    openTechnicalQuestion: () => console.log("yo"),
    solved: false,
    title: "No rat shall survive… burn them all to honor Hashut!",
};
