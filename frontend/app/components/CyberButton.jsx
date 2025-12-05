// components/CyberButton.jsx
"use client";
export default function CyberButton({ children, onClick, disabled=false }) {
  return (
    <button className="cyber-btn" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
