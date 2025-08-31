import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const DataTableSkeleton = ({
  columnLength,
}: {
  columnLength: number;
}) => {
  return (
    <>
      <div className="border-input flex items-center justify-between gap-x-4 border-y bg-white px-6 py-4">
        <Skeleton className="h-10 w-48" />
        <div className="flex items-center space-x-4">
          <Skeleton className="h-10 w-16" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
      <div className="w-full overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              {Array.from({ length: columnLength }).map((_, index) => (
                <TableHead className="bg-white" key={`table-header-${index}`}>
                  <Skeleton className="h-6 w-24" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, mainIndex) => (
              <TableRow key={`table-row-${mainIndex}`}>
                {Array.from({ length: columnLength }).map((_, subIndex) => (
                  <TableCell key={`table-cell-${mainIndex}-${subIndex}`}>
                    <Skeleton className="h-8 w-32" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="border-input flex items-center justify-between border-b px-6 py-4">
        <Skeleton className="h-5 w-16" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-10 w-16" />
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-16" />
        </div>
      </div>
    </>
  );
};
