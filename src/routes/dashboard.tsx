import { createFileRoute } from "@tanstack/react-router";
import Dashboard from "../components/Dashboard/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

export const Route = createFileRoute("/dashboard")({
  component: () => (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  ),
});
