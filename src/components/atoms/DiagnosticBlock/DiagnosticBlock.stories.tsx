/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import DiagnosticBlock from "./DiagnosticBlock";

export default {
    component: DiagnosticBlock,
    title: "Atoms/DiagnosticBlock",
} as Meta;

const Template: ComponentStory<typeof DiagnosticBlock> = (args) => {
    return (
        <div className="w-full p-4 rounded bg-neo-bg-A">
            <DiagnosticBlock {...args} />
        </div>
    );
};

export const DefaultBook: ComponentStory<typeof DiagnosticBlock> = Template.bind({});
DefaultBook.args = {
    book: {
        name: "Book Name",
        lastElement: {},
        isAwaiting: false,
        isError: false,
    },
};
export const DefaultError: ComponentStory<typeof DiagnosticBlock> = Template.bind({});
DefaultError.args = {
    Error: {
        message: "Error Name",
        code: 404,
        runId: "1664376143263",
    },
};

export const DefaultAction: ComponentStory<typeof DiagnosticBlock> = Template.bind({});
DefaultAction.args = {
    Action: {
        description: "Action description",
        id: 1,
        date: new Date(),
        executionTime: 496,
        result: "OK",
    },
};
export const DefaultAwaiting: ComponentStory<typeof DiagnosticBlock> = Template.bind({});
DefaultAwaiting.args = {
    Awaiting: {
        description: "Awaiting description",
    },
};

export const DefaultExit: ComponentStory<typeof DiagnosticBlock> = Template.bind({});
DefaultExit.args = {
    Exit: {
        id: 456,
        type: "escalate",
        action: "Action Exit",
        position: { y: 110, x: 100 },
        isLocked: false,
    },
};
