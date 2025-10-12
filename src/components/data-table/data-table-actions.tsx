import type React from "react";
import type { SetStateAction } from "react";
import { Searchbar } from "@/components/ui/searchbar";
import { DataTableRecordController } from "./data-table-record-controller";

interface DataTableActionsProps {
  setGlobalFilter: React.Dispatch<SetStateAction<string>>;
  actionComp?: React.ReactNode;
}

export const DataTableActions = ({
  setGlobalFilter,
  actionComp,
}: DataTableActionsProps) => {
  return (
    <div className="border-input flex flex-wrap-reverse md:flex-wrap items-center justify-between gap-4 border-y bg-white px-6 py-4">
      <Searchbar
        wrapperProps={{ className: "w-full md:w-max" }}
        inputProps={{
          placeholder: "Search here...",
          onInput: (e) => setGlobalFilter(e.currentTarget.value),
        }}
      />
      <div className="flex items-center space-x-4">
        <DataTableRecordController />
        {actionComp}
      </div>
    </div>
  );
};
