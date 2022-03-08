import React, { ReactElement } from "react";
import { useDroppable } from "@dnd-kit/core";
import Ticket from "./ticket";

interface DroppableTicketProps {
    droppableId: string;
}

const DroppableTicket = ({ droppableId }: DroppableTicketProps): ReactElement => {
    const { setNodeRef } = useDroppable({
        id: droppableId,
    });
    return (
        <div ref={setNodeRef}>
            <Ticket />
        </div>
    );
};

export default DroppableTicket;
