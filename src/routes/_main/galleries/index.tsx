import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { useBreadcrumb } from "@/components/ui/breadcrumb";
import { ButtonLink } from "@/components/buttons";
import { Searchbar } from "@/components/ui/searchbar";

export const Route = createFileRoute("/_main/galleries/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setItems } = useBreadcrumb();

  useEffect(() => {
    setItems([{ title: "Galleries" }]);
  }, [setItems]);

  return (
    <>
      <div className="border-input flex items-center justify-between gap-x-4 border-y bg-white px-6 py-4">
        <Searchbar
          inputProps={{
            placeholder: "Search here...",
            onInput: (event) => console.log(event.currentTarget.value),
          }}
        />
        <div className="flex items-center space-x-4">
          <ButtonLink to="/galleries/add">Add Gallery</ButtonLink>
        </div>
      </div>
    </>
  );
}
