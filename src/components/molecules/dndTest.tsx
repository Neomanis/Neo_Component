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
import React, { ReactElement, useState } from "react";
import { Status } from "../../enumeration";
import { ITicket } from "../../interface";
import { fakeGlpiGroups, fakeGlpiUsers, fakeTicket } from "../../stories/fakeObject";
import Grid, { GridProps } from "./ticket/grid";
import Ticket from "./ticket/ticket";

interface Props {
    title: string;
}

const DndTest = ({ title }: Props): ReactElement => {
    const props: GridProps = {
        rows: 4,
        cols: 5,
        fCurrentTicket: () => console.log("fCurrentTicket"),
        showPagination: true,
        reverseGrid: false,
        languageUser: "en-GB",
    };
    const [draggedItem, setDraggedItem] = useState<ITicket>();
    const [ticketList, setTicketList] = useState<ITicket[]>([
        { ...fakeTicket, id: 1, position: { col: 1, grid: 0, row: 2 } },
        { ...fakeTicket, id: 2, position: { col: 2, grid: 0, row: 0 } },
        { ...fakeTicket, id: 3, position: { col: 3, grid: 0, row: 0 } },
        { ...fakeTicket, id: 4, position: { col: 3, grid: 0, row: 2 } },
        { ...fakeTicket, id: 5, position: { col: 4, grid: 0, row: 3 } },
    ]);

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 10 } }));

    function handleDragStart(event: DragStartEvent) {
        setDraggedItem(event.active.data.current as ITicket);
    }

    function areNaN(data: string[]): boolean {
        return data.some((yolo) => isNaN(Number(yolo)));
    }

    function handleDragEnd(event: DragEndEvent) {
        const draggedId = /[^-]*$/.exec(event.active.id)[0];
        const [grid, row, col, gridName, type, ticketId] = event.over.id.split("-");
        if (!areNaN([grid, row, col])) {
            setTicketList((old) =>
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
                <Grid {...props} droppableId="inventory" ticketList={ticketList} />
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
