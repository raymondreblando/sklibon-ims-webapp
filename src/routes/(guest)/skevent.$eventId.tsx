import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(guest)/skevent/$eventId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(guest)/skevent-$eventId"!</div>
}
