/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import RecursiveDiagnosticComponent from "./RecursiveDiagnosticComponent";
import { fakeDiag2 } from "@/utils/storiesData/fakeObject";

export default {
    component: RecursiveDiagnosticComponent,
    title: "Molecules/RecursiveDiagnosticComponent",
} as Meta;

const Template: ComponentStory<typeof RecursiveDiagnosticComponent> = () => {
    const awaiting = fakeDiag2.awaiting.length > 0 && fakeDiag2.awaiting[fakeDiag2.awaiting.length - 1];
    return (
        <div className="bg-neo-bg-B p-4">
            {fakeDiag2.diagnostics.map((diag) => {
                const arrayKeys: string[] = Object.keys(diag);
                const exclusions = ["results", "diagExecutionTime", "name", "runId"];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const dataObj = arrayKeys.reduce<any[]>((acc, curVal): any[] => {
                    if (!exclusions.includes(curVal)) {
                        acc.push({ [curVal]: Reflect.get(diag, curVal) });
                    }
                    return acc;
                }, []);
                if (diag.runId === awaiting.runId) {
                    // we will insert a fake "action" to display it at the right position
                    insertApproval(awaiting.bookNames.slice(1), awaiting.currentChapter.desc, diag.results);
                }
                return (
                    <RecursiveDiagnosticComponent
                        name={diag.name}
                        executionTime={diag.diagExecutionTime}
                        results={diag.results}
                        diagDataKeys={dataObj}
                        redirectTo={() => console.log("redirectTo")}
                    />
                );
            })}
        </div>
    );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function insertApproval(booknames: string[], description: string, results: any[]) {
    if (booknames.length > 0) {
        const bookResults = results.find((result) => result.name === booknames[0]).results;
        insertApproval(booknames.slice(1), description, bookResults);
    } else {
        // we will add only if Awaiting was not already added
        if (!results.find((result) => result.Awaiting)) {
            results.push({
                Awaiting: {
                    description: description,
                },
            });
        }
    }
}

export const Default: ComponentStory<typeof RecursiveDiagnosticComponent> = Template.bind({});
