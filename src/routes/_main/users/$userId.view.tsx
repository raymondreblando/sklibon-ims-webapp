import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/users/$userId/view')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_main/users/$userId/view"!</div>
}
