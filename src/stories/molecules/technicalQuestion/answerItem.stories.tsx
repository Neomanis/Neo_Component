/* eslint-disable no-console */
import React from "react";
import { AnswerItem } from "../../../components/molecules";
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
    isAccepted: false,
    creationDate: "2021-11-10T15:21:13.856Z",
    authorLevel: "Level 1",
    author: "Lion El'Jonson",
    questionAuthor: "Fulgrim",
    connectedUserUid: "Lion El'Jonson",
    id: 1,
    text: "Insult me again, brother, and theoretically I will punch you in your practical face.",
    updateAnswer: () => console.log("yo"),
    upvote: () => console.log("yo"),
    upvoters: ["Fulgrim", "Lion El'Jonson"],
};
