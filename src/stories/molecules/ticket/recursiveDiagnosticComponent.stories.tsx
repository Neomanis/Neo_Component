/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { fakeDiag, fakeDiag2 } from "../../fakeObject";
import { i18n } from "../../../i18n";
import RecursiveDiagnosticComponent from "../../../components/molecules/ticket/recursiveDiagnosticComponent";

export default {
    component: RecursiveDiagnosticComponent,
    title: "Molecules/Ticket/RecursiveDiagnosticComponent",
} as Meta;

const Template: ComponentStory<typeof RecursiveDiagnosticComponent> = () => {
    const awaiting =
        fakeDiag.awaiting.length > 0
            ? fakeDiag.awaiting[fakeDiag.awaiting.length - 1].bookNames[
                  fakeDiag.awaiting[fakeDiag.awaiting.length - 1].bookNames.length - 1
              ]
            : "";
    // second object in order to test awaiting state
    // const awaiting2 =
    //     fakeDiag2.awaiting.length > 0
    //         ? fakeDiag2.awaiting[fakeDiag2.awaiting.length - 1].bookNames[
    //               fakeDiag2.awaiting[fakeDiag2.awaiting.length - 1].bookNames.length - 1
    //           ]
    //         : "";
    return (
        <div className="bg-neo_blue p-4">
            {fakeDiag.diagnostics.map((it) => (
                <RecursiveDiagnosticComponent
                    name={it.name}
                    executionTime={it.diagExecutionTime}
                    results={it.results}
                    languageUser={i18n.language}
                    awaiting={awaiting}
                />
            ))}
        </div>
    );
};

export const Default = Template.bind({});
