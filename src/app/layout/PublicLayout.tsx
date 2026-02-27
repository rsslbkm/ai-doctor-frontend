import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div style={{ padding: 24 }}>
      <Outlet />
    </div>
  );
}