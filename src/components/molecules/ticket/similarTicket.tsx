import React, { ReactElement } from "react";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { ReactComponent as TicketClosed } from "../../../img/svg/nm_ico_ticket_closed.svg";
import { Icon, IconTicketCategorie } from "../../atoms";
import { ITicket } from "../../..";
import { formatDistanceToNowStrict } from "date-fns";
import i18next from "i18next";

interface Props {
    languageUser: string;
    ticket: ITicket;
}

const SimilarTicket = ({ languageUser, ticket }: Props): ReactElement => {
    const myLanguage = i18next.getFixedT(languageUser);

    return (
        <div className="bg-neo_blue flex cursor-pointer text-neo_blue-light rounded-full">
            <div className="bg-neo_green-base w-auto text-neo_blue rounded-l-full flex items-center px-2 font-semibold">
                <TicketClosed className="w-10" fill="#172f4b" />
                <div className="pr-2 whitespace-nowrap">
                    {myLanguage("ticketScreen.id")} {ticket?.id}
                </div>
            </div>
            <div className="flex w-full justify-between p-2">
                <div className="flex items-center px-3 whitespace-nowrap">
                    <Icon fontIcon={faClock} />
                    <p className="ml-2">{formatDistanceToNowStrict(new Date(ticket?.date_creation))}</p>
                </div>
                <div className="flex items-center px-3">
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
