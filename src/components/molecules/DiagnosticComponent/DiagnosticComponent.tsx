import React, { ReactElement, useMemo, useState } from "react";
import { Awaiting, CompactDiagnostic, DiagResult } from "@neomanis/neo-types";
import DiagnosticBlock from "@/components/atoms/DiagnosticBlock";

const DiagList = ({
    results,
    onNavigate,
    awaiting,
}: {
    results: DiagResult[];
    onNavigate: (bookId: string | undefined) => void;
    awaiting?: Awaiting;
}): ReactElement => {
    const lastElement = results?.at(-1);

    function isLastElement(children: JSX.Element, isLast: boolean) {
        if (isLast) {
            return (
                <div className="relative flex items-center my-2">
                    <div className="bg-neo-blue-secondary h-1 w-8 absolute -left-8"></div>
                    <div className="w-full">{children}</div>
                </div>
            );
        } else {
            return <div className="my-2">{children}</div>;
        }
    }

    const lineDot = useMemo(() => {
        if (lastElement) {
            if (Object.keys(lastElement)[0] === "Exit") {
                return false;
            }
            if (Object.keys(lastElement)[0] === "Error") {
                return false;
            }
            if (Object.keys(lastElement)[0] === "Awaiting") {
                return false;
            }
        }
        return true;
    }, [lastElement]);

    return (
        <div className="flex w-full relative">
            <div className="bg-neo-blue-secondary w-1 mx-8 block mb-[26px] relative">
                {lineDot && (
                    <div className="h-3 w-3 bg-neo-blue-secondary absolute -bottom-[2px] -left-1 rounded-full"></div>
                )}
            </div>
            <div className="w-full">
                {results &&
                    results.map((result, key) => {
                        if (result.Action) {
                            return (
                                <div key={result.Action.id + "block" + key} className="my-2">
                                    <DiagnosticBlock Action={result.Action} />
                                </div>
                            );
                        }
                        if (result.Error) {
                            return (
                                <div key={result.Error.message + "block" + key}>
                                    {isLastElement(
                                        <DiagnosticBlock Error={result.Error} />,
                                        lastElement?.Error?.message === result.Error.message
                                    )}
                                </div>
                            );
                        }
                        if (result.Exit) {
                            return (
                                <div key={result.Exit.id + "block" + key}>
                                    {isLastElement(
                                        <DiagnosticBlock Exit={result.Exit} />,
                                        lastElement?.Exit?.id === result.Exit.id
                                    )}
                                </div>
                            );
                        }
                        if (result.Awaiting) {
                            return (
                                <div key={result.Awaiting.description + "block" + key}>
                                    {isLastElement(
                                        <DiagnosticBlock Awaiting={result.Awaiting} />,
                                        lastElement?.Awaiting?.description === result.Awaiting.description
                                    )}
                                </div>
                            );
                        }
                        if (result?.bookId) {
                            return (
                                <DiagnosticComponent
                                    key={result.bookId + "Component" + key}
                                    diagChild={result}
                                    onNavigate={() => onNavigate(result.bookId)}
                                    awaiting={awaiting}
                                />
                            );
                        }
                    })}
            </div>
        </div>
    );
};

const DiagBook = ({
    diagnostic,
    onNavigate,
    diagResultType,
}: {
    diagnostic: CompactDiagnostic;
    onNavigate: (bookId: string | undefined) => void;
    diagResultType?: string;
}): ReactElement => {
    const [bookOpen, setBookOpen] = useState(true);
    const lastElement = diagnostic.results?.at(-1);
    return (
        <div key={diagnostic.runId} data-testid="diagnosticType" className="my-2 relative">
            <DiagnosticBlock
                book={{
                    name: diagnostic.name,
                    date: diagnostic.launchDate,
                    diagExecutionTime: diagnostic.diagExecutionTime,
                    result: diagResultType,
                    lastElement: lastElement,
                }}
                isOpen={bookOpen}
                openBook={() => setBookOpen((oldValue) => !oldValue)}
                redirectTo={() => onNavigate(diagnostic.bookId)}
            />
            {bookOpen && <DiagList results={diagnostic.results} onNavigate={onNavigate} />}
        </div>
    );
};

const DiagChild = ({
    diagChild,
    onNavigate,
}: {
    diagChild: DiagResult;
    onNavigate: (bookId: string | undefined) => void;
}): ReactElement => {
    const [bookOpen, setBookOpen] = useState(true);
    const lastElement = diagChild.results?.at(-1);
    return (
        <div className="my-2 relative">
            <DiagnosticBlock
                book={{
                    name: diagChild?.name,
                    date: diagChild?.date,
                    diagExecutionTime: diagChild?.diagExecutionTime,
                    lastElement: lastElement,
                }}
                isOpen={bookOpen}
                openBook={() => setBookOpen((oldValue) => !oldValue)}
                redirectTo={() => onNavigate(diagChild.bookId)}
            />
            {bookOpen && diagChild.results && <DiagList results={diagChild.results} onNavigate={onNavigate} />}
        </div>
    );
};

function insertApproval(booknames: string[], description: string, results: DiagResult[]) {
    if (booknames.length > 0) {
        const bookResults = results.find((result) => result.name === booknames[0]);
        bookResults?.results && insertApproval(booknames.slice(1), description, bookResults.results);
    } else {
        // we will add only if Awaiting was not already added
        if (!results?.find((result) => result?.Awaiting)) {
            results.push({
                Awaiting: {
                    description: description,
                },
            });
        }
    }
}

const DiagnosticComponent = ({
    diagChild,
    diagnostic,
    onNavigate,
    awaiting,
    diagResultType,
}: {
    diagChild?: DiagResult;
    diagnostic?: CompactDiagnostic;
    awaiting?: Awaiting;
    onNavigate: (bookId: string | undefined) => void;
    diagResultType?: string;
}): ReactElement => {
    if (diagnostic) {
        // results key must exist
        if (!diagnostic.results) {
            diagnostic.results = [];
        }
        if (awaiting && diagnostic.runId === awaiting.runId) {
            // we will insert a fake "action" to display it at the right position
            insertApproval(awaiting.bookNames.slice(1), awaiting.currentChapter.desc, diagnostic.results);
        }
    }
    return (
        <div className="w-full">
            {diagnostic && <DiagBook diagnostic={diagnostic} onNavigate={onNavigate} diagResultType={diagResultType} />}
            {diagChild && <DiagChild diagChild={diagChild} onNavigate={onNavigate} />}
        </div>
    );
};

export default DiagnosticComponent;
