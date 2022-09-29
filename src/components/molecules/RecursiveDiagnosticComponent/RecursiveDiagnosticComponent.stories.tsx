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
    const oneDiag = fakeDiag2.diagnostics[0];
    const arrayKeys = Object.keys(oneDiag);
    const exclusions = ["results", "diagExecutionTime", "name", "runId"];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dataObj = arrayKeys.reduce<any[]>((acc, curVal): any[] => {
        if (!exclusions.includes(curVal)) {
            acc.push({ [curVal]: Reflect.get(oneDiag, curVal) });
        }
        return acc;
    }, []);
    return (
        <RecursiveDiagnosticComponent
            name={"DIAG Name"}
            executionTime={42}
            results={oneDiag.results}
            diagDataKeys={dataObj}
            redirectTo={() => console.log("redirectTo")}
        />
    );
};

export const Default: ComponentStory<typeof RecursiveDiagnosticComponent> = Template.bind({});
