import React, { ReactElement } from "react";
import { useDraggable } from "@dnd-kit/core";
import Ticket, { TicketProps } from "./ticket";

interface DraggableTicketProps {
    draggableId: string;
    ticketProps: TicketProps;
}

const DraggableTicket = ({ draggableId, ticketProps }: DraggableTicketProps): ReactElement => {
    const { attributes, listeners, setNodeRef } = useDraggable({
        id: draggableId,
        data: ticketProps.ticket,
    });
    return (
        <div
            ref={draggableId ? setNodeRef : null}
            {...(draggableId ? listeners : {})}
            {...(draggableId ? attributes : {})}
        >
            <Ticket {...ticketProps} />
        </div>
    );
};

export default DraggableTicket;
