import Topbar from "../../components/common/Topbar";
import { Link, Outlet } from "react-router-dom";

export default function PatientLayout() {
  return (
    <div>
      <Topbar title="Patient Portal" />
      <nav style={{ padding: 16, borderBottom: "1px solid #ddd", display: "flex", gap: 12 }}>
        <Link to="/patient">Home</Link>
        <Link to="/patient/new-case">New Case</Link>
        <Link to="/patient/history">History</Link>
        <Link to="/patient/notifications">Notifications</Link>
      </nav>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}