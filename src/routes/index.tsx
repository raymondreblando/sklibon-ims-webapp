import NavBar from "@/components/layouts/navbar";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="relative">
      <NavBar />
    </main>
  );
}
