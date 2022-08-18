import React, { ReactElement } from "react";
import { QueueIconEmpty } from "../../img/png";
import { NeoLogo, TicketLogo } from "../../img/svg";
import { Img } from "../atoms";

interface Props {
    className?: string;
    message: string;
    showEllipsis?: boolean;
    topRightImg?: string;
}

const NeoBotOpenTicket = ({
    className,
    message,
    showEllipsis = true,
    topRightImg = QueueIconEmpty,
}: Props): ReactElement => {
    return (
        <div
            className={`bg-neo-expanded w-full h-full flex text-white ${className}`}
            data-testid="neobot-openTicket-body"
        >
            <div className="m-auto px-5">
                <div className="flex relative w-24 mx-auto" data-testid="neobot-openTicket-logo">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 jumpIn">
                        <TicketLogo className="animate-fadeJump" width={25} fill="#FFF" />
                    </div>
                    <NeoLogo className="animate-swing" viewBox="300 0 400 325" />
                    <div className="absolute -top-8 -right-6" data-testid="neobot-openTicket-inbox">
                        <Img type="" className="w-8" data={{ src: topRightImg }} />
                    </div>
                </div>
                <div
                    data-testid="neobot-openTicket-message"
                    className={`flex ${
                        message.length > 28 ? "flex-col" : ""
                    } items-center font-semibold text-center pt-5`}
                >
                    {message}
                    {showEllipsis && (
                        <div className="flex px-1" data-testid="neobot-openTicket-ellipsis">
                            <div className="animate-show">.</div>
                            <div className="animate-show" style={{ animationDelay: "300ms" }}>
                                .
                            </div>
                            <div className="animate-show" style={{ animationDelay: "600ms" }}>
                                .
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NeoBotOpenTicket;
