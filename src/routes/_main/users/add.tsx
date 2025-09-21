import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { CreateUserForm } from "@/components/forms";
import { useBreadcrumb } from "@/components/ui/breadcrumb";
import { Heading, Subheading } from "@/components/headings";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/_main/users/add")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setItems } = useBreadcrumb();

  useEffect(() => {
    setItems([{ title: "SK Members", url: "/users" }, { title: "Create" }]);
  }, [setItems]);

  return (
    <div className="border-input mx-auto my-4 max-w-[800px] rounded-md border-0 md:my-8 md:border">
      <div className="p-4 text-left md:px-8 md:py-6">
        <Heading className="text-xl font-bold md:text-3xl">
          Create User Account
        </Heading>
        <Subheading className="text-muted font-mdeium text-sm md:text-base">
          Fill in the required details to add a new account.
        </Subheading>
      </div>
      <Separator className="bg-input" />
      <CreateUserForm />
    </div>
  );
}
