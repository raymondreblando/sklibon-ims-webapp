import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { UserTable } from "@/components/tables/users";
import { useBreadcrumb } from "@/components/ui/breadcrumb";

export const Route = createFileRoute("/_main/users/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setItems } = useBreadcrumb();

  useEffect(() => {
    setItems([{ title: "Users" }]);
  }, [setItems]);

  return (
    <>
      <UserTable />
    </>
  );
}
