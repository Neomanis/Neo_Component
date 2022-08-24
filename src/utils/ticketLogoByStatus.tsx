import React, { ReactElement } from "react";
import { Status } from "@neomanis/neo-types";
import { IconTicketClosed, IconTicketSolved, TicketLogo } from "@/img/svg";

export function getTicketLogoByStatus(ticketStatus: number, fill: string, logoWith = 32): ReactElement {
    if (ticketStatus === Status.Solved) {
        return <IconTicketSolved width={logoWith} fill={fill} />;
    }
    if (ticketStatus === Status.Closed) {
        return <IconTicketClosed width={logoWith} fill={fill} />;
    }
    return <TicketLogo width={logoWith} fill={fill} />;
}
