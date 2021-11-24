/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { fakeDiag } from "../../fakeObject";
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
    return (
        <div className="bg-neo_blue p-4">
            {fakeDiag.diagnostics.map((it) => {
                const arrayKeys: string[] = Object.keys(it);
                const exclusions = ["results", "diagExecutionTime", "name", "runId"];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const dataObj = arrayKeys.reduce<any[]>((acc, curVal): any[] => {
                    if (!exclusions.includes(curVal)) {
                        acc.push({ [curVal]: Reflect.get(it, curVal) });
                    }
                    return acc;
                }, []);
                return (
                    <RecursiveDiagnosticComponent
                        name={it.name}
                        executionTime={it.diagExecutionTime}
                        results={it.results}
                        awaiting={awaiting}
                        diagDataKeys={dataObj}
                    />
                );
            })}
        </div>
    );
};

export const Default = Template.bind({});
