import ProtectedRoute from "../components/protectedRoute";
export default function UnitSelectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
