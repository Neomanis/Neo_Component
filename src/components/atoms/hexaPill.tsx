import React, { ReactElement } from "react";
import { HexagonResources } from "../../img/svg";
import { getDisplayedTicketUid } from "../utils";

interface Props {
    color: string;
    ticketUid: string;
}

const HexaPill = ({ color, ticketUid }: Props): ReactElement => {
    return (
        <div className="relative" data-testid="hexaPill-body">
            <HexagonResources width={60} fill="none" stroke={color} strokeWidth={3} />
            <div
                style={{ color }}
                className="absolute w-full text-center text-xxs leading-3 top-1/2 transform -translate-y-1/2"
            >
                {getDisplayedTicketUid(ticketUid)
                    .split(" ")
                    .map((word) => (
                        <div>{word}</div>
                    ))}
            </div>
        </div>
    );
};

export default HexaPill;
