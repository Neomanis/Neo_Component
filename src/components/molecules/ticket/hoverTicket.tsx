import React, { ReactElement } from "react";
import { ITicket } from "../../../interface";

import { formatDistanceToNowStrict } from "date-fns";
import { faClock, faExpandArrowsAlt, faComment, faChartLine } from "@fortawesome/free-solid-svg-icons";
import { getPriorityColor, getStatusColor } from "../../utils/ticketColorSelector";
import { Button, Hexagon, Icon, IconTicketCategorie, Img } from "../../atoms";

//translations
import i18next from "i18next";

interface Props {
    dataView?: React.RefObject<HTMLHeadingElement>;
    fChatModalOpen?: () => void;
    fMouseLeave?: () => void;
    fOpenModalCurrentTicket?: (ticket: ITicket) => void;
    fTicketModalOpen?: () => void;
    languageUser: string;
    ticket: ITicket;
    ticketRequester?: string;
}

const HoverTicket = ({
    dataView,
    fChatModalOpen,
    fMouseLeave,
    fOpenModalCurrentTicket,
    fTicketModalOpen,
    languageUser,
    ticket,
    ticketRequester,
}: Props): ReactElement => {
    const position = dataView?.current ? dataView?.current.getBoundingClientRect() : null;
    const myLanguage = i18next.getFixedT(languageUser);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function displayModalWithinScreen(positionData: any): any {
        //the value 156px is equal to the half of the open modal (384 / 2 = 192px)
        //minus the translation of the demi hexagon to the left (20px)
        //minus the difference between hexagon container and displayed hexagon divided by 2 ((153 - 120) / 2 = 16px)
        const { left, top } = positionData;
        if (left < 156) {
            return {
                top: top,
                left: 156,
            };
        } else if (left > window.innerWidth - 156 * 2) {
            return {
                top: top,
                left: window.innerWidth - 156 * 2,
            };
        } else {
            return {
                top: top,
                left: left,
            };
        }
    }

    return (
        <div
            className={`absolute z-10 -ml-5`}
            onClick={(): void => fOpenModalCurrentTicket && fOpenModalCurrentTicket(ticket)}
            onMouseLeave={fMouseLeave}
            style={{
                ...displayModalWithinScreen(position ? position : { top: 0, left: 0 }),
                zIndex: 20,
                transform: "translateX(-192px) translateY(8px) ",
            }}
        >
            <div className={`useOnClickOutsideException flex animate-postionHover`}>
                <div className={`w-24 z-10 animate-leftH `} style={{ transform: "translateX(20px)" }}>
                    <div
                        className={`absolute ${getPriorityColor(ticket.priority, false)}`}
                        style={{ width: 58, height: 29, top: 61, left: 38 }}
                    ></div>
                    <Hexagon
                        bgColor={ticket.status ? getStatusColor(ticket.status, true) : "#dae5e5"}
                        type={"leftHalf"}
                    />
                </div>
                <div className={`w-96 z-30 transform -translate-y-1 animate-widthAnim overflow-hidden`}>
                    <div className={`relative h-36 overflow-hidden bg-neo_blue rounded flex justify-between p-3 w-96`}>
                        <div className="flex flex-col text-left justify-between w-2/3">
                            <div className="text-white">
                                <div className="text-xl ">
                                    {myLanguage("ticketScreen.id")} {ticket.id}
                                </div>
                                <div>{ticket.name}</div>
                            </div>
                            <div className="text-xs">
                                <div className="text-neo_blue-light font-bold">
                                    {myLanguage("ticketScreen.keyDetected")}
                                </div>
                                <div className="truncate text-white">keyword, another keyword</div>
                            </div>
                        </div>
                        <div className="flex flex-col text-right h-full justify-between w-1/3">
                            <div className="flex justify-around text-neo_blue-light w-full">
                                <div className=" text-2xl">
                                    <IconTicketCategorie id={ticket ? ticket.itilcategories_id : 0} />
                                </div>
                                <div className="flex items-center">
                                    <Icon fontIcon={faClock} />
                                    <p className="ml-1">{formatDistanceToNowStrict(new Date(ticket.date_creation))}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-center">
                                <div className="flex flex-col items-end">
                                    <div className="rounded-full overflow-hidden w-8 mb-1 ">
                                        <Img type="imgProfil" />
                                    </div>
                                    <div className="text-white text-xs text-right">
                                        <div>{ticketRequester}</div>
                                        <div>Platypus Department</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center transform -translate-y-3 z-30">
                        <Button
                            className={
                                "bg-neo_blue-light flex justify-center items-center cursor-default rounded-full w-10 h-10 border border-neo_blue-dark"
                            }
                            disabled
                            fontIcon={faChartLine}
                            iconClassName={"text-neo_lite"}
                            type="button"
                        />
                        <Button
                            className={
                                "bg-neo_blue-light flex justify-center items-center cursor-default rounded-full w-10 h-10 border border-neo_blue-dark transform hover:scale-110"
                            }
                            fCallback={fChatModalOpen}
                            fontIcon={faComment}
                            iconClassName={"text-neo_lite"}
                            type="button"
                        />
                        <Button
                            className={
                                "bg-neo_blue-light flex justify-center items-center cursor-pointer transform hover:scale-110 transition-all rounded-full w-10 h-10 border border-neo_blue-dark"
                            }
                            fCallback={(): void => {
                                fOpenModalCurrentTicket && fOpenModalCurrentTicket(ticket);
                                fTicketModalOpen && fTicketModalOpen();
                            }}
                            fontIcon={faExpandArrowsAlt}
                            iconClassName={"text-neo_blue-dark"}
                            type="button"
                        />
                    </div>
                </div>
                <div className={`w-24 z-10 animate-rightH `} style={{ transform: "translateX(-20px)" }}>
                    <div
                        className={`absolute ${getPriorityColor(ticket.priority, false)}`}
                        style={{ width: 58, height: 29, top: 61, right: 39 }}
                    ></div>
                    <Hexagon type={"rightHalf"} bgColor={getStatusColor(ticket.status, true)} />
                </div>
            </div>
        </div>
    );
};

export default HoverTicket;