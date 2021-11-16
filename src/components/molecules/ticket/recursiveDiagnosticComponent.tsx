import React, { ReactElement, useState } from "react";
import {
    faChevronDown,
    faChevronUp,
    faClock,
    faBook,
    faWaveSquare,
    faDoorOpen,
} from "@fortawesome/free-solid-svg-icons";
import { Icon } from "../../atoms";
interface Props {
    name: string;
    Action?: { description: string; id: number; date: Date; executionTime: number; result: string };
    Exit?: { name: string; id: number; type: string; action: string };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    results: any[];
    awaiting: string;
    executionTime: number;
}

const RecursiveDiagnosticComponent = ({
    name,
    Action,
    Exit,
    results,
    awaiting,
    executionTime,
}: Props): ReactElement => {
    const [isFolded, setIsFolded] = useState<boolean>(true);
    const hasChildren = results && results.length;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function getFinalExit(resultsArray: any[]): any {
        if (resultsArray) {
            const exitArray = resultsArray.find((item) => item.Exit);
            return exitArray;
        }
        return undefined;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            className="text-neo_lite rounded-md m-2 border cursor-pointer"
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
                } ${
                    getFinalExit(results)
                        ? `border-l-8 border-${lateralColorBand(getFinalExit(results).Exit)}`
                        : "border-l-8 border-neo_lite"
                }
            }`}
            >
                <div className="flex flex-col w-full">
                    {name && (
                        <p className="flex font-bold">
                            <Icon className="mx-2" fontIcon={faBook} />
                            {name}
                        </p>
                    )}
                    {executionTime && (
                        <p className="flex">
                            <Icon className="mx-2" fontIcon={faClock} /> {executionTime} ms
                        </p>
                    )}
                    {isFolded && getFinalExit(results) && getFinalExit(results).Exit.action ? (
                        <p className="flex">
                            <Icon className="mx-2" fontIcon={faDoorOpen} />
                            {getFinalExit(results).Exit.action}
                        </p>
                    ) : (
                        ""
                    )}
                    {hasChildren && isFolded && <Icon fontIcon={faChevronDown} />}
                </div>
                {Action && (
                    <>
                        <p className="flex">
                            <Icon className="mx-2" fontIcon={faWaveSquare} />
                            {Action.description}
                        </p>
                        <p className="flex">
                            <Icon className="mx-2" fontIcon={faClock} />
                            {Action.executionTime} ms
                        </p>
                    </>
                )}

                {Exit && (
                    <p className="flex">
                        <Icon className="mx-2" fontIcon={faDoorOpen} />
                        {Exit.action}
                    </p>
                )}
                {hasChildren &&
                    !isFolded &&
                    results.map((item, key) => (
                        <RecursiveDiagnosticComponent key={key} {...item} awaiting={awaiting} />
                    ))}
                {hasChildren && !isFolded && <Icon fontIcon={faChevronUp} />}
            </div>
        </div>
    );
};

export default RecursiveDiagnosticComponent;
