import { TableCell, TableRow } from "@/components/ui/table";
import { NoRecord } from "@/components/layouts/empty-states";

export const DataTableEmpty = ({ colSpan }: { colSpan: number }) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="h-52 text-center">
        <NoRecord />
      </TableCell>
    </TableRow>
  );
};
