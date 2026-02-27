import React, { useMemo } from "react";
import Card from "../../components/ui/Card";

export default function MedicalHistoryPage() {
  const cases = useMemo(() => {
    const items: any[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k?.startsWith("case:")) continue;
      try {
        items.push(JSON.parse(localStorage.getItem(k) ?? "{}"));
      } catch {
        
      }
    }
    items.sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""));
    return items;
  }, []);

  return (
    <div style={{ maxWidth: 860 }}>
      <h1>Medical History</h1>
      <p style={{ color: "#555" }}>Mock data stored in localStorage.</p>

      {cases.length === 0 ? (
        <Card>
          <b>No cases yet.</b>
          <div style={{ color: "#666", marginTop: 6 }}>Submit a new case to see it here.</div>
        </Card>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {cases.map((c) => (
            <Card key={c.caseId}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <div style={{ fontWeight: 800 }}>Case #{c.caseId}</div>
                <div style={{ fontSize: 13, color: "#666" }}>
                  {c.createdAt ? new Date(c.createdAt).toLocaleString() : ""}
                </div>
              </div>
              <div style={{ marginTop: 8, color: "#444" }}>
                <div style={{ fontSize: 13, color: "#666" }}>Status: {c.status ?? "—"}</div>
                {c.symptomText ? <div style={{ marginTop: 6 }}>{c.symptomText}</div> : null}
                {c.selectedSymptoms?.length ? (
                  <div style={{ marginTop: 6, fontSize: 13, color: "#666" }}>
                    Selected: {c.selectedSymptoms.join(", ")}
                  </div>
                ) : null}
                <div style={{ marginTop: 6, fontSize: 13, color: "#666" }}>
                  Image attached: {c.hasImage ? "Yes" : "No"}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div style={{ marginTop: 14, fontSize: 13, color: "#666" }}>
        Export PDF button.
      </div>
    </div>
  );
}