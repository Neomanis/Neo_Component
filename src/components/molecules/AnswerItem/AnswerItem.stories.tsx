/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import AnswerItem from "./AnswerItem";
import { NeoUser } from "@neomanis/neo-types";

export default {
    component: AnswerItem,
    title: "Molecules/TechnicalQuestion/AnswerItem",
} as Meta;

const Template: ComponentStory<typeof AnswerItem> = (args) => {
    return <AnswerItem {...args} />;
};

export const Default: ComponentStory<typeof AnswerItem> = Template.bind({});
Default.args = {
    acceptAnswer: () => console.log("yo"),
    isAccepted: false,
    creationDate: "2021-11-10T15:21:13.856Z",
    authorLevel: "Level 1",
    author: { neoId: 78, name: "testName" } as NeoUser,
    questionAuthorNeoId: 3,
    connectedUserNeoId: 78,
    id: 1,
    text: "Insult me again, brother, and theoretically I will punch you in your practical face.",
    updateAnswer: () => console.log("yo"),
    upvote: () => console.log("yo"),
    upvoters: [78, 7],
};
