import { CautionLogo, ClockLogo, IconBook, IconChapterExit, IconChapterScript } from "@/img/svg";
import { classNames } from "@/utils";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "@neomanis/neo-translation";
import { DiagResult } from "@neomanis/neo-types";
import React, { ReactElement, useCallback, useMemo } from "react";
import Button from "../Button";
import Icon from "../Icon";
import Title from "../Title";

interface Error {
    message: string;
    code: number | string | null;
    runId: string;
    data?: Record<string, unknown>;
}

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
        name: string;
        diagExecutionTime?: number;
        lastElement: DiagResult;
        isAwaiting: boolean;
        isError: boolean;
    };
    Action?: {
        id: number;
        description: string;
        date: Date;
        executionTime: number | undefined;
        result: string;
    };
    Error?: Error;
    Exit?: { id: number; type: string; action: string };
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
    const { t } = useTranslation();

    const color = useCallback(
        (type: "text" | "fill") => {
            if (Awaiting) {
                return colorRef["purple"][type];
            }
            if (Error) {
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
                if (book.isAwaiting) {
                    return colorRef["purple"][type];
                }
                if (book.isError) {
                    return colorRef["red"][type];
                }
                if (book.lastElement?.Exit) {
                    if (book.lastElement?.Exit?.type === "escalate") {
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
            return <IconChapterScript data-testid={"blockIsAction"} className={classNames("w-5", color("fill"))} />;
        }
        if (Exit) {
            return <IconChapterExit data-testid={"blockIsExit"} className={classNames("w-5", color("fill"))} />;
        }
        if (Error) {
            return <CautionLogo data-testid={"blockIsError"} className={classNames("w-5", color("fill"))} />;
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
                "flex items-center justify-between rounded px-4 py-2 ",
                book && "bg-neo-bg-B h-12 group cursor-pointer",
                !book && "bg-neo-blue-extraDark h-10"
            )}
            onClick={() => openBook && openBook()}
        >
            <div className="flex items-center">
                {icon}
                <Title
                    className={classNames(color("text"), book ? "ml-[17px]" : "ml-2", " font-bold")}
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
                            <p className="mb-[2px] font-bold">
                                {Action?.executionTime}
                                {book?.diagExecutionTime} ms
                            </p>
                            <ClockLogo className="w-5 p-1 fill-neo-blue-secondary" />
                        </div>
                    )}
                    {book && (
                        <div className={classNames(isOpen && "rotate-180", "ml-4")}>
                            <Icon fontIcon={faChevronDown} />
                        </div>
                    )}
                    {Error && <p className="bg-neo-red rounded-full px-2 text-white font-bold text-xs">{Error.code}</p>}
                </div>
            )}
        </div>
    );
};

export default DiagnosticBlock;
