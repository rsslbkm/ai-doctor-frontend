import Topbar from "../../components/common/Topbar";
import { Link, Outlet } from "react-router-dom";

export default function DoctorLayout() {
  return (
    <div>
      <Topbar title="Doctor Portal" />
      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", minHeight: "100vh" }}>
        <aside style={{ borderRight: "1px solid #ddd", padding: 16 }}>
          <h3>Doctor</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12 }}>
            <Link className="navLink" to="/doctor">Cases</Link>
            <Link className="navLink" to="/doctor/calendar">Calendar</Link>
          </div>
        </aside>
        <main style={{ padding: 24 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}