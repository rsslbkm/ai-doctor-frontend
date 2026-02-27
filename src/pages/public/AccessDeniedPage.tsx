import { Link } from "react-router-dom";

export default function AccessDeniedPage() {
  return (
    <div>
      <h1>403 — Access denied</h1>
      <p>You don’t have permission to view this page.</p>
      <Link to="/">Go home</Link>
    </div>
  );
}