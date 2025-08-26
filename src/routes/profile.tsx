import { createFileRoute } from "@tanstack/react-router";
import ProfileSettings from "../components/ProfileSettings/ProfileSettings";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

export const Route = createFileRoute("/profile")({
  component: () => (
    <ProtectedRoute>
      <ProfileSettings />
    </ProtectedRoute>
  ),
});
