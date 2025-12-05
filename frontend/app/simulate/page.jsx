// app/simulate/page.jsx
"use client";
import { useState } from "react";

export default function SimulatePage() {
  const [attack, setAttack] = useState("credential_stuffing");
  const [out, setOut] = useState(null);
  const [loading, setLoading] = useState(false);
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  async function run() {
    setLoading(true);
    setOut(null);
    try {
      const res = await fetch(`${backend}/simulate/attack`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ attack_type: attack })
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
      <h1 className="title">Attack Simulator</h1>

      <label className="label">Select attack</label>
      <select className="select" value={attack} onChange={e => setAttack(e.target.value)}>
        <option value="credential_stuffing">Credential stuffing</option>
        <option value="port_scan">Port scan</option>
        <option value="ransomware_chain">Ransomware chain</option>
      </select>

      <div style={{ marginTop: 12 }}>
        <button className="cyber-btn" onClick={run} disabled={loading}>{loading ? "Running..." : "Simulate Attack"}</button>
      </div>

      <div style={{ marginTop: 20 }}>
        <pre className="output">{out ? JSON.stringify(out, null, 2) : "Simulation result will appear here."}</pre>
      </div>
    </div>
  );
}
