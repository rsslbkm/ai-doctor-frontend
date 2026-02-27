import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

type Diagnosis = { name: string; confidence: number };

const MOCK_AI: Diagnosis[] = [
  { name: "Common cold (viral upper respiratory infection)", confidence: 0.62 },
  { name: "Influenza (flu)", confidence: 0.21 },
  { name: "Allergic rhinitis", confidence: 0.10 },
  { name: "Strep throat", confidence: 0.05 },
  { name: "COVID-19", confidence: 0.02 },
];

export default function DoctorCaseDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [notes, setNotes] = useState("");
  const [decision, setDecision] = useState<"confirm" | "correct">("confirm");
  const [icd10, setIcd10] = useState("");
  const [rationale, setRationale] = useState("");
  const [error, setError] = useState<string | null>(null);

  const caseMock = useMemo(() => {
    const maybe = localStorage.getItem(`case:${id}`);
    if (maybe) {
      try {
        return JSON.parse(maybe) as any;
      } catch {
        return null;
      }
    }
    return null;
  }, [id]);

  const submitDiagnosis = () => {
    setError(null);
    if (!rationale.trim()) {
      setError("Rationale note is required.");
      return;
    }
    localStorage.setItem(
      `doctor:diagnosis:${id}`,
      JSON.stringify({
        caseId: id,
        decision,
        icd10: decision === "correct" ? icd10 : null,
        rationale: rationale.trim(),
        notes: notes.trim(),
        at: new Date().toISOString(),
      })
    );
    alert("Diagnosis submitted m . Next: write prescription.");
    navigate(`/doctor/cases/${id}/prescription`);
  };

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
        <div>
          <h1>Case Details</h1>
          <p>Case ID: <b>{id ?? "—"}</b></p>
        </div>
        <Link className="navLink" to="/doctor">← Back to dashboard</Link>
      </div>

      <Card style={{ marginBottom: 12 }}>
        <div style={{ fontWeight: 800, marginBottom: 8 }}>Patient submission (mock)</div>
        {caseMock ? (
          <>
            {caseMock.symptomText ? <div style={{ marginBottom: 6 }}>{caseMock.symptomText}</div> : null}
            {caseMock.selectedSymptoms?.length ? (
              <div style={{ fontSize: 13, color: "#6b7280" }}>
                Selected: {caseMock.selectedSymptoms.join(", ")}
              </div>
            ) : null}
            <div style={{ fontSize: 13, color: "#6b7280", marginTop: 6 }}>
              Image attached: {caseMock.hasImage ? "Yes" : "No"}
            </div>
          </>
        ) : (
          <div style={{ color: "#6b7280" }}>
            No patient payload found for this ID. (That’s okay for demo.)
          </div>
        )}
      </Card>

      <Card style={{ marginBottom: 12 }}>
        <div style={{ fontWeight: 800, marginBottom: 10 }}>AI suggestions</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {MOCK_AI.map((d) => (
            <div key={d.name} style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
              <div style={{ flex: 1 }}>{d.name}</div>
              <div style={{ minWidth: 90, fontWeight: 800 }}>{Math.round(d.confidence * 100)}%</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 10, fontSize: 13, color: "#6b7280" }}>
          AI output is not a diagnosis; doctor review required.
        </div>
      </Card>

      <Card style={{ marginBottom: 12 }}>
        <div style={{ fontWeight: 800, marginBottom: 8 }}>Clinical notes</div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          placeholder="Write your clinical notes..."
          style={{ width: "100%", padding: 12, borderRadius: 12, border: "1px solid #e5e7eb" }}
        />
      </Card>

      <Card>
        <div style={{ fontWeight: 900, marginBottom: 10 }}>Confirm or correct diagnosis</div>

        <div style={{ display: "flex", gap: 14, marginBottom: 10, flexWrap: "wrap" }}>
          <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              type="radio"
              checked={decision === "confirm"}
              onChange={() => setDecision("confirm")}
            />
            Confirm AI diagnosis
          </label>

          <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              type="radio"
              checked={decision === "correct"}
              onChange={() => setDecision("correct")}
            />
            Correct diagnosis
          </label>
        </div>

        {decision === "correct" && (
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>ICD-10 (placeholder)</div>
            <input
              value={icd10}
              onChange={(e) => setIcd10(e.target.value)}
              placeholder="e.g., J00"
              style={{ width: "100%", padding: 12, borderRadius: 12, border: "1px solid #e5e7eb" }}
            />
          </div>
        )}

        <div style={{ marginBottom: 10 }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Rationale note (required)</div>
          <textarea
            value={rationale}
            onChange={(e) => setRationale(e.target.value)}
            rows={3}
            placeholder="Explain why you confirm/correct the AI suggestion..."
            style={{ width: "100%", padding: 12, borderRadius: 12, border: "1px solid #e5e7eb" }}
          />
        </div>

        {error && <div style={{ color: "var(--danger)", fontWeight: 800, marginBottom: 10 }}>{error}</div>}

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Button type="button" onClick={submitDiagnosis}>
            Submit diagnosis
          </Button>
          <Button type="button" variant="secondary" onClick={() => navigate(`/doctor/cases/${id}/prescription`)}>
            Skip to prescription
          </Button>
          <Link className="navLink" to={`/doctor/cases/${id}/appointment`}>
            Schedule appointment →
          </Link>
        </div>
      </Card>
    </div>
  );
}