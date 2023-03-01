import { CautionLogo, ClockLogo, IconArrowRight, IconBook, IconChapterExit } from "@/img/svg";
import { classNames, convertDuration, formatDate } from "@/utils";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "@neomanis/neo-translation";
import { DiagnosticResult, DiagResult, Exit } from "@neomanis/neo-types";
import React, { ReactElement, useCallback, useMemo, useState } from "react";
import Button from "../Button";
import Icon from "../Icon";
import Title from "../Title";

//Block text and icon color
const colorRef = {
    purple: {
        text: "text-neo-purple",
        fill: "fill-neo-purple",
    },
    green: {
        text: "text-neo-green",
        fill: "fill-neo-green",
    },
    orange: {
        text: "text-neo-orange",
        fill: "fill-neo-orange",
    },
    red: {
        text: "text-neo-red",
        fill: "fill-neo-red",
    },
    grey: {
        text: "text-neo-light-grey",
        fill: "fill-neo-light-grey",
    },
};

export interface DiagnosticBlockProps {
    book?: {
        name?: string;
        launchDate?: Date;
        diagExecutionTime?: number;
        lastElement?: DiagResult;
        diagResultType?: string;
    };
    Action?: {
        description: string;
        date: Date;
        executionTime: number | undefined;
        id: number;
        result: string;
    };
    Error?: {
        message: string;
        code: string | number;
        runId: string;
        data?: Record<string, unknown>;
    };
    Exit?: Exit;
    Awaiting?: {
        description: string;
    };

    openBook?: () => void;
    redirectTo?: () => void;
    isOpen?: boolean;
}

const DiagnosticBlock = ({
    Action,
    Error,
    Exit,
    Awaiting,
    book,
    openBook,
    redirectTo,
    isOpen = false,
}: DiagnosticBlockProps): ReactElement => {
    const [isFolded, setIsFolded] = useState(true);
    const { t } = useTranslation();

    const color = useCallback(
        (type: "text" | "fill") => {
            if (Awaiting) {
                return colorRef["purple"][type];
            }
            if (Error || book?.diagResultType === DiagnosticResult.Failed) {
                return colorRef["red"][type];
            }
            if (Exit) {
                if (Exit.type === "solved") {
                    return colorRef["green"][type];
                }
                if (Exit.type === "escalate") {
                    return colorRef["orange"][type];
                }
            }

            if (Action) {
                if (Action?.result === "Rejected" || Action?.result === "Failed") {
                    return colorRef["orange"][type];
                }
            }

            if (book) {
                if (book.diagResultType === DiagnosticResult.Awaiting || book.lastElement?.Awaiting) {
                    return colorRef["purple"][type];
                }
                if (book.lastElement?.Error) {
                    return colorRef["red"][type];
                }
                if (book.lastElement?.Exit) {
                    if (
                        book.lastElement?.Exit?.type === "escalate" ||
                        book.diagResultType === DiagnosticResult.Escalate
                    ) {
                        return colorRef["orange"][type];
                    }
                    if (book.lastElement?.Exit?.type === "solved") {
                        return colorRef["green"][type];
                    }
                }
                return colorRef["grey"][type];
            }

            return colorRef["grey"][type];
        },
        [book, Action, Exit, Awaiting]
    );

    const icon = useMemo(() => {
        if (book) {
            return (
                <IconBook
                    data-testid={"blockIsBook"}
                    className={classNames("w-[35px] group-hover:animate-swing", color("fill"))}
                />
            );
        }
        if (Action) {
            return <IconArrowRight data-testid={"blockIsAction"} className={classNames("w-3", color("fill"))} />;
        }
        if (Exit) {
            return <IconChapterExit data-testid={"blockIsExit"} className={classNames("w-5", color("fill"))} />;
        }
        if (Error) {
            return <CautionLogo data-testid={"blockIsError"} className={classNames("w-10", color("fill"))} />;
        }
        if (Awaiting) {
            return (
                <p data-testid={"blockIsAwaiting"} className={classNames("text-2xl font-bold", color("text"))}>
                    ?
                </p>
            );
        }
    }, [color, book, Action, Exit, Error, Awaiting]);

    return (
        <div
            className={classNames(
                "flex items-center justify-between rounded px-4 py-2 red-flicker-fix",
                book && "bg-neo-bg-B h-12 group cursor-pointer",
                !book && "bg-neo-blue-extraDark min-h-[2.5rem]"
            )}
            onClick={() => openBook && openBook()}
        >
            <div className="flex items-center cursor-pointer" onClick={() => setIsFolded((old) => !old)}>
                {icon}
                <Title
                    className={classNames(
                        color("text"),
                        book ? "ml-[17px]" : "ml-2",
                        isFolded && "line-clamp-1",
                        "font-bold w-full"
                    )}
                    type="h3"
                    data={Action?.description || Exit?.action || book?.name || Error?.message || Awaiting?.description}
                />
            </div>
            {!Exit && (
                <div className="flex items-center text-neo-blue-secondary">
                    {book && (
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                redirectTo && redirectTo();
                            }}
                            size="xs"
                        >
                            {t("book.openBook")}
                        </Button>
                    )}
                    {(Action?.executionTime || book?.diagExecutionTime) && (
                        <div className="flex items-center text-xs ml-4">
                            <span className="mb-[2px] font-bold flex">
                                <p className="text-neo-link mr-1">
                                    {book?.launchDate && formatDate(book?.launchDate.toString(), { withSecond: true })}
                                </p>
                                <p className="text-xxs">
                                    {Action?.executionTime && <span>{convertDuration(Action.executionTime)}</span>}
                                    {book?.diagExecutionTime && <span>{convertDuration(book.diagExecutionTime)}</span>}
                                </p>
                            </span>
                            <ClockLogo className="w-5 p-1 fill-neo-blue-secondary" />
                        </div>
                    )}
                    {book && (
                        <div className={classNames(isOpen && "rotate-180", "ml-4")}>
                            <Icon fontIcon={faChevronDown} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DiagnosticBlock;
