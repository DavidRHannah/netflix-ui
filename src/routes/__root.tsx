import { createRootRoute, Outlet } from "@tanstack/react-router";
import { LanguageProvider } from "../contexts/LanguageContext";
import "../i18n";

export const Route = createRootRoute({
  component: () => (
    <LanguageProvider>
      <Outlet />
    </LanguageProvider>
  ),
});
