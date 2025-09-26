import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { ProfileForm } from "@/components/forms";
import { useBreadcrumb } from "@/components/ui/breadcrumb";
import { Heading, Subheading } from "@/components/headings";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/_main/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setItems } = useBreadcrumb();

  useEffect(() => {
    setItems([{ title: "My Profile" }]);
  }, [setItems]);

  return (
    <div className="border-input mx-auto my-4 flex max-w-[800px] flex-col rounded-md border-0 md:my-8 md:border">
      <div className="px-4 py-4 text-left md:px-8 md:py-6">
        <Heading className="text-xl font-bold md:text-2xl">
          Account Profile
        </Heading>
        <Subheading className="text-muted text-sm font-medium">
          Keep your profile up to date — edit your name, email, and address
          anytime.
        </Subheading>
      </div>
      <Separator className="bg-input" />
      <ProfileForm />
    </div>
  );
}
