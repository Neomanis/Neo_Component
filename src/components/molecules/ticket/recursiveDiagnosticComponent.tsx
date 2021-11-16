import React, { ReactElement, useState } from "react";
import i18next from "i18next";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "../../atoms";
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

    function lateralColorBand(type: any): string {
        if (type.result === "Validated" || type.result === "OK" || type.type === "solved") {
            return "neo_green-base";
        } else if (type.result === "Rejected" || type.result === "Failed" || type.type === "escalate") {
            return "neo_orange";
        } else {
            return "neo_lite";
        }
    }

    return (
        <div
            className={`text-neo_lite rounded-md m-2 border cursor-pointer `}
            onClick={(e): void => {
                e.stopPropagation();
                setIsFolded(!isFolded);
            }}
        >
            <div
                className={`rounded-md p-2 ${
                    !hasChildren && (Action || Exit)
                        ? `border-l-8 border-${lateralColorBand(Action ? Action : Exit)}`
                        : ""
                }
            }`}
            >
                <div className="flex flex-col w-full">
                    {name && (
                        <p>
                            <span className="font-semibold">
                                {myLanguage("ticketModalInfo.diagnostics.bookName")}:{" "}
                            </span>
                            {name}
                        </p>
                    )}
                    {getFinalExit(results) && getFinalExit(results).Exit.type ? (
                        <p>
                            <span className="font-semibold">Exit: </span>
                            {getFinalExit(results).Exit.type}
                        </p>
                    ) : (
                        ""
                    )}
                    {executionTime && (
                        <p>
                            <span className="font-semibold">
                                {myLanguage("ticketModalInfo.diagnostics.executionTime")}:{" "}
                            </span>
                            {executionTime} ms
                        </p>
                    )}
                    {hasChildren && isFolded && <Icon fontIcon={faChevronDown} />}
                </div>
                {Action && (
                    <>
                        <p>
                            <span className="font-semibold">Description: </span>
                            {Action.description}
                        </p>
                        <p>
                            <span className="font-semibold">
                                {myLanguage("ticketModalInfo.diagnostics.executionTime")}:{" "}
                            </span>
                            {Action.executionTime} ms
                        </p>
                    </>
                )}

                {Exit && (
                    <>
                        <p>{Exit.action}</p>
                    </>
                )}
                {hasChildren &&
                    !isFolded &&
                    results.map((item, key) => <RecursiveDiagnosticComponent key={key} {...item} />)}
                {hasChildren && !isFolded && <Icon fontIcon={faChevronUp} />}
            </div>
        </div>
    );
};

export default RecursiveDiagnosticComponent;
