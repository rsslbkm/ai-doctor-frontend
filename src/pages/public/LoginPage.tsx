import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import "../../styles/auth.css";

type Role = "patient" | "doctor" | "admin";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("demo@sdu.edu.kz");
  const [password, setPassword] = useState("demo1234");
  const [role, setRole] = useState<Role>("patient");
  const [error, setError] = useState<string | null>(null);

  const isValid = useMemo(() => {
    return email.trim().includes("@") && password.trim().length >= 4;
  }, [email, password]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isValid) {
      setError("Please enter a valid email and password (min 4 char).");
      return;
    }

    
    localStorage.setItem("token", "demo-token");
    localStorage.setItem("role", role);

    if (role === "patient") navigate("/patient");
    if (role === "doctor") navigate("/doctor");
    if (role === "admin") navigate("/admin/users");
  };

  return (
    <div className="container">
      <div className="authWrap">
        <Card style={{ padding: 0, border: "none", background: "transparent" }}>
          <div className="authCard">
            <h1 className="authTitle">Log in</h1>
            <p className="authHint">
              Demo (<code>/auth/login</code>).
            </p>

            <form onSubmit={onSubmit}>
              <div className="field">
                <div className="label">Email</div>
                <input
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  autoComplete="email"
                />
              </div>

              <div className="field">
                <div className="label">Password</div>
                <input
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••"
                  type="password"
                  autoComplete="current-password"
                />
              </div>

              <div className="field">
                <div className="label">Role (for demo)</div>
                <select className="select" value={role} onChange={(e) => setRole(e.target.value as Role)}>
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {error && <div className="error">{error}</div>}

              <div className="actions">
                <Button type="submit">Log in</Button>
                <Link to="/register" className="navLink">
                  Create account
                </Link>
                <button
                  type="button"
                  className="navLink"
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("role");
                    setEmail("demo@sdu.edu.kz");
                    setPassword("demo1234");
                    setRole("patient");
                    setError(null);
                  }}
                  style={{ border: "none", background: "transparent", cursor: "pointer" }}
                >
                  Reset demo
                </button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}