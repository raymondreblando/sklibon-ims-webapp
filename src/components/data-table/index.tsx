import type React from "react";
import { type ColumnDef, type Table } from "@tanstack/react-table";

import { DataTableEmpty } from "./data-table-empty";
import { DataTableHeader } from "./data-table-header";
import { DataTableRow } from "./data-table-row";
import { DataTableActions } from "./data-table-actions";
import { TableContext } from "./table-context";
import { DataTablePagination } from "./data-table-pagination";
import { Table as TableComponent, TableBody } from "@/components/ui/table";
import { useDataTable } from "@/hooks/use-data-table";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  actionComp?: React.ReactNode;
  withActions?: boolean;
}

export const DataTable = <TData, TValue>({
  columns,
  data,
  actionComp,
  withActions = true,
}: DataTableProps<TData, TValue>) => {
  const { table, setGlobalFilter } = useDataTable({ columns, data });

  return (
    <TableContext.Provider value={table as Table<unknown>}>
      {withActions && (
        <DataTableActions
          setGlobalFilter={setGlobalFilter}
          actionComp={actionComp}
        />
      )}

      <div className="w-full overflow-hidden bg-white">
        <TableComponent>
          <DataTableHeader />
          <TableBody>
            {table.getRowModel().rows.length ? (
              <DataTableRow />
            ) : (
              <DataTableEmpty colSpan={columns.length} />
            )}
          </TableBody>
        </TableComponent>
      </div>
      {withActions && <DataTablePagination />}
    </TableContext.Provider>
  );
};
