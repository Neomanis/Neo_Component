import React, { ReactElement } from "react";

import { IconTicketClosed, IconTicketSolved, TicketLogo } from "../../../img/svg";
import { Status } from "../../../enumeration";
import { ISimilarTicket } from "../../../interface";
import { getStatusColor } from "../../utils";

interface Props {
    fOpenSimilarTicket?: (ticket: ISimilarTicket) => void;
    ticket: ISimilarTicket;
}

const SimilarTicket = ({ fOpenSimilarTicket, ticket }: Props): ReactElement => {
    function getTicketLogoByStatus(status: number): ReactElement {
        if (status === Status.Solved) {
            return <IconTicketSolved fill="#152535" />;
        }
        if (status === Status.Closed) {
            return <IconTicketClosed fill="#152535" />;
        }

        return <TicketLogo fill={"#15304C"} />;
    }

    return (
        <div className="h-12 bg-neo-bg-B flex rounded-md cursor-pointer" onClick={() => fOpenSimilarTicket(ticket)}>
            <div
                className={`h-full w-16 flex justify-center rounded-l-md items-center
                    ${getStatusColor(ticket.status, false, "bg")}
                `}
            >
                {getTicketLogoByStatus(ticket.status)}
            </div>
            <div className="flex flex-col px-4 py-1 w-11/12">
                <div className={`font-bold text-sm ${getStatusColor(ticket.status, false, "text")}`}>{ticket.id}</div>
                <div className={`text-neo-light-grey font-bold text-xs truncate`}>{ticket.name}</div>
            </div>
        </div>
    );
};

export default SimilarTicket;
