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
                const filteredKeys = Object.keys(it).filter((el) => {
                    return el !== "results" && el !== "diagExecutionTime" && el !== "name" && el !== "runId";
                });
                const obj = [];
                filteredKeys.forEach((k) => {
                    obj.push({ [k]: it[k] });
                });
                return (
                    <RecursiveDiagnosticComponent
                        name={it.name}
                        executionTime={it.diagExecutionTime}
                        results={it.results}
                        awaiting={awaiting}
                        diagDataKeys={obj}
                    />
                );
            })}
        </div>
    );
};

export const Default = Template.bind({});
