// app/page.jsx
export default function HomePage() {
  return (
    <div className="container">
      <h1 className="title">⚡ NeuroShield-AI Overview</h1>
      <p className="muted">
        This dashboard connects to the FastAPI backend to provide autonomous cybersecurity features:
        log anomaly detection (autoencoder), threat classification (Transformer), LLM remediation,
        and an attack simulation engine.
      </p>

      <div className="grid-cards">
        <div className="card">
          <h3>Log Anomaly Detection</h3>
          <p className="muted-small">Paste logs and detect anomalies.</p>
        </div>
        <div className="card">
          <h3>Threat Classification</h3>
          <p className="muted-small">Classify alert text or features.</p>
        </div>
        <div className="card">
          <h3>Auto Remediation</h3>
          <p className="muted-small">Generate remediation steps from detected issues.</p>
        </div>
        <div className="card">
          <h3>Attack Simulation</h3>
          <p className="muted-small">Simulate common attack chains to test detection.</p>
        </div>
      </div>
    </div>
  );
}
