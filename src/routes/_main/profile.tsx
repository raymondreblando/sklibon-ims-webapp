import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { ProfileForm } from "@/components/forms";
import { useBreadcrumb } from "@/components/ui/breadcrumb";

export const Route = createFileRoute("/_main/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setItems } = useBreadcrumb();

  useEffect(() => {
    setItems([{ title: "My Profile" }]);
  }, [setItems]);

  return (
    <div>
      <ProfileForm />
    </div>
  );
}
