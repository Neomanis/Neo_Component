import React, { ReactElement, useMemo, useState } from "react";
import { Awaiting, CompactDiagnostic, DiagResult } from "@neomanis/neo-types";
import DiagnosticBlock from "@/components/atoms/DiagnosticBlock";

const DiagList = ({
    results,
    redirectUrl,
    navigate,
    awaiting,
}: {
    results: DiagResult[];
    redirectUrl: string;
    navigate: (url: string, state: { state: string | undefined }) => void;
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
                        if (result?.name) {
                            return (
                                <DiagnosticComponent
                                    key={result.name + "Component" + key}
                                    diagChild={result}
                                    redirectUrl={redirectUrl}
                                    navigate={() => result.name && navigate(redirectUrl, { state: result.name })}
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
    navigate,
    redirectUrl,
    diagResultType,
}: {
    diagnostic: CompactDiagnostic;
    redirectUrl: string;
    navigate: (url: string, state: { state: string }) => void;
    diagResultType?: string;
}): ReactElement => {
    const [bookOpen, setBookOpen] = useState(true);
    const lastElement = diagnostic.results?.at(-1);
    return (
        <div key={diagnostic.runId} data-testid="diagnosticType" className="my-2 relative">
            <DiagnosticBlock
                book={{
                    name: diagnostic.name,
                    diagExecutionTime: diagnostic.diagExecutionTime,
                    diagResultType: diagResultType,
                    lastElement: lastElement,
                }}
                isOpen={bookOpen}
                openBook={() => setBookOpen((oldValue) => !oldValue)}
                redirectTo={() => navigate(redirectUrl, { state: diagnostic.name })}
            />
            {bookOpen && (
                <DiagList
                    results={diagnostic.results}
                    redirectUrl={redirectUrl}
                    navigate={() => navigate(redirectUrl, { state: diagnostic.name })}
                />
            )}
        </div>
    );
};

const DiagChild = ({
    diagChild,
    navigate,
    redirectUrl,
}: {
    diagChild: DiagResult;
    redirectUrl: string;
    navigate: (url: string, state: { state: string | undefined }) => void;
}): ReactElement => {
    const [bookOpen, setBookOpen] = useState(true);
    const lastElement = diagChild.results?.at(-1);

    return (
        <div className="my-2 relative">
            <DiagnosticBlock
                book={{ name: diagChild?.name, lastElement: lastElement }}
                isOpen={bookOpen}
                openBook={() => setBookOpen((oldValue) => !oldValue)}
                redirectTo={() => navigate(redirectUrl, { state: diagChild.name })}
            />
            {bookOpen && diagChild.results && (
                <DiagList
                    results={diagChild.results}
                    redirectUrl={redirectUrl}
                    navigate={() => diagChild.name && navigate(redirectUrl, { state: diagChild.name })}
                />
            )}
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
    navigate,
    redirectUrl,
    awaiting,
    diagResultType,
}: {
    diagChild?: DiagResult;
    diagnostic?: CompactDiagnostic;
    redirectUrl: string;
    awaiting?: Awaiting;
    navigate: (url: string, state: { state: string | undefined }) => void;
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
            {diagnostic && (
                <DiagBook
                    diagnostic={diagnostic}
                    navigate={navigate}
                    redirectUrl={redirectUrl}
                    diagResultType={diagResultType}
                />
            )}
            {diagChild && <DiagChild diagChild={diagChild} navigate={navigate} redirectUrl={redirectUrl} />}
        </div>
    );
};

export default DiagnosticComponent;
