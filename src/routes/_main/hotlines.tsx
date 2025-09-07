import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { useModal } from "@/contexts/modal-context";

import { HotlineTable } from "@/components/tables/hotline";
import { useBreadcrumb } from "@/components/ui/breadcrumb";
import { UpdateHotlineDialog } from "@/components/modals";

export const Route = createFileRoute("/_main/hotlines")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setItems } = useBreadcrumb();
  const { show } = useModal();

  useEffect(() => {
    setItems([{ title: "Hotlines" }]);
  }, [setItems]);

  return (
    <>
      <HotlineTable
        onUpdate={(hotline) => show(<UpdateHotlineDialog />, { data: hotline })}
      />
    </>
  );
}
