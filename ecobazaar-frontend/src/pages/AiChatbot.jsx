import React, { useState, useRef, useEffect } from "react";
import api from "../api/api";
import PageHeader from "../components/PageHeader";
import PageContainer from "../components/PageContainer";
import EcoButton from "../components/EcoButton";
import { theme } from "../theme";

const AiChatbot = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = { from: "user", text: message };
    setChat((prev) => [...prev, userMsg]);

    try {
      const res = await api.post("/ai/chat", { message });
      const botMsg = { from: "bot", text: res.data.reply };
      setChat((prev) => [...prev, botMsg]);
    } catch (e) {
      setChat((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Sorry, I’m having trouble responding right now.",
        },
      ]);
    }

    setMessage("");
  };

  return (
    <PageContainer>
      <PageHeader
        title="EcoBazaar AI Assistant"
        subtitle="Ask me anything about sustainability 🌿"
      />

      <div style={chatCard}>
        <div style={chatBox}>
          {chat.length === 0 && (
            <div style={emptyState}>
              🤖 Ask me about eco-friendly products, carbon impact, or tips to
              live sustainably.
            </div>
          )}

          {chat.map((c, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: c.from === "user" ? "flex-end" : "flex-start",
                marginBottom: "10px",
                animation: "fadeIn 0.3s ease",
              }}
            >
              <div
                style={{
                  ...bubble,
                  background:
                    c.from === "user" ? theme.green : theme.lightGreen,
                  color: c.from === "user" ? "#fff" : theme.text,
                  borderTopRightRadius: c.from === "user" ? 4 : 14,
                  borderTopLeftRadius: c.from === "bot" ? 4 : 14,
                }}
              >
                {c.text}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div style={inputBar}>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask about eco products, carbon footprint..."
            style={inputStyle}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <EcoButton onClick={sendMessage}>Ask AI</EcoButton>
        </div>
      </div>
    </PageContainer>
  );
};

const chatCard = {
  background: "#fff",
  borderRadius: theme.radius,
  boxShadow: theme.shadow,
  maxWidth: "700px",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  height: "75vh",
};

const chatBox = {
  flex: 1,
  padding: "20px",
  overflowY: "auto",
  background: "#f9fdf9",
};

const bubble = {
  padding: "10px 14px",
  borderRadius: "14px",
  maxWidth: "75%",
  fontSize: "14px",
  lineHeight: 1.4,
};

const inputBar = {
  display: "flex",
  gap: "10px",
  padding: "14px",
  borderTop: "1px solid #eee",
  background: "#fff",
};

const inputStyle = {
  flex: 1,
  padding: "10px 12px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  outline: "none",
  fontSize: "14px",
};

const emptyState = {
  textAlign: "center",
  color: theme.muted,
  marginTop: "40px",
  fontSize: "14px",
};

export default AiChatbot;
