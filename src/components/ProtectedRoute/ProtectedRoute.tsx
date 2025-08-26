import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate, useLocation } from "@tanstack/react-router";

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function ProtectedRoute({
  children,
  fallback,
}: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      fallback || (
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p>Loading...</p>
          </div>
        </div>
      )
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/signin"
        search={{
          redirect: location.pathname + location.search,
        }}
        replace
      />
    );
  }

  return <>{children}</>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    return (
      <ProtectedRoute>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}
