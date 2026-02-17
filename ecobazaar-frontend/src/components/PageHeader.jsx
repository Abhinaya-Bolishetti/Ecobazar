import React from "react";
import { theme } from "../theme"; // ✅ correct

const PageHeader = ({ title, subtitle }) => {
  return (
    <div style={wrap}>
      <img src="/logo.png" alt="EcoBazaar" style={logo} />
      <div>
        <h2 style={titleStyle}>{title}</h2>
        {subtitle && <p style={sub}>{subtitle}</p>}
      </div>
    </div>
  );
};

const wrap = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "20px",
};

const logo = {
  width: "42px",
};

const titleStyle = {
  margin: 0,
  color: theme.green,
};

const sub = {
  margin: 0,
  fontSize: "13px",
  color: theme.muted,
};

export default PageHeader;
