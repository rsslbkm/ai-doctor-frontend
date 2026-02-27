import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

export default function ScheduleAppointmentPage() {
  const { id } = useParams<{ id: string }>();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("Clinic A - Room 204");
  const [reason, setReason] = useState("Follow-up examination");
  const [error, setError] = useState<string | null>(null);

  const slots = useMemo(() => {
    if (!date) return [];
    const empty = date.endsWith("01") || date.endsWith("11");
    return empty ? [] : ["09:00", "10:30", "14:00", "16:00"];
  }, [date]);

  const submit = () => {
    setError(null);
    if (!date || !time || !location.trim()) {
      setError("Date, time, and location are required.");
      return;
    }
    localStorage.setItem(
      `doctor:appointment:${id}`,
      JSON.stringify({ caseId: id, date, time, location, reason, at: new Date().toISOString() })
    );
    alert("Appointment scheduled (mock).");
  };

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <div>
          <h1>Schedule Appointment</h1>
          <p>Case ID: <b>{id ?? "—"}</b></p>
        </div>
        <Link className="navLink" to={`/doctor/cases/${id}`}>← Back to case</Link>
      </div>

      <Card>
        <div style={{ fontWeight: 800, marginBottom: 10 }}>Choose slot</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>Date *</div>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ width: "100%", padding: 12, borderRadius: 12, border: "1px solid #e5e7eb" }} />
          </div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>Time *</div>
            <select value={time} onChange={(e) => setTime(e.target.value)} style={{ width: "100%", padding: 12, borderRadius: 12, border: "1px solid #e5e7eb" }}>
              <option value="">Select…</option>
              {slots.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {date && slots.length === 0 && (
          <div style={{ marginTop: 10, color: "var(--danger)", fontWeight: 800 }}>
            No available slots for this date. Choose another date.
          </div>
        )}

        <div style={{ marginTop: 12 }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Location *</div>
          <input value={location} onChange={(e) => setLocation(e.target.value)} style={{ width: "100%", padding: 12, borderRadius: 12, border: "1px solid #e5e7eb" }} />
        </div>

        <div style={{ marginTop: 12 }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Reason</div>
          <input value={reason} onChange={(e) => setReason(e.target.value)} style={{ width: "100%", padding: 12, borderRadius: 12, border: "1px solid #e5e7eb" }} />
        </div>

        {error && <div style={{ marginTop: 10, color: "var(--danger)", fontWeight: 800 }}>{error}</div>}

        <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Button type="button" onClick={submit}>Schedule</Button>
          <Button type="button" variant="secondary" onClick={() => alert("Edit appointment later (mock)")}>
            Modify (later)
          </Button>
        </div>
      </Card>
    </div>
  );
}