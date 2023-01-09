import React, { ReactElement, ReactNode, useMemo, useState } from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

// TODO: Add solution to strongly type this component to avoid error
// Some leads : type of TableColumn["key"] could be keyof T instead of string
// Then find a way to not fuckup the T extend object generic

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

        return [...dataWithIds].sort((a, b) => {
            if (sortedColumn.columnKey === null || !(sortedColumn.columnKey in a) || !(sortedColumn.columnKey in b)) {
                return 0;
            }

            return (
                String(a[sortedColumn.columnKey as keyof T]).localeCompare(
                    String(b[sortedColumn.columnKey as keyof T]),
                    "en",
                    {
                        numeric: true,
                    }
                ) * (sortedColumn.state === "asc" ? 1 : -1)
            );
        });
    }, [dataWithIds, sortedColumn]);

    return (
        <table className="sortable border-collapse border-none rounded-md overflow-hidden">
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
