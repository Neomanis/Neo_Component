/* eslint-disable no-console */
import React from "react";
import { TechnicalQuestionItem } from "../../..";

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
    content: "We do not seek your confession, only your torment.",
    createDate: "18/11/2021 09:23",
    createLevel: "Level 1",
    createUser: "Leman Russ",
    followed: false,
    followTechnicalQuestion: () => console.log("hey"),
    id: 2,
    openTechnicalQuestion: () => console.log("yo"),
    solved: true,
    ticketId: 666,
    title: "You strive for victory",
};
