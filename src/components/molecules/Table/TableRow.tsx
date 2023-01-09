import React, { ReactElement } from "react";
import { TableColumn } from "@/components/molecules/Table/Table";
import TableCell from "./TableCell";

export interface TableRowProps<T> {
    data: (T & { id: number })[];
    columns: TableColumn<T>[];
}

const TableRow = <T extends object>({ data, columns }: TableRowProps<T>): ReactElement => {
    return (
        <>
            {data.map((item) => (
                <tr
                    className="cursor-auto text-neo-light-grey odd:bg-neo-bg-A even:bg-neo-bg-B"
                    key={`table-body-${item.id}`}
                    data-testid="table-row"
                >
                    {columns.map((column) => (
                        <TableCell key={`table-row-cell-${column.key}`} item={item} column={column} />
                    ))}
                </tr>
            ))}
        </>
    );
};

export default TableRow;
