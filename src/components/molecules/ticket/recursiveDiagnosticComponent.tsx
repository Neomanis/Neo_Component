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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    diagDataKeys: any[];
}

const RecursiveDiagnosticComponent = ({
    name,
    Action,
    Exit,
    results,
    awaiting,
    executionTime,
    diagDataKeys,
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
            return "neo_green";
        } else if (type.result === "Rejected" || type.result === "Failed" || type.type === "escalate") {
            return "neo_orange";
        } else {
            return "neo_lite";
        }
    }

    return (
        <div
            className=" text-white rounded-md m-2 border cursor-pointer"
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
                        : "border-l-8 border-neo_light_grey"
                }
            }`}
            >
                <div className="flex flex-col w-full">
                    <div className="flex justify-between">
                        {name && (
                            <div className="flex font-bold text-lg">
                                <Icon className="mx-2" fontIcon={faBook} />
                                {name}
                            </div>
                        )}
                        {executionTime && (
                            <div className="flex">
                                {executionTime} ms
                                <Icon className="mx-2" fontIcon={faClock} />
                            </div>
                        )}
                    </div>
                    {!isFolded &&
                        hasChildren &&
                        diagDataKeys &&
                        diagDataKeys.map((el) => {
                            const key = Reflect.ownKeys(el)[0];
                            const value = Reflect.get(el, key);
                            if (key && value) {
                                return (
                                    <p className="mx-2">
                                        {key}: {value}
                                    </p>
                                );
                            }
                        })}
                    {isFolded && getFinalExit(results) && getFinalExit(results).Exit.action ? (
                        <div className="flex">
                            <Icon className="mx-2" fontIcon={faDoorOpen} />
                            {getFinalExit(results).Exit.action}
                        </div>
                    ) : (
                        ""
                    )}
                    {hasChildren && isFolded && <Icon fontIcon={faChevronDown} />}
                </div>
                {Action && (
                    <div className="flex justify-between">
                        <div className="flex">
                            <Icon className="mx-2" fontIcon={faWaveSquare} />
                            {Action.description}
                        </div>
                        <div className="flex">
                            {Action.executionTime ? `${Action.executionTime} ms` : "- ms"}
                            <Icon className="mx-2" fontIcon={faClock} />
                        </div>
                    </div>
                )}

                {Exit && (
                    <div className="flex">
                        <Icon className="mx-2" fontIcon={faDoorOpen} />
                        {Exit.action}
                    </div>
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
