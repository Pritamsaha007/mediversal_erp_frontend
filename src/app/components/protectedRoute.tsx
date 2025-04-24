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
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    } else {
      setChecked(true);
    }
  }, [isAuthenticated]);
  if (!checked) return null;
  return <>{children}</>;
}
