import React from "react";

export default function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        border: "1px solid #e5e5e5",
        borderRadius: 14,
        padding: 16,
        background: "#fff",
        ...style,
      }}
    >
      {children}
    </div>
  );
}