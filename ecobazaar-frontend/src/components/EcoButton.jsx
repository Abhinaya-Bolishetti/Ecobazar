import React from "react";
import { theme } from "../theme"; // ✅ correct

const EcoButton = ({ children, onClick, variant = "primary", style }) => {
  const base = {
    padding: "10px 18px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    transition: theme.transition,
  };

  const variants = {
    primary: { background: theme.green, color: "#fff" },
    outline: {
      background: "transparent",
      border: `1px solid ${theme.green}`,
      color: theme.green,
    },
    danger: { background: "#d32f2f", color: "#fff" },
  };

  return (
    <button
      onClick={onClick}
      style={{ ...base, ...variants[variant], ...style }}
    >
      {children}
    </button>
  );
};

export default EcoButton;
