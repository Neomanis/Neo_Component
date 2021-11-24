import React, { ReactElement } from "react";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { ReactComponent as TicketClosed } from "../../../img/svg/nm_ico_ticket_closed.svg";
import { ReactComponent as TicketNormal } from "../../../img/svg/nm_ico_ticket_normal.svg";
import { Icon, IconTicketCategorie } from "../../atoms";
import { getFormatedTimeToNowExtended, getPriorityColor, ITicket } from "../../..";
import i18next from "i18next";

interface Props {
    fOpenSimilarTicket?: (ticket: ITicket) => void;
    languageUser: string;
    ticket: ITicket;
}

const SimilarTicket = ({ fOpenSimilarTicket, languageUser, ticket }: Props): ReactElement => {
    const myLanguage = i18next.getFixedT(languageUser);

    return (
        <div
            className="bg-neo_blue flex cursor-pointer text-neo_blue-light rounded-full"
            onClick={(): void => fOpenSimilarTicket(ticket)}
        >
            <div
                className={`${getPriorityColor(
                    ticket.priority,
                    false
                )} w-auto text-neo_blue rounded-l-full flex items-center px-2 font-semibold`}
            >
                {ticket.status > 4 ? (
                    <TicketClosed className="w-10" fill="#172f4b" />
                ) : (
                    <TicketNormal className="w-10 px-1" fill="#172f4b" />
                )}
                <div className="pr-2 whitespace-nowrap" data-testId="ticketId">
                    {myLanguage("ticketScreen.id")} {ticket?.id}
                </div>
            </div>
            <div className="flex w-full justify-between p-2">
                <div className="flex items-center px-3 whitespace-nowrap">
                    <Icon fontIcon={faClock} />
                    <p className="ml-2">{getFormatedTimeToNowExtended(ticket?.date_creation, languageUser)}</p>
                </div>
                <div className="flex items-center px-3" data-testId="ticketName">
                    <p className="line-clamp-1">{ticket.name}</p>
                </div>
                <div className="flex items-center px-3">
                    <IconTicketCategorie id={ticket ? ticket.itilcategories_id : 0} />
                </div>
            </div>
        </div>
    );
};

export default SimilarTicket;
