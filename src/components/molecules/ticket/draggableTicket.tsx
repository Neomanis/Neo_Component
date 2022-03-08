import React, { ReactElement } from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import Ticket, { TicketProps } from "./ticket";
import { useCombinedRefs } from "../../utils/hooks/useCombinedRef";

interface DraggableTicketProps {
    dndId: string;
    ticketProps: TicketProps;
}

const DraggableTicket = ({ dndId, ticketProps }: DraggableTicketProps): ReactElement => {
    const {
        attributes,
        listeners,
        setNodeRef: draggableRef,
    } = useDraggable({
        id: dndId,
        data: ticketProps.ticket,
    });
    const { setNodeRef: droppableRef } = useDroppable({
        id: dndId,
    });

    const combinedRef = useCombinedRefs(draggableRef, droppableRef);
    return (
        <div
            ref={ticketProps.ticket ? combinedRef : droppableRef}
            {...listeners}
            {...attributes}
            className={`${ticketProps.ticket ? "cursor-pointer" : "cursor-default"}`}
        >
            <Ticket {...ticketProps} />
        </div>
    );
};

export default DraggableTicket;
