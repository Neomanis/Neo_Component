import React, { ReactElement, useState } from "react";
import {
    faBook,
    faClock,
    faDoorOpen,
    faChevronDown,
    faWaveSquare,
    faChevronUp,
    faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "@neomanis/neo-translation";
import { CautionLogoFullInvert } from "@/img/svg";
import { Icon, Button } from "@/components/atoms";

interface IError {
    name: string;
    message: string;
    code: number | string | null;
    runId: string;
    data: Record<string, unknown>;
}

export interface RecursiveDiagnosticComponentProps {
    name: string;
    Action?: {
        description: string;
        id: number;
        runId: string;
        date: Date;
        executionTime: number;
        result: string;
    };
    Error?: IError;
    Exit?: { name: string; id: number; type: string; action: string };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    results: any[];
    Awaiting?: {
        description: string;
    };
    executionTime: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    diagDataKeys: any[];
    redirectTo: (bookName: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getFinalExit(resultsArray: Record<string, unknown>[]): any {
    if (resultsArray) {
        const awaiting = resultsArray.find((item) => item.Awaiting);
        if (awaiting) {
            return awaiting;
        }
        const exit = resultsArray.find((item) => item.Exit);
        if (exit) {
            return exit;
        }
    }
    return undefined;
}

function borderClass(type: Record<string, unknown> | Error): string {
    // console.log(type);

    if (
        Reflect.get(type, "result") === "Validated" ||
        Reflect.get(type, "result") === "OK" ||
        Reflect.get(type, "type") === "solved"
    ) {
        return "border-neo-green";
    } else if (
        Reflect.get(type, "result") === "Rejected" ||
        Reflect.get(type, "result") === "Failed" ||
        Reflect.get(type, "type") === "escalate"
    ) {
        return "border-neo-orange";
    } else if (type.name === "OrchestratorError") {
        return "border-neo-red";
    } else {
        return "border-neo-light-grey";
    }
}

function errorMessageBuilder(errorObject: IError): string | null {
    if (errorObject.message) {
        return errorObject.message;
    } else if (errorObject.data.failedAction) {
        const scriptName = Reflect.get(errorObject.data.failedAction as Record<string, unknown>, "scriptName");
        if (scriptName) {
            return `${scriptName} failed`;
        } else {
            return `actionId ${Reflect.get(
                errorObject.data.failedAction as Record<string, unknown>,
                "actionId"
            )} failed`;
        }
    } else {
        return null;
    }
}

const RecursiveDiagnosticComponent = ({
    name,
    Action,
    Awaiting,
    Error,
    Exit,
    results,
    executionTime,
    diagDataKeys,
    redirectTo,
}: RecursiveDiagnosticComponentProps): ReactElement => {
    const [isFolded, setIsFolded] = useState<boolean>(true);
    const hasChildren = Boolean(results && results.length);
    const { t } = useTranslation();

    function lateralBandColor(): string {
        if (!hasChildren && (Action || Exit || Error || Awaiting)) {
            return `border-l-8 ${borderClass(Action ?? Exit ?? Awaiting ?? Error)}`;
        } else if (getFinalExit(results) && getFinalExit(results).Exit) {
            return `border-l-8 ${borderClass(getFinalExit(results).Exit)}`;
        } else if (getFinalExit(results) && getFinalExit(results).Awaiting) {
            return `border-l-8 ${borderClass(getFinalExit(results).Awaiting)}`;
        } else {
            return "border-l-8 border-neo-red";
        }
    }

    return (
        <div
            className="text-white rounded-md m-2 border cursor-pointer"
            onClick={(e): void => {
                e.stopPropagation();
                setIsFolded(!isFolded);
            }}
        >
            <div
                className={`rounded-md p-2 
                ${lateralBandColor()} 
             
            }`}
            >
                <div className="flex flex-col w-full">
                    <div className="flex justify-between">
                        {name && (
                            <div>
                                <div className="flex font-bold text-lg">
                                    <Icon className="mx-2" fontIcon={faBook} />
                                    {name}
                                </div>
                                {!isFolded && (
                                    <Button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            redirectTo(name);
                                        }}
                                        size="sm"
                                    >
                                        {t("book.openBook")}
                                    </Button>
                                )}
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
                        diagDataKeys.map((el, index) => {
                            const key = Reflect.ownKeys(el)[0];
                            const value = Reflect.get(el, key);
                            if (key && value) {
                                return (
                                    <p className="mx-2" key={index}>
                                        {key}: {value}
                                    </p>
                                );
                            }
                        })}
                    {isFolded && getFinalExit(results) && getFinalExit(results)?.Exit?.action ? (
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
                {Error && errorMessageBuilder(Error) && (
                    <div className="flex">
                        <CautionLogoFullInvert className="mx-1" width={28} fill="#FFFFFF" />
                        {errorMessageBuilder(Error)}
                    </div>
                )}
                {Exit && (
                    <div className="flex">
                        <Icon className="mx-2" fontIcon={faDoorOpen} />
                        {Exit.action}
                    </div>
                )}
                {Awaiting && (
                    <div className="flex">
                        <Icon className="mx-2" fontIcon={faQuestion} />
                        {Awaiting.description}
                    </div>
                )}
                {hasChildren &&
                    !isFolded &&
                    results.map((item, key) => {
                        return <RecursiveDiagnosticComponent key={key} {...item} redirectTo={redirectTo} />;
                    })}
                {hasChildren && !isFolded && <Icon fontIcon={faChevronUp} />}
            </div>
        </div>
    );
};

export default RecursiveDiagnosticComponent;
