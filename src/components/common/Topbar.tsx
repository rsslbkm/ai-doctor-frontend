import { Link, useNavigate } from "react-router-dom";

type Role = "patient" | "doctor" | "admin";

export default function Topbar({ title }: { title: string }) {
  const navigate = useNavigate();
  const role = (localStorage.getItem("role") as Role | null) ?? null;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  // Optional: demo helper
  const switchRole = (r: Role) => {
    localStorage.setItem("token", "demo-token");
    localStorage.setItem("role", r);
    if (r === "patient") navigate("/patient");
    if (r === "doctor") navigate("/doctor");
    if (r === "admin") navigate("/admin/users");
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: "var(--bg)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          paddingTop: 14,
          paddingBottom: 14,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link to="/" style={{ fontWeight: 900, letterSpacing: 0.2 }}>
            AI Doctor
          </Link>
          <span style={{ color: "var(--muted)" }}>•</span>
          <span style={{ fontWeight: 800 }}>{title}</span>
          {role ? (
            <span
              style={{
                marginLeft: 8,
                fontSize: 12,
                fontWeight: 800,
                padding: "6px 10px",
                borderRadius: 999,
                background: "#fff",
                border: "1px solid var(--border)",
              }}
            >
              role: {role}
            </span>
          ) : null}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          {/* Demo помщ кнопка. */}
          <button
            onClick={() => switchRole("patient")}
            style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid var(--border)", background: "#fff" }}
            type="button"
          >
            Patient
          </button>
          <button
            onClick={() => switchRole("doctor")}
            style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid var(--border)", background: "#fff" }}
            type="button"
          >
            Doctor
          </button>
          <button
            onClick={() => switchRole("admin")}
            style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid var(--border)", background: "#fff" }}
            type="button"
          >
            Admin
          </button>

          <button
            onClick={logout}
            style={{
              padding: "8px 12px",
              borderRadius: 10,
              border: "1px solid #111",
              background: "#111",
              color: "#fff",
              fontWeight: 800,
              cursor: "pointer",
            }}
            type="button"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}