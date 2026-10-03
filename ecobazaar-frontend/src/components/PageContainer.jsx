import React from "react";
import { theme } from "../theme"; // ✅ correct

const PageContainer = ({ children }) => {
  return <div style={container}>{children}</div>;
};

const container = {
  minHeight: "100vh",
  background: theme.bg,
  padding: "30px 20px",
};

export default PageContainer;
