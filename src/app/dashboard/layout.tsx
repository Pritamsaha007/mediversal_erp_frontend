"use client";
import { useUserAuthStore } from "@/app/store/userAuthSrore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useUserAuthStore();
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated]);
  return <>{isAuthenticated && children}</>;
}
