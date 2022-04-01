import React, { ReactElement } from "react";
import { Status } from "../../enumeration";
import { IconTicketClosed, IconTicketSolved, TicketLogo } from "../../img/svg";

export function getTicketLogoByStatus(ticketStatus: number, fill: string): ReactElement {
    if (ticketStatus === Status.Solved) {
        return <IconTicketSolved fill={fill} />;
    }
    if (ticketStatus === Status.Closed) {
        return <IconTicketClosed fill={fill} />;
    }
    return <TicketLogo fill={fill} />;
}
