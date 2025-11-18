"use client";
import { useEffect } from "react";
import { useAuth } from "../store/auth";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { initializeAuth, isLoading } = useAuth();

  useEffect(() => {
    // Initialize auth state from storage
    initializeAuth();
  }, []);

  // Show loading while initializing
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
}
