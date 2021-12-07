import React, { ReactElement } from "react";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { Icon, IconTicketCategorie, Tooltip } from "../../atoms";
import { getFormatedTimeToNowExtended, getPriorityColor } from "../../utils";
import { ITicket } from "../../../interface";
import i18next from "i18next";
import { IconTicketClosed, TicketLogo } from "../../..";

interface Props {
    fOpenSimilarTicket?: (ticket: ITicket) => void;
    languageUser: string;
    ticket: ITicket;
}

const SimilarTicket = ({ fOpenSimilarTicket, languageUser, ticket }: Props): ReactElement => {
    const myLanguage = i18next.getFixedT(languageUser);

    return (
        <div
            className="bg-neo-bg-B flex cursor-pointer text-white rounded-full h-8"
            onClick={(): void => fOpenSimilarTicket(ticket)}
        >
            <div
                className={`${getPriorityColor(
                    ticket.priority,
                    false
                )} w-auto text-neo-bg-B rounded-l-full flex items-center px-2 font-semibold`}
            >
                {ticket.status > 4 ? (
                    <IconTicketClosed className="w-10" fill="#172f4b" />
                ) : (
                    <TicketLogo className="w-10 px-1" fill="#172f4b" />
                )}
                <div className="pr-2 whitespace-nowrap" data-testid="ticketId">
                    {myLanguage("ticketScreen.id")} {ticket?.id}
                </div>
            </div>
            <div className="flex w-full justify-between p-1">
                <div className="flex items-center px-1 whitespace-nowrap text-neo-link">
                    <Icon fontIcon={faClock} />
                    <p className="ml-2 text-xs ">{getFormatedTimeToNowExtended(ticket?.date_creation, languageUser)}</p>
                </div>
                <div className="flex items-center px-1" data-testId="ticketName">
                    <Tooltip
                        data={ticket.name}
                        position="top"
                        className="bg-neo-bg-A text-white px-4 py-1 rounded"
                        component={<p className="line-clamp-1 text-white">{ticket.name}</p>}
                    />
                </div>
                <div className="flex items-center px-1">
                    <IconTicketCategorie id={ticket ? ticket.itilcategories_id : 0} />
                </div>
            </div>
        </div>
    );
};

export default SimilarTicket;
