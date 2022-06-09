import React, { ReactElement } from "react";

import { Status, TicketPreview } from "@neomanis/neo-types";
import { getStatusColor } from "../../utils";
import { getTicketLogoByStatus } from "../../utils/ticketLogoByStatus";

interface Props {
    fOpenSimilarTicket?: (ticket: TicketPreview) => void;
    ticket: TicketPreview;
}

const SimilarTicket = ({ fOpenSimilarTicket, ticket }: Props): ReactElement => {
    return (
        <div className="h-12 bg-neo-bg-B flex rounded-md cursor-pointer" onClick={() => fOpenSimilarTicket(ticket)}>
            <div
                className={`h-full w-16 flex justify-center rounded-l-md items-center
                    ${getStatusColor(ticket.status, false, "bg")}
                `}
            >
                {getTicketLogoByStatus(
                    ticket.status,
                    ticket.status === (Status.Solved | Status.Closed) ? "#152535" : "#15304C"
                )}
            </div>
            <div className="flex flex-col px-4 py-1 w-11/12">
                <div className={`font-bold text-sm ${getStatusColor(ticket.status, false, "text")}`}>{ticket.id}</div>
                <div className={`text-neo-light-grey font-bold text-xs truncate`}>{ticket.name}</div>
            </div>
        </div>
    );
};

export default SimilarTicket;
