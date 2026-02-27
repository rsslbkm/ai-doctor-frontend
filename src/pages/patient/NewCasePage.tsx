import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import ImageUpload from "../../features/uploads/components/ImageUpload";

type SymptomKey =
  | "fever"
  | "cough"
  | "headache"
  | "sore_throat"
  | "rash"
  | "shortness_of_breath"
  | "nausea"
  | "fatigue";

const SYMPTOMS: { key: SymptomKey; label: string }[] = [
  { key: "fever", label: "Fever" },
  { key: "cough", label: "Cough" },
  { key: "headache", label: "Headache" },
  { key: "sore_throat", label: "Sore throat" },
  { key: "rash", label: "Rash" },
  { key: "shortness_of_breath", label: "Shortness of breath" },
  { key: "nausea", label: "Nausea" },
  { key: "fatigue", label: "Fatigue" },
];

export default function NewCasePage() {
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [checks, setChecks] = useState<Record<SymptomKey, boolean>>({
    fever: false,
    cough: false,
    headache: false,
    sore_throat: false,
    rash: false,
    shortness_of_breath: false,
    nausea: false,
    fatigue: false,
  });

  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selected = useMemo(
    () => SYMPTOMS.filter((s) => checks[s.key]).map((s) => s.label),
    [checks]
  );

  const toggle = (key: SymptomKey) => {
    setChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const submit = () => {
    setError(null);

    const hasText = text.trim().length > 0;
    const hasChecks = selected.length > 0;

    if (!hasText && !hasChecks) {
      setError("Please describe symptoms or select at least one symptom.");
      return;
    }

    
    const caseId = Date.now().toString();

    
    const payload = {
      caseId,
      createdAt: new Date().toISOString(),
      symptomText: text.trim(),
      selectedSymptoms: selected,
      hasImage: Boolean(image),
      status: "Pending Analysis",
    };
    localStorage.setItem(`case:${caseId}`, JSON.stringify(payload));

    navigate(`/patient/ai-results/${caseId}`);
  };

  return (
    <div style={{ maxWidth: 860 }}>
      <h1>New Case</h1>
      <p style={{ color: "#555" }}>Describe your symptoms and (optionally) upload an image.</p>

      <Card>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Describe symptoms</div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Example: sore throat for 2 days, mild fever, cough at night..."
          rows={5}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 12,
            border: "1px solid #ddd",
            outline: "none",
            resize: "vertical",
          }}
        />

        <div style={{ marginTop: 16, fontWeight: 700 }}>Or select symptoms</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10, marginTop: 10 }}>
          {SYMPTOMS.map((s) => (
            <label key={s.key} style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input type="checkbox" checked={checks[s.key]} onChange={() => toggle(s.key)} />
              <span>{s.label}</span>
            </label>
          ))}
        </div>

        <ImageUpload value={image} onChange={setImage} />

        {error && (
          <div style={{ marginTop: 12, color: "#b00020", fontWeight: 700 }}>
            {error}
          </div>
        )}

        <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
          <Button type="button" onClick={submit}>
            Submit for AI analysis
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setText("");
              setImage(null);
              setError(null);
              setChecks({
                fever: false,
                cough: false,
                headache: false,
                sore_throat: false,
                rash: false,
                shortness_of_breath: false,
                nausea: false,
                fatigue: false,
              });
            }}
          >
            Clear
          </Button>
        </div>
      </Card>
    </div>
  );
}