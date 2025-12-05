// app/threats/page.jsx
"use client";
import { useState } from "react";

export default function ThreatsPage() {
  const [text, setText] = useState("");
  const [out, setOut] = useState(null);
  const [loading, setLoading] = useState(false);
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  async function classify() {
    setLoading(true);
    setOut(null);
    try {
      const res = await fetch(`${backend}/classify/threat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });
      if (!res.ok) throw new Error(`${res.status}`);
      const json = await res.json();
      setOut(json);
    } catch (err) {
      setOut({ error: String(err) });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <h1 className="title">Threat Classification</h1>

      <input
        className="text-input"
        placeholder="Enter alert message or text to classify..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div style={{ marginTop: 14 }}>
        <button className="cyber-btn" onClick={classify} disabled={loading}>
          {loading ? "Classifying..." : "Classify Threat"}
        </button>
      </div>

      <div style={{ marginTop: 20 }}>
        <pre className="output">{out ? JSON.stringify(out, null, 2) : "Classification result"}</pre>
      </div>
    </div>
  );
}
