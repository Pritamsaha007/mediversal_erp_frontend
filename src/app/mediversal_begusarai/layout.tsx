import ProtectedRoute from "../components/protectedRoute";
export default function MediversalBegusarai({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
