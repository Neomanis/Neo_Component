/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import TechnicalQuestionItem from "./TechnicalQuestionItem";

export default {
    component: TechnicalQuestionItem,
    title: "Molecules/TechnicalQuestion/TechnicalQuestionItem",
} as Meta;

const Template: ComponentStory<typeof TechnicalQuestionItem> = (args) => {
    return <TechnicalQuestionItem {...args} />;
};

export const Default: ComponentStory<typeof TechnicalQuestionItem> = Template.bind({});
Default.args = {
    answerAmount: 7,
    createDate: "2021-11-15T13:34:48.551Z",
    id: 2,
    isSelected: false,
    openTechnicalQuestion: () => console.log("yo"),
    solved: true,
    ticket: {
        uid: "[GL1]-INC-666",
        priority: 1,
        status: 5,
        id: 1,
    },
    title: "You strive for victory",
};

export const TechnicalQuestionItemTicketNull = Template.bind({});
TechnicalQuestionItemTicketNull.args = {
    answerAmount: 1,
    createDate: "2021-11-15T13:34:48.551Z",
    id: 2,
    isSelected: false,
    openTechnicalQuestion: () => console.log("yo"),
    solved: true,
    ticket: undefined,
    title: "You strive for victory",
};
