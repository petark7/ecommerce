"use client";
import { useAuth } from "../hooks/useAuth";

export default function AuthWrapper({ children }) {
  const { loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  return <>{children}</>;
}
