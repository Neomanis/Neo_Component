import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import React, { ReactElement, useState } from "react";
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

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

    function handleDragStart(event: DragStartEvent) {
        setDraggedItem(event.active.data.current as ITicket);
    }

    function handleDragEnd(event: DragEndEvent) {
        if (event.over && event.over.id === "yoloswag") {
            setInventory((old) => [...old, draggedItem]);
            setInbox((old) => old.filter((ticket) => ticket.id !== draggedItem.id));
            setDraggedItem(undefined);
        }
    }

    return (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
            <div className="flex justify-between">
                <Grid {...gridProps1} ticketList={inbox} />
                <Grid {...gridProps2} ticketList={inventory} droppableId="yoloswag" />
            </div>
            {draggedItem && (
                <DragOverlay dropAnimation={null}>
                    <Ticket ticket={draggedItem} />
                </DragOverlay>
            )}
        </DndContext>
    );
};

export default DndTest;
