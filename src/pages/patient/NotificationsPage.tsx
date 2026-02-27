import React, { useState } from "react";
import Card from "../../components/ui/Card";

export default function NotificationsPage() {
  const [email, setEmail] = useState(true);
  const [inApp, setInApp] = useState(true);

  return (
    <div style={{ maxWidth: 860 }}>
      <h1>Notifications</h1>

      <Card>
        <div style={{ fontWeight: 800, marginBottom: 10 }}>Preferences (mock)</div>
        <label style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
          <input type="checkbox" checked={email} onChange={() => setEmail((v) => !v)} />
          <span>Email notifications</span>
        </label>
        <label style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input type="checkbox" checked={inApp} onChange={() => setInApp((v) => !v)} />
          <span>In-app notifications</span>
        </label>
      </Card>

      <Card style={{ marginTop: 12 }}>
        <div style={{ fontWeight: 800, marginBottom: 10 }}>Recent notifications (mock)</div>
        <ul style={{ margin: 0, paddingLeft: 18, color: "#444" }}>
          <li>Your case was received.</li>
          <li>AI results are ready for review.</li>
          <li>A doctor will review your case soon.</li>
        </ul>
      </Card>
    </div>
  );
}