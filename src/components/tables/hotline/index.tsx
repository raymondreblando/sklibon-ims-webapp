import { getColumns } from "./columns";
import type { TableProps } from "@/types";
import type { Hotline } from "@/types/schema";

import { useHotlinesQuery } from "@/hooks/queries/use-hotlines-query";

import { DataTable } from "@/components/data-table";
import { CreateHotlineDialog } from "@/components/modals";
import { DataTableSkeleton } from "@/components/skeletons";
import { QueryStatusWrapper } from "@/components/hocs/query-status-wrapper";
import { QueryError } from "@/components/layouts/error-states";

export const HotlineTable = ({ onUpdate }: TableProps<Hotline>) => {
  const { isPending, isError, data, refetch } = useHotlinesQuery();
  const columns = getColumns({ onUpdate });

  return (
    <QueryStatusWrapper
      isPending={isPending}
      isError={isError}
      loadingComp={<DataTableSkeleton columnLength={columns.length} />}
      errorComp={<QueryError />}
      onRetry={refetch}
    >
      {data && (
        <DataTable
          data={data}
          columns={columns}
          actionComp={<CreateHotlineDialog />}
        />
      )}
    </QueryStatusWrapper>
  );
};
