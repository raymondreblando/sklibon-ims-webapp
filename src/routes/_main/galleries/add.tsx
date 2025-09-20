import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/galleries/add")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_main/galleries/add"!</div>;
}
