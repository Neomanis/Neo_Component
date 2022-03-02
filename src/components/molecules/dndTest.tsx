import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import React, { ReactElement, useRef, useState } from "react";
import { ITicket, Ticket } from "../..";
import Grid, { GridProps } from "./ticket/grid";

interface Props {
    gridProps1: GridProps;
    gridProps2: GridProps;
}

const DndTest = ({ gridProps1, gridProps2 }: Props): ReactElement => {
    const [inbox, setInbox] = useState(gridProps1.ticketList);
    const [inventory, setInventory] = useState(gridProps2.ticketList);

    const [draggedItem, setDraggedItem] = useState<ITicket | undefined>();

    function handleDragStart(event: DragStartEvent) {
        setDraggedItem(event.active.data.current as ITicket);
    }

    function handleDragEnd(event: DragEndEvent) {
        if (event.over && event.over.id === "droppable" + 4 + 4) {
            setInventory((old) => [...old, event.active.data.current as ITicket]);
            setInbox((old) => old.filter((ticket) => ticket.id !== (event.active.data.current as ITicket).id));
        }
    }

    return (
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
            <div className="flex justify-between">
                <Grid {...gridProps1} ticketList={inbox} />
                <Grid {...gridProps2} ticketList={inventory} />
            </div>
            <DragOverlay>
                <Ticket ticket={draggedItem} />
            </DragOverlay>
        </DndContext>
    );
};

export default DndTest;
