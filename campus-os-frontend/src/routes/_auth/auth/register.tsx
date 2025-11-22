import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/auth/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/auth/register"!</div>
}
