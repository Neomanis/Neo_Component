import React, { ReactElement } from "react";
import { TableColumn } from "@/components/molecules/Table/Table";
import { classNames } from "@/utils";

export interface TableCellProps<T> {
    item: T;
    column: TableColumn<T>;
}

const TableCell = <T extends object>({ item, column }: TableCellProps<T>): ReactElement => {
    return (
        <td className={classNames("p-3", column.textPositon)}>
            {column.render ? column.render(column, item) : String(item[column.key as keyof T])}
        </td>
    );
};

export default TableCell;
