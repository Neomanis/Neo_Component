/* eslint-disable no-console */
import React, { useState } from "react";
import { ComponentStory, Meta } from "@storybook/react";

import TechnicalQuestionItem from "./TechnicalQuestionItem";
import { Button } from "@/components/atoms";

export default {
    component: TechnicalQuestionItem,
    title: "Molecules/TechnicalQuestion/TechnicalQuestionItem",
} as Meta;

const Template: ComponentStory<typeof TechnicalQuestionItem> = (args) => {
    return <TechnicalQuestionItem {...args} />;
};
const fakePartialTicket = {
    uid: "[GL1]-INC-666",
    priority: 4,
    status: 2,
    id: 1,
};

const TemplateList: ComponentStory<typeof TechnicalQuestionItem> = (args) => {
    const [selectedQuestion, setSelectedQuestion] = useState<number>(2);

    return (
        <div className="flex flex-row items-center">
            <div>
                <TechnicalQuestionItem
                    id={1}
                    solved={true}
                    selectedQuestion={selectedQuestion}
                    openTechnicalQuestion={() => setSelectedQuestion(1)}
                    ticket={fakePartialTicket}
                    {...args}
                />
                <TechnicalQuestionItem
                    id={2}
                    solved={false}
                    selectedQuestion={selectedQuestion}
                    openTechnicalQuestion={() => setSelectedQuestion(2)}
                    ticket={undefined}
                    {...args}
                />
                <TechnicalQuestionItem
                    id={3}
                    solved={true}
                    selectedQuestion={selectedQuestion}
                    openTechnicalQuestion={() => setSelectedQuestion(3)}
                    ticket={fakePartialTicket}
                    {...args}
                />
            </div>
            <Button className="h-10" onClick={() => setSelectedQuestion(undefined)}>
                No selection
            </Button>
        </div>
    );
};

export const Default: ComponentStory<typeof TechnicalQuestionItem> = Template.bind({});
Default.args = {
    answerAmount: 7,
    createDate: "2023-01-02T13:34:48.551Z",
    id: 2,
    openTechnicalQuestion: () => console.log("yo"),
    solved: true,
    ticket: {
        uid: "[GL1]-INC-666",
        priority: 4,
        status: 2,
        id: 1,
    },
    title: "You strive for victory",
};

export const TicketNull = Template.bind({});
TicketNull.args = {
    answerAmount: 1,
    createDate: "2023-02-04T13:34:48.551Z",
    id: 2,
    openTechnicalQuestion: () => console.log("yo"),
    solved: false,
    ticket: undefined,
    title: "You strive for victory",
};

export const QuestionSelection = TemplateList.bind({});
QuestionSelection.args = {
    answerAmount: 3,
    createDate: "2023-02-04T13:34:48.551Z",
    title: "You strive for victory",
};
