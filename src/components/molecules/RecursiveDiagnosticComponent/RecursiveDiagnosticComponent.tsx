import React, { ReactElement, useState } from "react";
import {
    faBook,
    faClock,
    faDoorOpen,
    faChevronDown,
    faWaveSquare,
    faChevronUp,
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
    Action?: { description: string; id: number; date: Date; executionTime: number; result: string };
    Error?: IError;
    Exit?: { name: string; id: number; type: string; action: string };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    results: any[];
    awaiting: string;
    executionTime: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    diagDataKeys: any[];
    redirectTo: (bookName: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getFinalExit(resultsArray: Record<string, unknown>[]): any {
    if (resultsArray) {
        const exit = resultsArray.find((item) => item.Exit);
        return exit;
    }
    return undefined;
}

function lateralColorBand(type: Record<string, unknown> | Error): string {
    if (
        Reflect.get(type, "result") === "Validated" ||
        Reflect.get(type, "result") === "OK" ||
        Reflect.get(type, "type") === "solved"
    ) {
        return "neo-green";
    } else if (
        Reflect.get(type, "result") === "Rejected" ||
        Reflect.get(type, "result") === "Failed" ||
        Reflect.get(type, "type") === "escalate"
    ) {
        return "neo-orange";
    } else if (type.name === "OrchestratorError") {
        return "neo-red";
    } else {
        return "neo-light-grey";
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
    Error,
    Exit,
    results,
    awaiting,
    executionTime,
    diagDataKeys,
    redirectTo,
}: RecursiveDiagnosticComponentProps): ReactElement => {
    const [isFolded, setIsFolded] = useState<boolean>(true);
    const hasChildren = results && results.length;
    const { t } = useTranslation();

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
                    !hasChildren && (Action || Exit || Error)
                        ? `border-l-8 border-${lateralColorBand(Action ?? Exit ?? Error)}`
                        : ""
                } ${getFinalExit(results) ? `border-l-8 border-${lateralColorBand(getFinalExit(results).Exit)}` : ""}
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
                                        className="h-8 w-36 rounded-3xl text-white flex items-center text-sm justify-center font-extrabold"
                                        data={t("book.openBook")}
                                        fCallback={(e) => {
                                            e.stopPropagation();
                                            redirectTo(name);
                                        }}
                                        style={{
                                            background:
                                                "linear-gradient(49.89deg, #FF1166 12.35%, #FF3355 50.76%, #FF5555 87.67%)",
                                        }}
                                    />
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
                {hasChildren &&
                    !isFolded &&
                    results.map((item, key) => (
                        <RecursiveDiagnosticComponent key={key} {...item} awaiting={awaiting} redirectTo={redirectTo} />
                    ))}
                {hasChildren && !isFolded && <Icon fontIcon={faChevronUp} />}
            </div>
        </div>
    );
};

export default RecursiveDiagnosticComponent;
