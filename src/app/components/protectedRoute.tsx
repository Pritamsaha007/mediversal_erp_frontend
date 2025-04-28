"use client";
import { useUserAuthStore } from "../store/userAuthSrore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useUserAuthStore();
  const router = useRouter();

  // 👇 Add local state to wait for Zustand hydration
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Zustand will hydrate async — wait for one tick
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      router.replace("/login");
    }
  }, [hydrated, isAuthenticated, router]);

  if (!hydrated) return null;

  return <>{children}</>;
}
