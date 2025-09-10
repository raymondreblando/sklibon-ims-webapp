import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/users/add')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_main/users/add"!</div>
}
