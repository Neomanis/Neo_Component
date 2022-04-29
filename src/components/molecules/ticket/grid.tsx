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
                    gridsInitialization[grid][row][col] = ticket;
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
        createGrids(ticketList ? Array.from(ticketList) : []);
    }, [ticketList]);

    return (
        <>
            <div
                className={`${cols === 1 ? "w-52" : ""} ${className}`}
                data-testid="grid-body"
                ref={gridId ? setNodeRef : null}
            >
                {showPagination && gridsPaginationNumber > 1 && (
                    <div className={`flex text-xl justify-end items-center text-neo-link`}>
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
                <div
                    className={`transform scale-73 -mt-8
                    ${cols > 3 ? "-translate-x-8" : ""}
                    ${showPagination && gridsPaginationNumber > 1 ? " -mt-16" : ""} `}
                    data-testid="grid-element"
                >
                    {grids.length > 0 &&
                        grids[currentPageNumber].map((row, rowKey) => (
                            <div
                                className={`flex transform scale-120 z-auto
                                    ${
                                        reverseGrid
                                            ? Number.isInteger(rowKey / 2) && "translate-x-23"
                                            : !Number.isInteger(rowKey / 2) && "translate-x-23"
                                    }`}
                                key={"row-" + rowKey}
                                data-testid="grid-row"
                            >
                                {row.map((item, itemKey) => (
                                    <div key={"ticket-" + itemKey} className="-mx-2" data-testid="grid-ticket">
                                        {isTypeOfTicket(item) ? (
                                            <DndTicket
                                                ticketProps={{
                                                    currentTicket,
                                                    fCallBackClick: currentTicketCallBack,
                                                    fCallBackHover: hoverCallBack,
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
        </>
    );
};

export default React.memo(Grid);
