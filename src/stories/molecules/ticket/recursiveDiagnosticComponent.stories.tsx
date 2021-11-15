/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { fakeDiag } from "../../fakeObject";
import { i18n } from "../../../i18n";
import RecursiveDiagnosticComponent from "../../../components/molecules/ticket/recursiveDiagnosticComponent";

export default {
    component: RecursiveDiagnosticComponent,
    title: "Molecules/Ticket/RecursiveDiagnosticComponent",
} as Meta;

const Template: ComponentStory<typeof RecursiveDiagnosticComponent> = () => {
    return (
        <div className="bg-neo_blue p-4">
            {fakeDiag.diagnostics.map((it) => (
                <RecursiveDiagnosticComponent
                    name={it.name}
                    executionTime={it.diagExecutionTime}
                    results={it.results}
                    languageUser={i18n.language}
                />
            ))}
        </div>
    );
};

export const Default = Template.bind({});
