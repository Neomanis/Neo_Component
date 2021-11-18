/* eslint-disable no-console */
import React from "react";
import { AnswerItem } from "../../..";
import { ComponentStory, Meta } from "@storybook/react";

export default {
    title: "Molecules/TechnicalQuestion/AnswerItem",
    component: AnswerItem,
} as Meta;

const Template: ComponentStory<typeof AnswerItem> = (args) => {
    return (
        <div className="">
            <AnswerItem {...args} />
        </div>
    );
};

export const AnswerItemDefault = Template.bind({});
AnswerItemDefault.args = {
    acceptAnswer: () => console.log("yo"),
    accepted: false,
    createDate: "18/11/2021 09:23",
    createLevel: "Level 1",
    createUser: "Lion El'Jonson",
    createUserQuestion: "Fulgrim",
    id: 1,
    isQuestionSolved: false,
    text: "Insult me again, brother, and theoretically I will punch you in your practical face.",
    updateAnswer: () => console.log("yo"),
    upvote: () => console.log("yo"),
    upvoters: ["Fulgrim"],
};
