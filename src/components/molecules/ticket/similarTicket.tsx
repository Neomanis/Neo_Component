import React, { ReactElement } from "react";
import { faClock } from "@fortawesome/free-regular-svg-icons";

import { Icon, IconTicketCategorie } from "../../atoms";
import { getFormatedTimeToNowExtended, getPriorityColor, getStatusColor } from "../../utils";
import { IconCheck, IconTicketClosed, TicketLogo } from "../../../img/svg";
import { ISimilarTicket } from "../../../interface";
import { Status } from "../../../enumeration";

interface Props {
    fOpenSimilarTicket?: (ticket: ISimilarTicket) => void;
    languageUser: string;
    ticket: ISimilarTicket;
}

const SimilarTicket = ({ fOpenSimilarTicket, languageUser, ticket }: Props): ReactElement => {
    function getTicketLogoByStatus(status: number): ReactElement {
        if (status === Status.Solved) {
            return (
                <div className="relative">
                    <IconCheck className="absolute -right-1" />
                    <TicketLogo fill={"#15304C"} />
                </div>
            );
        }
        if (status === Status.Closed) {
            return <IconTicketClosed fill="#152535" className="w-8 h-8" />;
        }

        return <TicketLogo fill={"#15304C"} />;
    }

    return (
        <div className="h-12 bg-neo-bg-B flex rounded-md">
            <div
                className={`h-full w-16 flex justify-center items-center ${getStatusColor(ticket.status, false, "bg")}`}
            >
                {getTicketLogoByStatus(ticket.status)}
            </div>
            <div className="flex flex-col p-2 w-11/12">
                <div className={`text-neo-light-grey font-bold text-xs truncate`}>{ticket.name}</div>
                <div className="font-bold text-xxs text-neo-blue-secondary">{ticket.id}</div>
            </div>
        </div>
    );
    // return (
    //     <div
    //         className="bg-neo-bg-B flex cursor-pointer text-white rounded-full h-8 w-full"
    //         onClick={(): void => fOpenSimilarTicket(ticket)}
    //     >
    //         <div
    //             className={`${getPriorityColor(
    //                 ticket.priority,
    //                 false,
    //                 "bg"
    //             )} w-1/3 text-neo-bg-B rounded-l-full flex items-center font-semibold`}
    //         >
    //             <div>
    //                 {ticket.status > 4 ? (
    //                     <IconTicketClosed className="w-10 px-2" fill="#172f4b" />
    //                 ) : (
    //                     <TicketLogo className="w-10 px-2" fill="#172f4b" />
    //                 )}
    //             </div>
    //             <div className="flex w-28 justify-self-start" data-testid="ticketId">
    //                 {ticket?.id}
    //             </div>
    //         </div>
    //         <div className="flex px-2 group justify-between w-full">
    //             <div className="flex items-center">
    //                 <IconTicketCategorie id={ticket ? ticket.itilcategories_id : 0} />
    //             </div>
    //             <div className="flex items-center px-1" data-testid="ticketName">
    //                 <p className="line-clamp-1 text-white text-sm w-full">{ticket.name}</p>
    //             </div>
    //             <div className="items-center whitespace-nowrap text-neo-link hidden group-hover:flex">
    //                 <p className="ml-2 text-xs ">{getFormatedTimeToNowExtended(ticket?.date_creation, languageUser)}</p>
    //             </div>
    //             <div className="flex items-center px-1 whitespace-nowrap text-neo-link ml-auto">
    //                 <Icon fontIcon={faClock} />
    //             </div>
    //         </div>
    //     </div>
    // );
};

export default SimilarTicket;
