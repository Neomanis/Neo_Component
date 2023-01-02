import React, { Dispatch, ReactElement, SetStateAction, useCallback } from "react";
import { faSort, faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TableColumn } from "@/components/molecules/Table/Table";

export interface TableHeaderProps<T> {
    columns: TableColumn<T>[];
    sortedColumn: {
        columnKey: string | null;
        state: "asc" | "desc" | "none";
    };
    setSortedColumn: Dispatch<
        SetStateAction<{
            columnKey: string | null;
            state: "asc" | "desc" | "none";
        }>
    >;
}

function getNextState(actualState: "asc" | "desc" | "none"): "asc" | "desc" | "none" {
    switch (actualState) {
        case "asc":
            return "desc";
        case "desc":
            return "none";
        case "none":
            return "asc";
    }
}

const TableHeader = <T,>({ columns, setSortedColumn, sortedColumn }: TableHeaderProps<T>): ReactElement => {
    function handleSortChange(column: TableColumn<T>) {
        setSortedColumn((oldValue) => {
            if (oldValue.columnKey !== column.key) {
                return { columnKey: column.key, state: "asc" };
            }

            return { columnKey: column.key, state: getNextState(oldValue.state) };
        });
    }

    const getSortedStateIcon = useCallback(
        (column: TableColumn<T>) => {
            if (column.key !== sortedColumn.columnKey) {
                return <FontAwesomeIcon icon={faSort} />;
            }

            if (sortedColumn.state === "asc") {
                return <FontAwesomeIcon icon={faSortUp} />;
            }

            if (sortedColumn.state === "desc") {
                return <FontAwesomeIcon icon={faSortDown} />;
            }

            return <FontAwesomeIcon icon={faSort} />;
        },
        [sortedColumn]
    );

    return (
        <tr>
            {columns.map((column) => (
                <th
                    className="p-3 cursor-pointer text-white space-x-2 font-semibold text-left bg-neo-bg-B first:rounded-tl-md last:rounded-tr-md"
                    key={`table-head-cell-${column.key}`}
                    onClick={() => handleSortChange(column)}
                >
                    <span>{column.title}</span>
                    {getSortedStateIcon(column)}
                </th>
            ))}
        </tr>
    );
};

export default TableHeader;
