import React from "react";

const PageWrapper = ({ children }) => {
  return (
    <div
      style={{
        minHeight: "80vh",
        background: "linear-gradient(180deg, #f4f7f6, #ffffff)",
        padding: "10px 0",
      }}
    >
      {children}
    </div>
  );
};

export default PageWrapper;
