import React, {
    ForwardRefRenderFunction,
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useState,
} from "react";
import { useDroppable } from "@dnd-kit/core";
import { CompactTicket, Ticket, GridIds, MembershipInfo } from "@neomanis/neo-types";
import { IconArrowLeft, IconArrowRight } from "@/img/svg";
import { Button } from "@/components/atoms";
import DndTicket from "../DndTicket";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { classNames } from "@/utils";
import { AnimatePresence, motion } from "framer-motion";

interface GridHandle {
    resetPagination: () => void;
}

export interface GridProps {
    className?: string;
    cols: number;
    currentTicket?: CompactTicket;
    fCurrentTicket?: (ticket: Ticket) => void;
    fCallBackHover?: (ticket?: CompactTicket) => void;
    fNewPositionedTicket?: (tickets: Ticket[]) => void;
    reverseGrid?: boolean;
    rows: number;
    showPagination?: boolean;
    ticketList?: Ticket[];
    ticketBG?: boolean;
    gridId?: GridIds;
    selectedTicketsUids?: string[];
    userGroups?: MembershipInfo[];
    userNeoId?: number;
    categoriesIcons?: { name: string; icon: IconProp }[];
}

const variants = {
    enter: (direction: number) => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        };
    },
};

interface BlankHexagon {
    id: number;
    uid: string;
    name: "blank";
}

const Grid: ForwardRefRenderFunction<GridHandle, GridProps> = (
    {
        className,
        cols,
        currentTicket,
        ticketBG,
        gridId = "inbox",
        fCallBackHover,
        fCurrentTicket,
        fNewPositionedTicket,
        reverseGrid,
        rows,
        showPagination,
        ticketList,
        selectedTicketsUids,
        userGroups,
        userNeoId,
        categoriesIcons,
    },
    ref
) => {
    const [[page, direction, gridKey], setPage] = useState([0, 0, 0]);

    const { setNodeRef } = useDroppable({
        id: gridId,
    });

    const gridsPaginationNumber = useMemo(() => {
        if (!ticketList || ticketList.length === 0) {
            return 1;
        }

        if (gridId !== "inventory") {
            return Math.ceil(ticketList.length / (rows * cols));
        }

        const ticketWithPosition = ticketList.filter((ticket) => Boolean(ticket.position));
        const maxTicketGridNumber =
            ticketWithPosition.length > 0
                ? Math.max(...ticketWithPosition.map((ticket) => ticket.position.grid)) + 1
                : 0;

        return Math.max(...[maxTicketGridNumber, Math.ceil(ticketList.length / (rows * cols))]);
    }, [ticketList, rows, cols, gridId]);

    // grids is a 3D array, the first is the number of pagination
    // second one is the number of collumns
    // third is the number of rows
    const [grids, unpositionedTickets] = useMemo(() => {
        const tickets = Array.from(ticketList ?? []);
        const gridsInitialization: (Ticket | BlankHexagon)[][][] = [];

        // grids creation
        for (let gridIndex = 0; gridIndex < gridsPaginationNumber; gridIndex++) {
            const grid: (Ticket | BlankHexagon)[][] = [];
            // rows creation
            for (let index = 0; index < rows; index++) {
                grid.push(
                    // cols creation
                    Array.from({ length: cols }, (_, i) => {
                        let item: Ticket | BlankHexagon = { id: i, uid: "blank", name: "blank" };
                        if (tickets[0] && gridId !== "inventory") {
                            item = tickets[0];
                            tickets.shift();
                        }
                        return item;
                    })
                );
            }
            gridsInitialization.push(grid);
        }
        const ticketWithNoPosition: Ticket[] = [];
        let ticketWithNoPositionIndex = 0;

        if (gridId === "inventory") {
            tickets.forEach((ticket) => {
                if (ticket.position) {
                    const { col, grid, row } = ticket.position;
                    if (
                        gridsInitialization[grid] &&
                        gridsInitialization[grid][row] &&
                        gridsInitialization[grid][row][col]
                    ) {
                        gridsInitialization[grid][row][col] = ticket;
                    } else {
                        ticketWithNoPosition.push(ticket);
                    }
                } else {
                    ticketWithNoPosition.push(ticket);
                }
            });
        }

        if (ticketWithNoPosition.length > 0) {
            gridsInitialization.some((grid, gridIndex) => {
                if (ticketWithNoPosition.length === ticketWithNoPositionIndex) {
                    return true;
                }
                grid.some((row, rowIndex) => {
                    if (ticketWithNoPosition.length === ticketWithNoPositionIndex) {
                        return true;
                    }
                    row.some((item, colIndex) => {
                        if (ticketWithNoPosition.length === ticketWithNoPositionIndex) {
                            return true;
                        }
                        if (!isTypeOfTicket(item)) {
                            ticketWithNoPosition[ticketWithNoPositionIndex] = {
                                ...ticketWithNoPosition[ticketWithNoPositionIndex],
                                position: {
                                    col: colIndex,
                                    grid: gridIndex,
                                    row: rowIndex,
                                },
                            };
                            gridsInitialization[gridIndex][rowIndex][colIndex] =
                                ticketWithNoPosition[ticketWithNoPositionIndex];
                            ticketWithNoPositionIndex++;
                        }
                    });
                });
            });
        }

        return [gridsInitialization, ticketWithNoPosition];
    }, [ticketList, gridId, cols, rows, gridsPaginationNumber]);

    const currentTicketCallBack = useCallback(
        (ticket: Ticket) => fCurrentTicket && fCurrentTicket(ticket),
        [fCurrentTicket]
    );

    function isTypeOfTicket(item: Ticket | BlankHexagon): item is Ticket {
        return "type" in item;
    }

    const paginate = (newDirection: number) => {
        const newGridKey = gridKey + 1;
        if (newDirection > 0) {
            if (page + 1 === grids.length) {
                setPage([0, newDirection, newGridKey]);
            } else {
                setPage([page + newDirection, newDirection, newGridKey]);
            }
        } else {
            if (page + 1 === 1) {
                setPage([grids.length - 1, newDirection, newGridKey]);
            } else {
                setPage([page + newDirection, newDirection, newGridKey]);
            }
        }
    };

    useImperativeHandle(ref, () => ({
        resetPagination() {
            setPage([0, 0, 0]);
        },
    }));

    useEffect(() => {
        if (unpositionedTickets.length > 0) {
            fNewPositionedTicket(unpositionedTickets);
        }
    }, [unpositionedTickets]);

    const isOpacified = useCallback(
        (uid) => {
            return selectedTicketsUids && !selectedTicketsUids.includes(uid);
        },
        [selectedTicketsUids]
    );

    return (
        <div
            className={classNames(className, "")}
            data-testid="grid-body"
            ref={gridId ? setNodeRef : null}
            style={{ width: 170 * cols, height: 155 * rows }}
        >
            <div className="h-[5%]">
                {showPagination && gridsPaginationNumber > 1 && (
                    <div className="flex text-xl justify-end items-center text-neo-link">
                        <p className="mr-4 font-bold" data-testid="grid-page-number">
                            {page + 1} / {gridsPaginationNumber}
                        </p>
                        <div className="hover:scale-110 group mr-1 mt-[1px]">
                            <Button
                                className="cursor-pointer w-4"
                                onClick={(): void => paginate(-1)}
                                startIcon={
                                    <IconArrowLeft className="w-4 fill-neo-link opacity-60 group-hover:opacity-100" />
                                }
                                data-testid="grid-page-left-button"
                                variant="none"
                                size="none"
                                rounded="none"
                                id={`${gridId}-previous-button`}
                            />
                        </div>
                        <div className="hover:scale-110 group ml-1 mt-[2px]">
                            <Button
                                className="cursor-pointer w-4"
                                onClick={(): void => paginate(1)}
                                startIcon={
                                    <IconArrowRight className="w-4 fill-neo-link opacity-60 group-hover:opacity-100" />
                                }
                                data-testid="grid-page-right-button"
                                variant="none"
                                size="none"
                                rounded="none"
                                id={`${gridId}-next-button`}
                            />
                        </div>
                    </div>
                )}
            </div>
            <div className="transform scale-95 h-[95%]">
                <AnimatePresence initial={false} custom={direction}>
                    {grids.length > 0 && (
                        <motion.div
                            key={gridKey}
                            variants={variants}
                            custom={direction}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.4 },
                            }}
                            className={classNames("absolute", cols === 1 && "-ml-14")}
                            data-testid="grid-element"
                        >
                            {grids[page]?.map((row, rowKey) => (
                                <div
                                    className={classNames(
                                        "flex justify-center transform scale-110 my-1",
                                        reverseGrid
                                            ? Number.isInteger(rowKey / 2) && "translate-x-[81px]"
                                            : !Number.isInteger(rowKey / 2) && "translate-x-[81px]"
                                    )}
                                    key={`row-${rowKey}-${page}`}
                                    data-testid="grid-row"
                                >
                                    {row.map((item, itemKey) => (
                                        <div
                                            key={`ticket-${itemKey}-${page}`}
                                            className={classNames(
                                                "px-[6px]",
                                                !isOpacified(item.uid) &&
                                                    isTypeOfTicket(item) &&
                                                    "cursor-pointer transform hover:scale-105"
                                            )}
                                            {...(isTypeOfTicket(item) && {
                                                onMouseEnter: () => {
                                                    if (fCallBackHover && !isOpacified(item.uid)) {
                                                        fCallBackHover({ ...item, gridId });
                                                    }
                                                },
                                                onMouseLeave: () => fCallBackHover && fCallBackHover(),
                                            })}
                                            data-testid="grid-ticket"
                                        >
                                            {isTypeOfTicket(item) ? (
                                                <DndTicket
                                                    ticketProps={{
                                                        currentTicket,
                                                        fCallBackClick: currentTicketCallBack,
                                                        isOpacity: isOpacified(item.uid),
                                                        ticket: item,
                                                        gridId,
                                                        userGroups,
                                                        userNeoId,
                                                        categoryIcon: categoriesIcons?.find(
                                                            (category) =>
                                                                "category" in item && category.name === item?.category
                                                        )?.icon,
                                                    }}
                                                    dndId={`${page}-${rowKey}-${itemKey}-${gridId}-ticket-${item.uid}`}
                                                />
                                            ) : (
                                                <DndTicket
                                                    ticketProps={{ ticketBG: ticketBG, gridId }}
                                                    dndId={`${page}-${rowKey}-${itemKey}-${gridId}-emptyTicket`}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default forwardRef(Grid);
