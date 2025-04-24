import { Suspense } from "react";
import ProtectedRoute from "../components/protectedRoute";
export default function UnitSelectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProtectedRoute>{children}</ProtectedRoute>
    </Suspense>
  );
}
