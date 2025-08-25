import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/signup")({
  component: SignUp,
});

function SignUp() {
  return <div>Signup flow</div>;
}
