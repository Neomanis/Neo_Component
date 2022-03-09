/* eslint-disable no-console */
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import React, { ReactElement, useState, useEffect, useCallback } from "react";
import { ITicket } from "../../interface";
import { fakeTicket } from "../../stories/fakeObject";
import Grid, { GridProps } from "./ticket/grid";
import Ticket from "./ticket/ticket";

interface Props {
    title: string;
    rows: number;
    cols: number;
    fCurrentTicket: () => void;
    showPagination?: boolean;
    reverseGrid?: boolean;
    languageUser: string;
}

const DndTest = ({
    title,
    rows,
    cols,
    fCurrentTicket,
    showPagination,
    reverseGrid,
    languageUser = "en_US",
}: Props): ReactElement => {
    const props: GridProps = {
        rows: rows,
        cols: cols,
        fCurrentTicket: () => fCurrentTicket,
        showPagination: showPagination,
        reverseGrid: reverseGrid,
        languageUser: languageUser,
    };
    const [draggedItem, setDraggedItem] = useState<ITicket>();
    const [ticketList, setTicketList] = useState<ITicket[]>([
        { ...fakeTicket, id: 1, position: { col: 1, grid: 0, row: 2 } },
        { ...fakeTicket, id: 2, position: { col: 2, grid: 0, row: 0 } },
        { ...fakeTicket, id: 3, position: { col: 3, grid: 0, row: 0 } },
        { ...fakeTicket, id: 4, position: { col: 3, grid: 0, row: 2 } },
        { ...fakeTicket, id: 5, position: { col: 4, grid: 0, row: 3 } },
        { ...fakeTicket, id: 6, position: { col: 4, grid: 0, row: 3 } },
        { ...fakeTicket, id: 7 },
        { ...fakeTicket, id: 8 },
        { ...fakeTicket, id: 9 },
        { ...fakeTicket, id: 10 },
        { ...fakeTicket, id: 11 },
        { ...fakeTicket, id: 12 },
    ]);

    const getGridsPaginationNumber = useCallback(() => {
        return ticketList?.length > 0 ? Math.ceil(ticketList.length / (rows * cols)) : 1;
    }, [ticketList, rows, cols]);

    const [gridTab, setGridTab] = useState<ITicket[]>();

    useEffect(() => {
        //construction of an array of all possibilities : { col: 1, grid: 0, row: 2 }
        const tabVerif: { col: number; grid: number; row: number }[] = [];
        for (let iGrid = 0; iGrid < getGridsPaginationNumber(); iGrid++) {
            for (let iRow = 0; iRow < rows; iRow++) {
                for (let iCol = 0; iCol < cols; iCol++) {
                    tabVerif.push({ col: iCol, grid: iGrid, row: iRow });
                }
            }
        }
        //separation of the tickets table in 2 "tickets with positions and tickets without positions
        const tabId: ITicket[] = [];
        const tabNoId: ITicket[] = [];
        ticketList.map((item) => {
            if (!item.position) {
                tabNoId.push(item);
            } else {
                tabId.push(item);
            }
        });

        let tabString = JSON.stringify(tabVerif);
        tabId.map((item) => {
            tabString = tabString.replace(JSON.stringify(item.position) + ",", "");
        });
        const newObj: ITicket[] = [];
        JSON.parse(tabString).map((item, id) => {
            if (tabNoId[id]) {
                newObj.push(Object.assign(tabNoId[id], { position: item }));
            }
        });

        setGridTab(tabId.concat(newObj));
    }, []);

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 10 } }));

    function handleDragStart(event: DragStartEvent) {
        setDraggedItem(event.active.data.current as ITicket);
    }

    function areNaN(data: string[]): boolean {
        return data.some((yolo) => isNaN(Number(yolo)));
    }

    function handleDragEnd(event: DragEndEvent) {
        const draggedId = /[^-]*$/.exec(event.active.id)[0];
        const [grid, row, col, type, ticketId] = event.over.id.split("-");
        if (!areNaN([grid, row, col])) {
            setGridTab((old) =>
                old.map((oldTicket) => {
                    if (oldTicket.id === Number(draggedId)) {
                        return { ...oldTicket, position: { grid: Number(grid), row: Number(row), col: Number(col) } };
                    }
                    if (type === "ticket" && oldTicket.id === Number(ticketId)) {
                        return {
                            ...oldTicket,
                            position: {
                                grid: draggedItem.position.grid,
                                row: draggedItem.position.row,
                                col: draggedItem.position.col,
                            },
                        };
                    }
                    return oldTicket;
                })
            );
        }

        setDraggedItem(undefined);
    }
    return (
        <div>
            <DndContext
                sensors={sensors}
                onDragCancel={() => setDraggedItem(undefined)}
                onDragEnd={handleDragEnd}
                onDragStart={handleDragStart}
                collisionDetection={closestCenter}
            >
                <Grid {...props} droppableId="inventory" ticketList={gridTab} />
                {draggedItem && (
                    <DragOverlay dropAnimation={null}>
                        <Ticket ticket={draggedItem} />
                    </DragOverlay>
                )}
            </DndContext>
        </div>
    );
};

export default DndTest;
