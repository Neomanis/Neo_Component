import React, { ReactElement, useCallback, useEffect, useState } from "react";

import { IGlpiRequest, IGlpiUsers, ITicket } from "../../../interface";
import { displayRequesterName } from "../../utils";
import { IconArrowLeft, IconArrowRight } from "../../../img/svg";
import { Button } from "../../atoms";
import HoverTicket from "./hoverTicket";
import Ticket from "./ticket";

interface Props {
    cols: number;
    currentTicket?: ITicket;
    fChatModalOpen?: () => void;
    fCurrentTicket?: (ticket: ITicket) => void;
    fOpenModalCurrentTicket?: () => void;
    fTicketModalOpen?: () => void;
    glpiGroups?: IGlpiRequest[];
    glpiUsers?: IGlpiUsers[];
    showBackgroundIcon?: boolean;
    languageUser: string;
    reverseGrid?: boolean;
    rows: number;
    showPagination?: boolean;
    ticketList?: ITicket[];
    withHover?: boolean;
}

interface BlankHexagon {
    id: number;
    name: "blank";
}

const Grid = ({
    cols,
    currentTicket,
    fChatModalOpen,
    fCurrentTicket,
    fOpenModalCurrentTicket,
    fTicketModalOpen,
    glpiGroups,
    glpiUsers,
    showBackgroundIcon,
    languageUser,
    reverseGrid,
    rows,
    showPagination,
    ticketList,
    withHover,
}: Props): ReactElement => {
    // grids is a 3D array, the first is the number of pagination
    // second one is the number of collumns
    // third is the number of rows
    const [grids, setGrids] = useState<(ITicket | BlankHexagon)[][][]>([]);
    const [currentPageNumber, setCurrentPageNumber] = useState(0);
    const [hoverTicket, setHoverTicket] =
        useState<{ ticket: ITicket; position: React.RefObject<HTMLHeadingElement> }>();

    const getGridsPaginationNumber = useCallback(() => {
        return ticketList?.length > 0 ? Math.ceil(ticketList.length / (rows * cols)) : 1;
    }, [ticketList, rows, cols]);

    function isTypeOfTicket(item: ITicket | BlankHexagon) {
        return Boolean((item as ITicket).similarTickets);
    }

    function createGrids(tickets: ITicket[]) {
        const gridsInitialization: (ITicket | BlankHexagon)[][][] = [];

        // grids creation
        for (let gridIndex = 0; gridIndex < getGridsPaginationNumber(); gridIndex++) {
            const grid: (ITicket | BlankHexagon)[][] = [];
            // rows creation
            for (let index = 0; index < rows; index++) {
                grid.push(
                    // cols creation
                    Array.from({ length: cols }, (_, i) => {
                        let item: ITicket | BlankHexagon = { id: i, name: "blank" };
                        if (tickets[0]) {
                            item = tickets[0];
                            tickets.shift();
                        }
                        return item;
                    })
                );
            }
            gridsInitialization.push(grid);
        }

        setGrids(gridsInitialization);
    }

    function changePage(direction: "prev" | "next"): void {
        if (direction === "prev") {
            setCurrentPageNumber((pageNumber) => (pageNumber === 0 ? getGridsPaginationNumber() - 1 : pageNumber - 1));
        } else {
            setCurrentPageNumber((pageNumber) => (pageNumber === getGridsPaginationNumber() - 1 ? 0 : pageNumber + 1));
        }
    }

    useEffect(() => {
        createGrids(ticketList ? Array.from(ticketList) : []);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ticketList]);

    return (
        <>
            {withHover && hoverTicket && (
                <HoverTicket
                    dataView={hoverTicket.position}
                    fChatModalOpen={() => fChatModalOpen && fChatModalOpen()}
                    fMouseLeave={(): void => setHoverTicket(undefined)}
                    fOpenModalCurrentTicket={(ticket) => {
                        fOpenModalCurrentTicket && fOpenModalCurrentTicket();
                        fCurrentTicket && fCurrentTicket(ticket);
                    }}
                    fTicketModalOpen={() => fTicketModalOpen && fTicketModalOpen()}
                    languageUser={languageUser}
                    ticket={hoverTicket.ticket}
                    ticketRequester={displayRequesterName(hoverTicket.ticket, glpiUsers, glpiGroups)}
                    keywords={hoverTicket.ticket.keywords}
                />
            )}
            <div className={`${cols === 1 && "w-52"}`} data-testid="grid-body">
                {showPagination && getGridsPaginationNumber() > 1 && (
                    <div className={`flex text-xl justify-end items-center text-neo-link`}>
                        <p className="mr-4" data-testid="grid-page-number">
                            {currentPageNumber + 1}/{getGridsPaginationNumber()}
                        </p>
                        <Button
                            className="cursor-pointer w-5 pr-1 transform hover:scale-105"
                            fCallback={(): void => changePage("prev")}
                            svg={<IconArrowLeft fill="#7DAAB7" />}
                            testId="grid-page-left-button"
                        />
                        <Button
                            className="cursor-pointer w-5 pl-1 transform hover:scale-105"
                            fCallback={(): void => changePage("next")}
                            svg={<IconArrowRight fill="#7DAAB7" />}
                            testId="grid-page-right-button"
                        />
                    </div>
                )}
                {grids.map((grid, key) => (
                    <div
                        className={`transform scale-73 -mt-8  
                    ${cols > 3 ? "-translate-x-8" : ""}
                    ${showPagination && getGridsPaginationNumber() > 1 ? " -mt-16" : ""} 
                    ${currentPageNumber !== key ? "hidden" : ""}`}
                        id={"gridId-" + key}
                        key={"grid-" + key}
                        data-testid="grid-element"
                    >
                        {grid.map((row, id) => (
                            <div
                                className={`flex transform scale-120 z-auto 
                                    ${
                                        reverseGrid
                                            ? Number.isInteger(id / 2) && "translate-x-23"
                                            : !Number.isInteger(id / 2) && "translate-x-23"
                                    }`}
                                key={"row-" + id}
                                data-testid="grid-row"
                            >
                                {row.map((item, key) => (
                                    <div key={"ticket-" + key} className="-mx-2" data-testid="grid-ticket">
                                        {isTypeOfTicket(item) ? (
                                            <Ticket
                                                ticket={item as ITicket}
                                                currentTicket={currentTicket}
                                                fOpenModalCurrentTicket={(ticket) => {
                                                    fOpenModalCurrentTicket && fOpenModalCurrentTicket();
                                                    fCurrentTicket && fCurrentTicket(ticket);
                                                }}
                                                fOverCallBack={setHoverTicket}
                                                languageUser={languageUser}
                                            />
                                        ) : (
                                            <Ticket iconBG={showBackgroundIcon} />
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Grid;
