import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

export default function PrescriptionPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [medication, setMedication] = useState("");
  const [dosage, setDosage] = useState("");
  const [duration, setDuration] = useState("");
  const [lifestyle, setLifestyle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = () => {
    setError(null);
    if (!medication.trim() || !dosage.trim() || !duration.trim()) {
      setError("Medication, dosage, and duration are required.");
      return;
    }
    localStorage.setItem(
      `doctor:prescription:${id}`,
      JSON.stringify({
        caseId: id,
        medication: medication.trim(),
        dosage: dosage.trim(),
        duration: duration.trim(),
        lifestyle: lifestyle.trim(),
        at: new Date().toISOString(),
      })
    );
    alert("Prescription saved m . Next: schedule appointment.");
    navigate(`/doctor/cases/${id}/appointment`);
  };

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <div>
          <h1>Prescription</h1>
          <p>Case ID: <b>{id ?? "—"}</b></p>
        </div>
        <Link className="navLink" to={`/doctor/cases/${id}`}>← Back to case</Link>
      </div>

      <Card>
        <div style={{ fontWeight: 800, marginBottom: 10 }}>Write treatment plan</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>Medication *</div>
            <input value={medication} onChange={(e) => setMedication(e.target.value)} style={{ width: "100%", padding: 12, borderRadius: 12, border: "1px solid #e5e7eb" }} />
          </div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>Dosage *</div>
            <input value={dosage} onChange={(e) => setDosage(e.target.value)} style={{ width: "100%", padding: 12, borderRadius: 12, border: "1px solid #e5e7eb" }} />
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Duration *</div>
          <input value={duration} onChange={(e) => setDuration(e.target.value)} style={{ width: "100%", padding: 12, borderRadius: 12, border: "1px solid #e5e7eb" }} />
        </div>

        <div style={{ marginTop: 12 }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Lifestyle notes (optional)</div>
          <textarea value={lifestyle} onChange={(e) => setLifestyle(e.target.value)} rows={4} style={{ width: "100%", padding: 12, borderRadius: 12, border: "1px solid #e5e7eb" }} />
        </div>

        {error && <div style={{ marginTop: 10, color: "var(--danger)", fontWeight: 800 }}>{error}</div>}

        <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Button type="button" onClick={submit}>Submit prescription</Button>
          <Button type="button" variant="secondary" onClick={() => navigate(`/doctor/cases/${id}/appointment`)}>
            Go to appointment
          </Button>
        </div>
      </Card>
    </div>
  );
}