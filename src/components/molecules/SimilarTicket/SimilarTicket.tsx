import React, { ReactElement } from "react";
import { TicketPreview, Status } from "@neomanis/neo-types";
import { getTicketLogoByStatus } from "@/utils/ticketLogoByStatus";
import { getStatusColor } from "@/utils/statusTools";
import { getDisplayedTicketUid } from "@/utils/tools";

export interface SimilarTicketProps {
    fOpenSimilarTicket?: (ticket: TicketPreview) => void;
    ticket: TicketPreview;
}

const SimilarTicket = ({ fOpenSimilarTicket, ticket }: SimilarTicketProps): ReactElement => {
    return (
        <div className="h-12 bg-neo-bg-B flex rounded-md cursor-pointer" onClick={() => fOpenSimilarTicket(ticket)}>
            <div
                className={`h-full w-16 flex justify-center rounded-l-md items-center
                    ${getStatusColor(ticket.status, false, "bg")}
                `}
            >
                {getTicketLogoByStatus(
                    ticket.status,
                    ticket.status === (Status.Solved | Status.Closed) ? "#152535" : "#0E3864"
                )}
            </div>
            <div className="flex flex-col px-4 py-1 w-11/12">
                <div className={`font-bold text-sm ${getStatusColor(ticket.status, false, "text")}`}>
                    {getDisplayedTicketUid(ticket.uid, ticket.type)}
                </div>
                <div className={`text-neo-light-grey font-bold text-xs truncate`}>{ticket.name}</div>
            </div>
        </div>
    );
};

export default SimilarTicket;
