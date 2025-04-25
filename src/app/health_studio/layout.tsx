import ProtectedRoute from "../components/protectedRoute";
export default function HealthStudio({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
