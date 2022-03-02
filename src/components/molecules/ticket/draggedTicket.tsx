import React, { ReactElement } from "react";
import { TicketLogo } from "../../../img/svg";
import { Hexagon } from "../../atoms";
import { getHexColorFromTailwindColor } from "../../utils";

interface Props {
    yolo: string;
}

const DraggedTicket = ({ yolo }: Props): ReactElement => {
    return (
        <>
            <div className="w-40 h-40 transform" data-testid="ticket-empty-body">
                <div className="absolute w-full flex items-center justify-center">
                    <div className="absolute">
                        <TicketLogo fill={getHexColorFromTailwindColor("neo-light-grey")} />
                    </div>
                    <Hexagon bgColor={getHexColorFromTailwindColor("neo-light-grey")} />
                </div>
            </div>
        </>
    );
};

export default DraggedTicket;
