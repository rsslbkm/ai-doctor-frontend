import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

type Diagnosis = { name: string; confidence: number };

const MOCK: Diagnosis[] = [
  { name: "Common cold (viral upper respiratory infection)", confidence: 0.62 },
  { name: "Influenza (flu)", confidence: 0.21 },
  { name: "Allergic rhinitis", confidence: 0.10 },
  { name: "Strep throat", confidence: 0.05 },
  { name: "COVID-19", confidence: 0.02 },
];

export default function AiResultsPage() {
  const { caseId } = useParams<{ caseId: string }>();

  const [state, setState] = useState<"loading" | "success" | "error">("loading");

  const stored = useMemo(() => {
    if (!caseId) return null;
    const raw = localStorage.getItem(`case:${caseId}`);
    return raw ? (JSON.parse(raw) as any) : null;
  }, [caseId]);

  const run = () => {
    setState("loading");
    
    setTimeout(() => {
      
      const fail = Math.random() < 0.1;
      setState(fail ? "error" : "success");
    }, 1800);
  };

  useEffect(() => {
    run();
    
  }, [caseId]);

  return (
    <div style={{ maxWidth: 860 }}>
      <h1>AI Results</h1>
      <p style={{ color: "#555" }}>
        Case ID: <b>{caseId ?? "—"}</b>
      </p>

      <Card style={{ marginBottom: 12 }}>
        <div style={{ fontWeight: 800, marginBottom: 6 }}>Important</div>
        <div style={{ color: "#555", lineHeight: 1.45 }}>
          This AI output is <b>not</b> a medical diagnosis. A licensed doctor must review your case.
        </div>
      </Card>

      {stored && (
        <Card style={{ marginBottom: 12 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Submitted symptoms</div>
          <div style={{ color: "#444" }}>
            {stored.symptomText ? <div style={{ marginBottom: 6 }}>{stored.symptomText}</div> : null}
            {stored.selectedSymptoms?.length ? (
              <div style={{ fontSize: 13, color: "#666" }}>
                Selected: {stored.selectedSymptoms.join(", ")}
              </div>
            ) : null}
            <div style={{ fontSize: 13, color: "#666", marginTop: 6 }}>
              Image attached: {stored.hasImage ? "Yes" : "No"}
            </div>
          </div>
        </Card>
      )}

      {state === "loading" && (
        <Card>
          <div style={{ fontWeight: 700 }}>Analyzing symptoms…</div>
          <div style={{ color: "#666", marginTop: 6 }}>Please wait a few seconds.</div>
        </Card>
      )}

      {state === "error" && (
        <Card>
          <div style={{ fontWeight: 800, color: "#b00020" }}>AI service did not respond</div>
          <div style={{ color: "#666", marginTop: 6 }}>Try again, or wait for doctor review.</div>
          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <Button type="button" onClick={run}>Retry</Button>
            <Button type="button" variant="secondary">
              Sent for manual review
            </Button>
          </div>
        </Card>
      )}

      {state === "success" && (
        <Card>
          <div style={{ fontWeight: 800, marginBottom: 10 }}>Possible conditions</div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {MOCK.map((d) => (
              <div key={d.name} style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
                <div style={{ flex: 1 }}>{d.name}</div>
                <div style={{ minWidth: 90, fontWeight: 700 }}>
                  {Math.round(d.confidence * 100)}%
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
            <Button type="button" variant="secondary">
              Notify doctor (mock)
            </Button>
            <Link to="/patient/history" style={{ alignSelf: "center" }}>
              Go to history
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
}