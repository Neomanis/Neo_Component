import React, { ReactElement, useEffect, useState } from "react";

import { ITicket } from "../../../interface";

import HoverTicket from "./hoverTicket";
import { Ticket } from "..";
import Button from "../../atoms/button";
//icon
import { faCaretSquareLeft, faCaretSquareRight } from "@fortawesome/free-solid-svg-icons";

interface Props {
    currentTicket?: ITicket;
    tickets?: ITicket[];
    paginationGrid?: boolean;
    col: number;
    row: number;
    languageUser: string;
    withHover?: true;
    fOpenModalCurrentTicket?: () => void;
    fCurrentTicket?: (ticket: ITicket) => void;
    fChatModalOpen?: () => void;
    fTicketModalOpen?: () => void;
    iconBG?: boolean;
}

interface BlankTab {
    id: number;
    name: string;
}

const Grid = ({
    currentTicket,
    tickets,
    col,
    row,
    paginationGrid,
    languageUser,
    withHover,
    fOpenModalCurrentTicket,
    fCurrentTicket,
    fChatModalOpen,
    fTicketModalOpen,
    iconBG,
}: Props): ReactElement => {
    const tabTickets = tickets
        ? tickets?.length !== 0
            ? tickets
            : [{ id: 0, name: "blank" }]
        : [{ id: 0, name: "blank" }];

    const [tabGrid, setTabGrid] = useState<Array<Array<ITicket[]>>>();
    const [numberGrid, setNumbertGrid] = useState(0);
    const [overTicket, setOverTicket] = useState<{ ticket: ITicket; position: React.RefObject<HTMLHeadingElement> }>();

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
            {withHover && overTicket && (
                <HoverTicket
                    fMouseLeave={(): void => setOverTicket(undefined)}
                    fOpenModalCurrentTicket={(ticket) => {
                        fOpenModalCurrentTicket && fOpenModalCurrentTicket();
                        fCurrentTicket && fCurrentTicket(ticket);
                    }}
                    fChatModalOpen={() => fChatModalOpen && fChatModalOpen()}
                    fTicketModalOpen={() => fTicketModalOpen && fTicketModalOpen()}
                    ticket={overTicket.ticket}
                    dataView={overTicket.position}
                    languageUser={languageUser}
                />
            )}
            <div className={`${col === 1 ? "w-52" : ""}`}>
                {paginationGrid && pageGrid > 1 && (
                    <div className={`flex text-xl justify-end items-center text-neo_lite`}>
                        <p className="pt-1 mx-2">
                            {numberGrid + 1}/{pageGrid}
                        </p>
                        <Button
                            className="mx-1 hover:text-neo_blue-light cursor-pointer flex items-center"
                            fontIcon={faCaretSquareLeft}
                            fCallback={(): void => nextAndPrevious(-1)}
                        />
                        <Button
                            className="mx-1 hover:text-neo_blue-light cursor-pointer flex items-center"
                            fontIcon={faCaretSquareRight}
                            fCallback={(): void => nextAndPrevious(1)}
                        />
                    </div>
                )}
                {tabGrid &&
                    tabGrid.map((grid, key) => (
                        <div
                            key={"grid-" + key}
                            id={"gridId-" + key}
                            className={`transform scale-73 -mt-8 ${paginationGrid && pageGrid > 1 ? " -mt-16" : ""} ${
                                col > 3 ? "-translate-x-8" : ""
                            } ${numberGrid !== key ? "hidden" : ""}`}
                        >
                            {grid.map((row, id) => (
                                <div
                                    key={"row-" + id}
                                    className={`flex transform scale-120 z-auto ${
                                        Number.isInteger(id / 2) ? " translate-x-23" : ""
                                    }`}
                                >
                                    {row.map((ticket, key) => (
                                        <div key={"ticket-" + key} className="-mx-2">
                                            {ticket.id > 0 ? (
                                                <Ticket
                                                    currentTicket={currentTicket}
                                                    ticket={ticket}
                                                    fOverCallBack={setOverTicket}
                                                    languageUser={languageUser}
                                                    fOpenModalCurrentTicket={(ticket) => {
                                                        fOpenModalCurrentTicket && fOpenModalCurrentTicket();
                                                        fCurrentTicket && fCurrentTicket(ticket);
                                                    }}
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
