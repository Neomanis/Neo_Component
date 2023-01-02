import React, { ReactElement, ReactNode, useMemo, useState } from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

type WithoutId<T extends object> = { [P in keyof T]: P extends "id" ? never : T[P] };

export type TableColumn<T> = {
    key: string;
    title: string;
    textPositon?: "text-left" | "text-center" | "text-right" | "text-justify";
    render?: (column: TableColumn<T>, item: T) => ReactNode;
};

export interface TableProps<T extends object> {
    data: WithoutId<T>[];
    columns: TableColumn<T>[];
}

const Table = <T extends object>({ data, columns }: TableProps<T>): ReactElement => {
    const [sortedColumn, setSortedColumn] = useState<{ columnKey: string | null; state: "asc" | "desc" | "none" }>({
        columnKey: null,
        state: "none",
    });

    const dataWithIds = useMemo(() => data.map((value, index) => ({ ...value, id: index + 1 })), [data]);

    const sortedData = useMemo(() => {
        if (sortedColumn.state === "none") {
            return dataWithIds;
        }

        return [...dataWithIds].sort(
            (a, b) =>
                a[sortedColumn.columnKey]
                    .toString()
                    .localeCompare(b[sortedColumn.columnKey].toString(), "en", { numeric: true }) *
                (sortedColumn.state === "asc" ? 1 : -1)
        );
    }, [dataWithIds, sortedColumn]);

    return (
        <table className="sortable border-collapse border-none">
            <thead>
                <TableHeader columns={columns} setSortedColumn={setSortedColumn} sortedColumn={sortedColumn} />
            </thead>
            <tbody>
                <TableRow data={sortedData} columns={columns} />
            </tbody>
        </table>
    );
};

export default Table;
