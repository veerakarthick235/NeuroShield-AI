// app/layout.jsx
import "./globals.css";

export const metadata = {
  title: "NeuroShield-AI",
  description: "Cyber UI for NeuroShield-AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="cs-body">
        <div className="cs-shell">
          <aside className="cs-sidebar">
            <div className="cs-logo">
              NeuroShield<span className="accent">AI</span>
            </div>

            <nav className="cs-nav">
              <a href="/">Overview</a>
              <a href="/logs">Log Anomaly Detection</a>
              <a href="/threats">Threat Classification</a>
              <a href="/remediate">Auto Remediation</a>
              <a href="/simulate">Attack Simulator</a>
            </nav>

            <div className="cs-footer">Backend: http://localhost:8000</div>
          </aside>

          <main className="cs-main">{children}</main>
        </div>
      </body>
    </html>
  );
}
