import { createFileRoute } from "@tanstack/react-router";
import { ButtonLink } from "@/components/buttons";
import { ReportCard } from "@/components/cards";
import { Searchbar } from "@/components/ui/searchbar";

export const Route = createFileRoute("/_main/reports/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className="border-input flex items-center justify-between gap-x-4 border-y bg-white px-6 py-4">
        <Searchbar
          inputProps={{
            placeholder: "Search here...",
          }}
        />
        <div className="flex items-center space-x-4">
          <ButtonLink to="/reports/add">Create new</ButtonLink>
        </div>
      </div>
      <div className="grid gap-4 px-6 py-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {Array.from({ length: 15 }).map((_, index) => (
          <ReportCard key={index} />
        ))}
      </div>
    </>
  );
}
