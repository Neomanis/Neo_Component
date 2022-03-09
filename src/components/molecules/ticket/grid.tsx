import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { ITicket } from "../../../interface";
import { IconArrowLeft, IconArrowRight } from "../../../img/svg";
import { Button } from "../../atoms";
import DraggableTicket from "./draggableTicket";
import { useDroppable } from "@dnd-kit/core";

export interface GridProps {
    className?: string;
    cols: number;
    currentTicket?: ITicket;
    fCurrentTicket?: (ticket: ITicket) => void;
    fCallBackHover?: (ticket?: ITicket) => void;
    languageUser: string;
    reverseGrid?: boolean;
    rows: number;
    showPagination?: boolean;
    ticketList?: ITicket[];
    ticketBG?: boolean;
    droppableId?: string;
}

interface BlankHexagon {
    id: number;
    name: "blank";
}

const Grid = ({
    className,
    cols,
    currentTicket,
    droppableId,
    fCallBackHover,
    fCurrentTicket,
    languageUser,
    reverseGrid,
    rows,
    showPagination,
    ticketList,
}: GridProps): ReactElement => {
    // grids is a 3D array, the first is the number of pagination
    // second one is the number of collumns
    // third is the number of rows
    const [grids, setGrids] = useState<(ITicket | BlankHexagon)[][][]>([]);
    const [currentPageNumber, setCurrentPageNumber] = useState(0);

    const { setNodeRef } = useDroppable({
        id: droppableId,
    });

    const getGridsPaginationNumber = useCallback(() => {
        return ticketList?.length > 0 ? Math.ceil(ticketList.length / (rows * cols)) : 1;
    }, [ticketList, rows, cols]);

    const currentTicketCallBack = useCallback(
        (ticket: ITicket) => fCurrentTicket && fCurrentTicket(ticket),
        [fCurrentTicket]
    );
    const hoverCallBack = useCallback((ticket: ITicket) => fCallBackHover && fCallBackHover(ticket), [fCallBackHover]);

    function isTypeOfTicket(item: ITicket | BlankHexagon) {
        return Boolean((item as ITicket).similarTickets);
    }

    function createGrids(tickets: ITicket[]) {
        const gridsInitialization: (ITicket | BlankHexagon)[][][] = [];

        // grids creation
        for (let gridIndex = 0; gridIndex < getGridsPaginationNumber(); gridIndex++) {
            const grid: (ITicket | BlankHexagon)[][] = [];
            // rows creation
            for (let index = 0; index < rows; index++) {
                grid.push(
                    // cols creation
                    Array.from({ length: cols }, (_, i) => ({ id: i, name: "blank" }))
                );
            }
            gridsInitialization.push(grid);
        }

        tickets.forEach((ticket) => {
            const { col, grid, row } = ticket.position;
            gridsInitialization[grid][row][col] = ticket;
        });
        setGrids(gridsInitialization);
    }

    function changePage(direction: "prev" | "next"): void {
        if (direction === "prev") {
            setCurrentPageNumber((pageNumber) => (pageNumber === 0 ? getGridsPaginationNumber() - 1 : pageNumber - 1));
        } else {
            setCurrentPageNumber((pageNumber) => (pageNumber === getGridsPaginationNumber() - 1 ? 0 : pageNumber + 1));
        }
    }

    useEffect(() => {
        createGrids(ticketList ? Array.from(ticketList) : []);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ticketList]);

    return (
        <>
            <div
                className={`${cols === 1 ? "w-52" : ""} ${className}`}
                data-testid="grid-body"
                ref={droppableId ? setNodeRef : null}
            >
                {showPagination && getGridsPaginationNumber() > 1 && (
                    <div className={`flex text-xl justify-end items-center text-neo-link`}>
                        <p className="mr-4" data-testid="grid-page-number">
                            {currentPageNumber + 1}/{getGridsPaginationNumber()}
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
                {grids.map((grid, gridKey) => (
                    <div
                        className={`transform scale-73 -mt-8  
                    ${cols > 3 ? "-translate-x-8" : ""}
                    ${showPagination && getGridsPaginationNumber() > 1 ? " -mt-16" : ""} 
                    ${currentPageNumber !== gridKey ? "hidden" : ""}`}
                        id={"gridId-" + gridKey}
                        key={"grid-" + gridKey}
                        data-testid="grid-element"
                    >
                        {grid.map((row, rowKey) => (
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
                                            <DraggableTicket
                                                ticketProps={{
                                                    currentTicket,
                                                    fCallBackClick: currentTicketCallBack,
                                                    fCallBackHover: hoverCallBack,
                                                    languageUser,
                                                    ticket: item as ITicket,
                                                }}
                                                // dndId={`grid-${droppableId}-ticket-${(item as ITicket).id}`}
                                                dndId={`${gridKey}-${rowKey}-${itemKey}-${droppableId}-ticket-${item.id}`}
                                            />
                                        ) : (
                                            <DraggableTicket
                                                ticketProps={{}}
                                                dndId={`${gridKey}-${rowKey}-${itemKey}-${droppableId}-emptyTicket`}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
};

export default React.memo(Grid);
