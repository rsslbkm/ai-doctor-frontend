import Topbar from "../../components/common/Topbar";
import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div>
      <Topbar title="Admin Panel" />
      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", minHeight: "100vh" }}>
        <aside style={{ borderRight: "1px solid #ddd", padding: 16 }}>
          <h3>Admin</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12 }}>
            <Link to="/admin/users">Users</Link>
            <Link to="/admin/audit-logs">Audit Logs</Link>
          </div>
        </aside>
        <main style={{ padding: 24 }}>
          <Outlet />
        </main>
      </div>
    </div>  
  );
}