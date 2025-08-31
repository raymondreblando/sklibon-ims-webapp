import type { Table } from "@tanstack/react-table";
import { createContext, useContext } from "react";

export const TableContext = createContext<Table<unknown> | null>(null);

export function useTableContext<TData>() {
  const table = useContext(TableContext);

  if (!table) {
    throw new Error("useTableContext must be used within a TableProvider");
  }

  return table as Table<TData>;
}