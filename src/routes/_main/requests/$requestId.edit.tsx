import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/requests/$requestId/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_main/requests/$requestId/edit"!</div>
}
