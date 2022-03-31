/* eslint-disable no-console */
import React from "react";
import { TechnicalQuestionItem } from "../../../components/molecules";

import { ComponentStory, Meta } from "@storybook/react";

export default {
    title: "Molecules/TechnicalQuestion/TechnicalQuestionItem",
    component: TechnicalQuestionItem,
} as Meta;

const Template: ComponentStory<typeof TechnicalQuestionItem> = (args) => {
    return (
        <div className="">
            <TechnicalQuestionItem {...args} />
        </div>
    );
};

export const TechnicalQuestionItemDefault = Template.bind({});
TechnicalQuestionItemDefault.args = {
    createDate: "2021-11-15T13:34:48.551Z",
    createLevel: "Level 1",
    createUser: "Leman Russ",
    followed: false,
    followTechnicalQuestion: () => console.log("hey"),
    id: 2,
    isSelected: false,
    openTechnicalQuestion: () => console.log("yo"),
    solved: true,
    ticketId: 666,
    ticketPriority: 4,
    title: "You strive for victory",
};
