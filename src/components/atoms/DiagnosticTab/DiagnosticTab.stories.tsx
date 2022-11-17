/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import DiagnosticTab from "./DiagnosticTab";
import { DiagnosticResult } from "@neomanis/neo-types";

export default {
    component: DiagnosticTab,
    title: "Atoms/DiagnosticTab",
} as Meta;

const Template: ComponentStory<typeof DiagnosticTab> = (args) => {
    return <DiagnosticTab {...args} />;
};

export const Default: ComponentStory<typeof DiagnosticTab> = Template.bind({});
Default.args = {
    name: "DiagnosticTab",
    diagResult: DiagnosticResult.Solved,
    isSelected: false,
    onClick: (runId) => console.log(runId),
    runId: "1234128673",
};

export const Selected: ComponentStory<typeof DiagnosticTab> = Template.bind({});
Selected.args = {
    name: "DiagnosticTab-Selected",
    diagResult: DiagnosticResult.Awaiting,
    isSelected: true,
    onClick: (runId) => console.log(runId),
    runId: "1234128673",
};
