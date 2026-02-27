import { Navigate, Outlet } from "react-router-dom";

type Role = "patient" | "doctor" | "admin";

export default function RequireRole({ allowed }: { allowed: Role[] }) {
  const role = (localStorage.getItem("role") as Role | null) ?? null;

  if (!role || !allowed.includes(role)) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
}