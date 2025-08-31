import { flexRender } from "@tanstack/react-table";

import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTableContext } from "./table-context";

export const DataTableHeader = () => {
  const table = useTableContext();

  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
};
