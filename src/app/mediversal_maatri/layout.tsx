import ProtectedRoute from "../components/protectedRoute";
export default function MediversalMaatri({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
