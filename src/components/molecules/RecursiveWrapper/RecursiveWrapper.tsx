import React, { ReactElement } from "react";
import { Diagnostic } from "@neomanis/neo-types";
import RecursiveDiagnosticComponent from "../RecursiveDiagnosticComponent";

export interface RecursiveWrapperProps {
    diagnostics: Diagnostic;
    redirectUrl: string;
    navigate: (url: string, state: { state: string }) => void;
}

const RecursiveWrapper = ({ diagnostics, navigate, redirectUrl }: RecursiveWrapperProps): ReactElement => {
    const awaiting = diagnostics.awaiting.length > 0 && diagnostics.awaiting[diagnostics.awaiting.length - 1];
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
    return (
        <div className="bg-neo-bg-B p-4">
            {diagnostics.diagnostics
                .map((diag) => {
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
                            redirectTo={() => navigate(redirectUrl, { state: diag.name })}
                        />
                    );
                })
                .reverse()}
        </div>
    );
};

export default RecursiveWrapper;
