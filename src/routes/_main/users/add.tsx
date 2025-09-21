import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { CreateUserForm } from "@/components/forms";
import { useBreadcrumb } from "@/components/ui/breadcrumb";

export const Route = createFileRoute("/_main/users/add")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setItems } = useBreadcrumb();

  useEffect(() => {
    setItems([{ title: "SK Members", url: "/users" }, { title: "Add" }]);
  }, [setItems]);

  return <CreateUserForm />;
}
