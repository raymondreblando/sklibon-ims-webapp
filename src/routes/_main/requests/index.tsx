import { createFileRoute } from "@tanstack/react-router";

import { ButtonLink } from "@/components/buttons";
import { Searchbar } from "@/components/ui/searchbar";

export const Route = createFileRoute("/_main/requests/")({
  component: RouteComponent,
});

function RouteComponent() {
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
          <ButtonLink to="/requests/add">Create Request</ButtonLink>
        </div>
      </div>
    </>
  );
}
