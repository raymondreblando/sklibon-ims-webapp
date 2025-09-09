import { getColumns } from "./columns";
import type { TableProps } from "@/types";
import type { Position } from "@/types/schema";

import { usePositionsQuery } from "@/hooks/queries/use-positions-query";

import { DataTable } from "@/components/data-table";
import { CreatePositionDialog } from "@/components/modals";
import { DataTableSkeleton } from "@/components/skeletons";
import { QueryStatusWrapper } from "@/components/hocs/query-status-wrapper";

export const PositionTable = ({ onUpdate, onDelete }: TableProps<Position>) => {
  const { isPending, isError, data, refetch } = usePositionsQuery();
  const columns = getColumns({ onUpdate, onDelete });

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
          actionComp={<CreatePositionDialog />}
        />
      )}
    </QueryStatusWrapper>
  );
};
