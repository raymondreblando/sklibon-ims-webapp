import { getColumns } from "./columns";
import type { Attendance } from "@/types/schema";
import { useAttendancesQuery } from "@/hooks/queries/use-events-query";

import { DataTable } from "@/components/data-table";
import { DataTableSkeleton } from "@/components/skeletons";
import { QueryStatusWrapper } from "@/components/hocs/query-status-wrapper";
import { GenerateAttendanceReportDialog } from "@/components/modals";
import { WithRoleGuard } from "@/components/hocs";

interface AttendanceTableProps {
  onUpdate: (id: string) => void;
  tableData?: Array<Attendance>;
  withActions?: boolean;
}

export const AttendanceTable = ({
  onUpdate,
  tableData,
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
          data={tableData ?? data.data}
          columns={columns}
          withActions={withActions}
          actionComp={
            <WithRoleGuard allowed={["Admin", "Super Admin"]}>
              <GenerateAttendanceReportDialog />
            </WithRoleGuard>
          }
        />
      )}
    </QueryStatusWrapper>
  );
};
