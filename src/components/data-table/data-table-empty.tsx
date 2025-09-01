import { TableCell, TableRow } from "@/components/ui/table";
import EmptyIcon from "@/assets/empty.svg";

export const DataTableEmpty = ({ colSpan }: { colSpan: number }) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="h-52 text-center">
        <div className="flex flex-col items-center justify-center">
          <img src={EmptyIcon} alt="empty" className="w-36" />
          No record found.
        </div>
      </TableCell>
    </TableRow>
  );
};
