import React, { ReactElement, useCallback, useEffect, useMemo, useState } from "react";
import { CompactTicket, GridIds, Ticket } from "@neomanis/neo-types";
import { IconArrowLeft, IconArrowRight } from "../../../img/svg";
import { Button } from "../../atoms";
import DndTicket from "./dndTicket";
import { useDroppable } from "@dnd-kit/core";

interface Props {
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
    selectedTicketsIds?: number[];
}

interface BlankHexagon {
    id: number;
    name: "blank";
}

const Grid = ({
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
    selectedTicketsIds,
}: Props): ReactElement => {
    // grids is a 3D array, the first is the number of pagination
    // second one is the number of collumns
    // third is the number of rows
    const [grids, setGrids] = useState<(Ticket | BlankHexagon)[][][]>([]);
    const [currentPageNumber, setCurrentPageNumber] = useState(0);

    const { setNodeRef } = useDroppable({
        id: gridId,
    });

    const gridsPaginationNumber = useMemo(() => {
        if (ticketList?.length > 0) {
            const ticketWithPosition = ticketList.filter((ticket) => Boolean(ticket.position));
            const maxTicketGridNumber =
                ticketWithPosition.length > 0
                    ? Math.max(...ticketWithPosition.map((ticket) => ticket.position.grid)) + 1
                    : 0;

            return Math.max(...[maxTicketGridNumber, Math.ceil(ticketList.length / (rows * cols))]);
        }

        return 1;
    }, [ticketList, rows, cols]);

    const currentTicketCallBack = useCallback(
        (ticket: Ticket) => fCurrentTicket && fCurrentTicket(ticket),
        [fCurrentTicket]
    );
    const hoverCallBack = useCallback(
        (ticket: CompactTicket) => fCallBackHover && fCallBackHover(ticket),
        [fCallBackHover]
    );

    function isTypeOfTicket(item: Ticket | BlankHexagon) {
        return "type" in item;
    }

    function createGrids(tickets: Ticket[]) {
        const gridsInitialization: (Ticket | BlankHexagon)[][][] = [];

        // grids creation
        for (let gridIndex = 0; gridIndex < gridsPaginationNumber; gridIndex++) {
            const grid: (Ticket | BlankHexagon)[][] = [];
            // rows creation
            for (let index = 0; index < rows; index++) {
                grid.push(
                    // cols creation
                    Array.from({ length: cols }, (_, i) => {
                        let item: Ticket | BlankHexagon = { id: i, name: "blank" };
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
            fNewPositionedTicket(ticketWithNoPosition);
        }
        setGrids(gridsInitialization);
    }

    function changePage(direction: "prev" | "next"): void {
        if (direction === "prev") {
            setCurrentPageNumber((pageNumber) => (pageNumber === 0 ? gridsPaginationNumber - 1 : pageNumber - 1));
        } else {
            setCurrentPageNumber((pageNumber) => (pageNumber === gridsPaginationNumber - 1 ? 0 : pageNumber + 1));
        }
    }

    useEffect(() => {
        setCurrentPageNumber(0);
        createGrids(ticketList ? Array.from(ticketList) : []);
    }, [ticketList]);

    const opacity = useCallback(
        (id) => {
            if (selectedTicketsIds) {
                if (selectedTicketsIds.length > 0) {
                    return !selectedTicketsIds.includes(id);
                }
                return true;
            }
        },
        [selectedTicketsIds]
    );

    return (
        <div className={className} data-testid="grid-body" ref={gridId ? setNodeRef : null}>
            <div className="h-7 transform translate-x-[75px]">
                {showPagination && gridsPaginationNumber > 1 && (
                    <div className={`${cols === 1 && "-mr-4"} flex text-xl justify-end items-center text-neo-link`}>
                        <p className="mr-4" data-testid="grid-page-number">
                            {currentPageNumber + 1}/{gridsPaginationNumber}
                        </p>
                        <Button
                            className="cursor-pointer w-5 pr-1 transform hover:scale-105"
                            fCallback={(): void => changePage("prev")}
                            svg={<IconArrowLeft fill="#7DAAB7" />}
                            testId="grid-page-left-button"
                        />
                        <Button
                            className="cursor-pointer w-5 pl-1 transform hover:scale-105"
                            fCallback={(): void => changePage("next")}
                            svg={<IconArrowRight fill="#7DAAB7" />}
                            testId="grid-page-right-button"
                        />
                    </div>
                )}
            </div>
            <div className="transform scale-[0.95]" data-testid="grid-element">
                {grids.length > 0 &&
                    grids[currentPageNumber].map((row, rowKey) => (
                        <div
                            className={`flex justify-center transform scale-110 my-1
                                    ${
                                        reverseGrid
                                            ? Number.isInteger(rowKey / 2) && "translate-x-[81px]"
                                            : !Number.isInteger(rowKey / 2) && "translate-x-[81px]"
                                    }`}
                            key={"row-" + rowKey}
                            data-testid="grid-row"
                        >
                            {row.map((item, itemKey) => (
                                <div key={"ticket-" + itemKey} className="mx-[6px]" data-testid="grid-ticket">
                                    {isTypeOfTicket(item) ? (
                                        <DndTicket
                                            ticketProps={{
                                                currentTicket,
                                                fCallBackClick: currentTicketCallBack,
                                                fCallBackHover: hoverCallBack,
                                                isOpacity: opacity(item.id),
                                                ticket: item as Ticket,
                                                gridId,
                                            }}
                                            dndId={`${currentPageNumber}-${rowKey}-${itemKey}-${gridId}-ticket-${item.id}`}
                                        />
                                    ) : (
                                        <DndTicket
                                            ticketProps={{ ticketBG: ticketBG, gridId }}
                                            dndId={`${currentPageNumber}-${rowKey}-${itemKey}-${gridId}-emptyTicket`}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default React.memo(Grid);
