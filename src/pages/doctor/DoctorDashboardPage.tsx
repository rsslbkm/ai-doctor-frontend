import { Link } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

type CaseItem = {
  id: string;
  patientName: string;
  createdAt: string;
  status: "Pending" | "Needs Review" | "Diagnosis Confirmed" | "Prescription Issued";
  aiTop: string;
};

const MOCK_CASES: CaseItem[] = [
  {
    id: "1001",
    patientName: "Azaliya K.",
    createdAt: new Date(Date.now() - 3600_000 * 4).toISOString(),
    status: "Needs Review",
    aiTop: "Common cold (62%)",
  },
  {
    id: "1002",
    patientName: "Patient A.",
    createdAt: new Date(Date.now() - 3600_000 * 26).toISOString(),
    status: "Pending",
    aiTop: "Influenza (41%)",
  },
  {
    id: "1003",
    patientName: "Patient B.",
    createdAt: new Date(Date.now() - 3600_000 * 50).toISOString(),
    status: "Diagnosis Confirmed",
    aiTop: "Allergic rhinitis (55%)",
  },
];

function StatusBadge({ status }: { status: CaseItem["status"] }) {
  const map: Record<string, { bg: string; color: string }> = {
    Pending: { bg: "#fff7ed", color: "#9a3412" },
    "Needs Review": { bg: "#eff6ff", color: "#1d4ed8" },
    "Diagnosis Confirmed": { bg: "#ecfdf5", color: "#047857" },
    "Prescription Issued": { bg: "#f5f3ff", color: "#6d28d9" },
  };
  const s = map[status] ?? { bg: "#f3f4f6", color: "#111" };
  return (
    <span style={{ background: s.bg, color: s.color, padding: "6px 10px", borderRadius: 999, fontSize: 12, fontWeight: 700 }}>
      {status}
    </span>
  );
}

export default function DoctorDashboardPage() {
  return (
    <div className="container">
      <h1>Doctor Dashboard</h1>
      <p>Assigned cases (mock). Click a case to review.</p>

      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
          <div style={{ fontWeight: 800 }}>Cases</div>
          <Button type="button" variant="secondary" onClick={() => alert("Filter UI later")}>
            Filters (later)
          </Button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {MOCK_CASES.map((c) => (
            <div
              key={c.id}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: 12,
                padding: 12,
                display: "grid",
                gridTemplateColumns: "1.2fr 1fr 1fr auto",
                gap: 10,
                alignItems: "center",
                background: "#fff",
              }}
            >
              <div>
                <div style={{ fontWeight: 800 }}>{c.patientName}</div>
                <div style={{ fontSize: 12, color: "#6b7280" }}>{new Date(c.createdAt).toLocaleString()}</div>
              </div>

              <div style={{ fontSize: 13, color: "#374151" }}>
                <div style={{ fontWeight: 700 }}>AI top</div>
                <div>{c.aiTop}</div>
              </div>

              <div>
                <StatusBadge status={c.status} />
              </div>

              <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                <Link className="navLink" to={`/doctor/cases/${c.id}`}>
                  Open
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}