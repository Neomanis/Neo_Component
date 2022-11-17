/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import DiagnosticComponent from "./DiagnosticComponent";
import { fakeAwaitingDiag, fakeDiag, fakeDiagChild, fakeDiagError } from "@/utils/storiesData/fakeObject";

export default {
    component: DiagnosticComponent,
    title: "Molecules/DiagnosticComponent",
} as Meta;

const Template: ComponentStory<typeof DiagnosticComponent> = (args) => {
    return (
        <div className="bg-neo-bg-A p-4 w-full rounded">
            <DiagnosticComponent {...args} />
        </div>
    );
};

export const Default: ComponentStory<typeof DiagnosticComponent> = Template.bind({});
Default.args = {
    diagnostic: fakeDiag.diagnostics[0],
    redirectUrl: "/url",
    navigate: (url, state) => console.log(url, state.state),
};

export const DiagError: ComponentStory<typeof DiagnosticComponent> = Template.bind({});
DiagError.args = {
    diagnostic: fakeDiagError.diagnostics[0],
    redirectUrl: "/url",
    navigate: (url, state) => console.log(url, state.state),
};
export const DiagAwaiting: ComponentStory<typeof DiagnosticComponent> = Template.bind({});
DiagAwaiting.args = {
    diagnostic: fakeAwaitingDiag.diagnostics[0],
    awaiting: fakeAwaitingDiag.awaiting[fakeAwaitingDiag.awaiting.length - 1],
    redirectUrl: "/url",
    navigate: (url, state) => console.log(url, state.state),
};
export const DiagChild: ComponentStory<typeof DiagnosticComponent> = Template.bind({});
DiagChild.args = {
    diagChild: fakeDiagChild,
    redirectUrl: "/url",
    navigate: (url, state) => console.log(url, state.state),
};
