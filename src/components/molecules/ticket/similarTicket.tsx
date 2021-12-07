import React, { ReactElement } from "react";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { ReactComponent as TicketClosed } from "../../../img/svg/nm_ico_ticket_closed.svg";
import { ReactComponent as TicketNormal } from "../../../img/svg/nm_ico_ticket_normal.svg";
import { Icon, IconTicketCategorie } from "../../atoms";
import { getFormatedTimeToNowExtended, getPriorityColor } from "../../utils";
import { ITicket } from "../../../interface";

interface Props {
    fOpenSimilarTicket?: (ticket: ITicket) => void;
    languageUser: string;
    ticket: ITicket;
}

const SimilarTicket = ({ fOpenSimilarTicket, languageUser, ticket }: Props): ReactElement => {
    return (
        <div
            className="bg-neo-bg-B flex cursor-pointer text-white rounded-full h-8 w-full"
            onClick={(): void => fOpenSimilarTicket(ticket)}
        >
            <div
                className={`${getPriorityColor(
                    ticket.priority,
                    false
                )} w-32 text-neo-bg-B rounded-l-full flex items-center font-semibold`}
            >
                <div className="w-8">
                    {ticket.status > 4 ? (
                        <TicketClosed className="w-10" fill="#172f4b" />
                    ) : (
                        <TicketNormal className="w-10 px-1" fill="#172f4b" />
                    )}
                </div>
                <div className="flex w-28 justify-self-start pl-1" data-testid="ticketId">
                    {ticket?.id}
                </div>
            </div>
            <div className="flex w-full justify-between p-1 group">
                <div className="flex items-center px-1 whitespace-nowrap text-neo-link">
                    <Icon fontIcon={faClock} className="group-hover:hidden" />
                    <p className="ml-2 text-xs group-hover:hidden">
                        {getFormatedTimeToNowExtended(ticket?.date_creation, languageUser)}
                    </p>
                </div>
                <div className="flex items-center px-1" data-testid="ticketName">
                    <p className="line-clamp-1 text-white text-sm">{ticket.name}</p>
                </div>
                <div className="flex items-center px-1">
                    <IconTicketCategorie id={ticket ? ticket.itilcategories_id : 0} />
                </div>
            </div>
        </div>
    );
};

export default SimilarTicket;
