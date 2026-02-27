import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <h1>AI Doctor</h1>
      <p>Symptom analysis + case forwarding to a doctor.</p>
      <div style={{ display: "flex", gap: 12 }}>
        <Link to="/login">Log in</Link>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}