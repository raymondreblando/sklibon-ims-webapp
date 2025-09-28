import { getColumns } from "./columns";
import { useAttendancesQuery } from "@/hooks/queries/use-events-query";

import { DataTable } from "@/components/data-table";
import { DataTableSkeleton } from "@/components/skeletons";
import { QueryStatusWrapper } from "@/components/hocs/query-status-wrapper";

interface AttendanceTableProps {
  onUpdate: (id: string) => void;
  withActions?: boolean;
}

export const AttendanceTable = ({
  onUpdate,
  withActions,
}: AttendanceTableProps) => {
  const { isPending, isError, data, refetch } = useAttendancesQuery();
  const columns = getColumns({ onUpdate });

  return (
    <QueryStatusWrapper
      isPending={isPending}
      isError={isError}
      loadingComp={<DataTableSkeleton columnLength={columns.length} />}
      onRetry={refetch}
    >
      {data && (
        <DataTable
          data={data.data}
          columns={columns}
          withActions={withActions}
        />
      )}
    </QueryStatusWrapper>
  );
};
