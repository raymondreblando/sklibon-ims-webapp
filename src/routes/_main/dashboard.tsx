import { createFileRoute } from "@tanstack/react-router";

import { useBreadcrumb } from "@/components/ui/breadcrumb";
import { useEffect } from "react";

export const Route = createFileRoute("/_main/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setItems } = useBreadcrumb();

  useEffect(() => {
    setItems([{ title: "Dashboard" }]);
  }, [setItems]);

  return <div>Hello "/_main/"!</div>;
}
