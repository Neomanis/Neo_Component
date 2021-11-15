import React, { ReactElement, useState } from "react";
import i18next from "i18next";
interface Props {
    name: string;
    Action?: { description: string; id: number; date: Date; executionTime: number; result: string };
    Exit?: { name: string; id: number; type: string; action: string };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    results: any[];
    executionTime: number;
    languageUser: string;
}

const RecursiveDiagnosticComponent = ({
    name,
    results,
    Action,
    Exit,
    executionTime,
    languageUser,
}: Props): ReactElement => {
    const [isFolded, setIsFolded] = useState<boolean>(true);
    const myLanguage = i18next.getFixedT(languageUser);
    const hasChildren = results && results.length;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function getFinalExit(resultsArray: any[]): any {
        if (resultsArray) {
            const exitArray = resultsArray.find((item) => item.Exit);
            return exitArray;
        }
        return undefined;
    }

    return (
        <div className={` text-neo_lite rounded-md m-2 p-1 border`}>
            <div
                className="cursor-pointer"
                onClick={(e): void => {
                    e.stopPropagation();
                    setIsFolded(!isFolded);
                }}
            >
                <div className="flex w-full justify-between">
                    <div>
                        {name && (
                            <p>
                                {myLanguage("ticketModalInfo.diagnostics.bookName")}: {name}
                            </p>
                        )}
                        {getFinalExit(results) && getFinalExit(results).Exit.type ? (
                            <p>Exit: {getFinalExit(results).Exit.type}</p>
                        ) : (
                            ""
                        )}
                        {executionTime && (
                            <p>
                                {myLanguage("ticketModalInfo.diagnostics.executionTime")}: {executionTime} ms
                            </p>
                        )}
                        {hasChildren && isFolded && <p>...</p>}
                    </div>
                </div>
                {Action && (
                    <>
                        <p>Description: {Action.description}</p>
                        <p>
                            {myLanguage("ticketModalInfo.diagnostics.result")}: {Action.result}
                        </p>
                        <p>
                            {myLanguage("ticketModalInfo.diagnostics.executionTime")}: {Action.executionTime} ms
                        </p>
                    </>
                )}

                {Exit && (
                    <>
                        <p>{Exit.type}</p>
                        <p>{Exit.name}</p>
                    </>
                )}
                {hasChildren &&
                    !isFolded &&
                    results.map((item, key) => <RecursiveDiagnosticComponent key={key} {...item} />)}
            </div>
        </div>
    );
};

export default RecursiveDiagnosticComponent;
