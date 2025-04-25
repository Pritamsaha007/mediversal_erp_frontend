import ProtectedRoute from "../components/protectedRoute";
export default function MediversalMain({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
