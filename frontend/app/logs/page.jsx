// app/logs/page.jsx
"use client";
import { useState } from "react";

export default function LogsPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  async function analyze() {
    setLoading(true);
    setResult(null);
    try {
      const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
      const res = await fetch(`${backend}/analyze/logs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ logs: lines })
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`${res.status} ${txt}`);
      }
      const json = await res.json();
      setResult(json);
    } catch (err) {
      setResult({ error: String(err) });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <h1 className="title">Log Anomaly Detection</h1>

      <textarea
        className="big-textarea"
        placeholder="Paste syslog / auth.log / firewall logs here... one entry per line."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div style={{ marginTop: 18 }}>
        <button className="cyber-btn" onClick={analyze} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Logs"}
        </button>
      </div>

      <div style={{ marginTop: 24 }}>
        <pre className="output">
          {result ? JSON.stringify(result, null, 2) : "Results will appear here."}
        </pre>
      </div>
    </div>
  );
}
