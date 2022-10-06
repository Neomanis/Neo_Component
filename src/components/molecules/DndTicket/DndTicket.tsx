import React, { ComponentProps, ReactElement, useMemo } from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { Loader } from "@/components/atoms";
import { useCombinedRefs } from "@/utils/hooks/useCombinedRef";
import Ticket from "../Ticket";

export interface DndTicketProps {
    dndId: string;
    ticketProps: ComponentProps<typeof Ticket>;
}

const DndTicket = ({ dndId, ticketProps }: DndTicketProps): ReactElement => {
    const isTicketPositionLoading = useMemo(() => {
        return ticketProps.ticket?.isPositionLoading;
    }, [ticketProps]);

    const {
        attributes,
        listeners,
        setNodeRef: draggableRef,
    } = useDraggable({
        id: dndId,
        data: ticketProps.ticket,
        disabled: ticketProps.gridId === "problems" || ticketProps.isOpacity,
    });

    const { active, setNodeRef: droppableRef } = useDroppable({
        id: dndId,
    });

    const combinedRef = useCombinedRefs(draggableRef, droppableRef);

    return (
        <div
            ref={ticketProps.ticket ? combinedRef : droppableRef}
            {...listeners}
            {...attributes}
            className={`relative w-[135px] h-[135px] 
            ${ticketProps.ticket && !ticketProps.isOpacity ? "cursor-pointer" : "cursor-default"}`}
        >
            {isTicketPositionLoading && (
                <div className="absolute transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
                    <Loader type="circleOnly" className="text-neo-red" />
                </div>
            )}
            <div className={`${dndId === active?.id || isTicketPositionLoading ? "opacity-50" : ""}`}>
                <Ticket {...ticketProps} />
            </div>
        </div>
    );
};

export default DndTicket;
