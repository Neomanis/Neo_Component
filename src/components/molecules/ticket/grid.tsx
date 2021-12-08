import React, { ReactElement, useEffect, useState } from "react";

import { ITicket } from "../../../interface";

import HoverTicket from "./hoverTicket";
import Ticket from "./ticket";
import Button from "../../atoms/button";
//icon
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { displayRequesterName } from "../../utils/displayRequesterName";
import { IGlpiRequest, IGlpiUsers } from "../../../interface";

interface Props {
    col: number;
    currentTicket?: ITicket;
    fChatModalOpen?: () => void;
    fCurrentTicket?: (ticket: ITicket) => void;
    fOpenModalCurrentTicket?: () => void;
    fTicketModalOpen?: () => void;
    glpiGroups?: IGlpiRequest[];
    glpiUsers?: IGlpiUsers[];
    iconBG?: boolean;
    languageUser: string;
    paginationGrid?: boolean;
    row: number;
    tickets?: ITicket[];
    withHover?: true;
}

interface BlankTab {
    id: number;
    name: string;
}

const Grid = ({
    col,
    currentTicket,
    fChatModalOpen,
    fCurrentTicket,
    fOpenModalCurrentTicket,
    fTicketModalOpen,
    glpiGroups,
    glpiUsers,
    iconBG,
    languageUser,
    paginationGrid,
    row,
    tickets,
    withHover,
}: Props): ReactElement => {
    const tabTickets = tickets
        ? tickets?.length !== 0
            ? tickets
            : [{ id: 0, name: "blank" }]
        : [{ id: 0, name: "blank" }];

    const [tabGrid, setTabGrid] = useState<Array<Array<ITicket[]>>>();
    const [numberGrid, setNumbertGrid] = useState(0);
    const [hoverTicket, setHoverTicket] =
        useState<{ ticket: ITicket; position: React.RefObject<HTMLHeadingElement> }>();

    // Calculation of the number of pages
    const pageGrid = Math.ceil(tabTickets.length / (row * col));

    /** This function transforms the object tab from the component input in a more complex tab.
     *  It uses Props: Row and Col of the Component to define the future size of the ticket grid.
     *  Row - line
     *  Col - Column
     * It starts by dividing the table of objects in smaller tables (Row X object)
     * If the last table does not match the size of a line, it fills it with empty objects
     * It then groups the lines in tables by Col x table [object] to form the grids of the tickets,
     * if the size of the last grid of tickets are too small compared to the size requested, then it fills the missing row with the blanck row.
     */

    function tabSpliter(): void {
        const tabRow: Array<ITicket[]> & Array<BlankTab[]> = [];
        const grid: Array<Array<ITicket[] | BlankTab[]>> = [];

        //build row
        if (tabTickets) {
            tabTickets.forEach((item) => {
                if (!tabRow.length || tabRow[tabRow.length - 1].length === col) tabRow.push([]);
                tabRow[tabRow.length - 1].push(item);
            });
        }
        const numcol = col - tabRow[tabRow.length - 1].length;
        //complete row
        for (let i = 1; i <= numcol; i++) {
            tabRow[tabRow.length - 1].push({ id: 0, name: "blank" });
        }
        //build col
        tabRow.forEach((tab) => {
            if (!grid.length || grid[grid.length - 1].length === row) grid.push([]);
            grid[grid.length - 1].push(tab);
        });

        const gridDefault = [];

        const numrow = row - grid[grid.length - 1].length;

        //complete col
        for (let i = 0; i <= row; i++) {
            if (i < col) {
                gridDefault.push({ id: 0, name: "blank" });
            }
            if (i < numrow) {
                grid[grid.length - 1].push(gridDefault);
            }
        }

        setTabGrid(grid);
    }

    function nextAndPrevious(val: number): void {
        if (val > 0) {
            if (numberGrid < pageGrid - 1) {
                setNumbertGrid(numberGrid + val);
            } else {
                setNumbertGrid(0);
            }
        } else {
            if (numberGrid === 0) {
                setNumbertGrid(pageGrid - 1);
            } else {
                setNumbertGrid(numberGrid + val);
            }
        }
    }

    useEffect(() => {
        tabSpliter();
        setNumbertGrid(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tickets]);
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
            <div className={`${col === 1 ? "w-52" : ""}`}>
                {paginationGrid && pageGrid > 1 && (
                    <div className={`flex text-xl justify-end items-center text-neo-link`}>
                        <p className="pt-1 mr-4">
                            {numberGrid + 1}/{pageGrid}
                        </p>
                        <Button
                            className="hover:text-white cursor-pointer flex items-center transform rotate-90 text-3xl"
                            fCallback={(): void => nextAndPrevious(-1)}
                            fontIcon={faSortDown}
                        />
                        <Button
                            className="hover:text-white cursor-pointer flex items-center transform -rotate-90 text-3xl"
                            fCallback={(): void => nextAndPrevious(1)}
                            fontIcon={faSortDown}
                        />
                    </div>
                )}
                {tabGrid &&
                    tabGrid.map((grid, key) => (
                        <div
                            className={`transform scale-73 -mt-8 ${paginationGrid && pageGrid > 1 ? " -mt-16" : ""} ${
                                col > 3 ? "-translate-x-8" : ""
                            } ${numberGrid !== key ? "hidden" : ""}`}
                            id={"gridId-" + key}
                            key={"grid-" + key}
                        >
                            {grid.map((row, id) => (
                                <div
                                    className={`flex transform scale-120 z-auto ${
                                        Number.isInteger(id / 2) ? " translate-x-23" : ""
                                    }`}
                                    key={"row-" + id}
                                >
                                    {row.map((ticket, key) => (
                                        <div key={"ticket-" + key} className="-mx-2">
                                            {ticket.id > 0 ? (
                                                <Ticket
                                                    currentTicket={currentTicket}
                                                    fOpenModalCurrentTicket={(ticket) => {
                                                        fOpenModalCurrentTicket && fOpenModalCurrentTicket();
                                                        fCurrentTicket && fCurrentTicket(ticket);
                                                    }}
                                                    fOverCallBack={setHoverTicket}
                                                    languageUser={languageUser}
                                                    ticket={ticket}
                                                />
                                            ) : (
                                                <Ticket iconBG={iconBG} />
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
