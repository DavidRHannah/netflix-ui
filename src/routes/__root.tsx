import { createRootRoute, Outlet } from "@tanstack/react-router";
import { LanguageProvider } from "../contexts/LanguageContext";
import "../i18n";
import { AuthProvider } from "../contexts/AuthContext";

export const Route = createRootRoute({
  component: () => (
    <AuthProvider>
      <LanguageProvider>
        <Outlet />
      </LanguageProvider>
    </AuthProvider>
  ),
});
