// app/remediate/page.jsx
"use client";
import { useState } from "react";

export default function RemediatePage() {
  const [summary, setSummary] = useState("");
  const [issues, setIssues] = useState("");
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  async function generate() {
    setLoading(true);
    setPlan(null);
    try {
      const payload = { threat_description: `${summary}\n\nDetected issues: ${issues}`.trim() };
      const res = await fetch(`${backend}/autofix`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(`${res.status}`);
      const json = await res.json();
      setPlan(json);
    } catch (err) {
      setPlan({ error: String(err) });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container two-col">
      <div>
        <h1 className="title">Auto Remediation (Gemini 2.5 Flash)</h1>

        <label className="label">System summary</label>
        <textarea className="big-textarea" value={summary} onChange={e => setSummary(e.target.value)} />

        <label className="label">Detected issues</label>
        <textarea className="big-textarea" value={issues} onChange={e => setIssues(e.target.value)} />

        <div style={{ marginTop: 12 }}>
          <button className="cyber-btn" onClick={generate} disabled={loading}>
            {loading ? "Generating..." : "Generate Remediation Plan"}
          </button>
        </div>
      </div>

      <aside className="card right">
        <h3>Remediation plan</h3>
        <pre className="output">{plan ? JSON.stringify(plan, null, 2) : "The Gemini-powered remediation plan will appear here."}</pre>
      </aside>
    </div>
  );
}
