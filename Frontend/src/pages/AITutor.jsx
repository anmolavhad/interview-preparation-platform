import { useState } from "react";

import Navbar from "../components/Navbar";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";
import { askAI } from "../api/ai";

import "../styles/AITutor.css";

function AITutor() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Hi! I'm your AI Interview Tutor.\n\nAsk me anything about DSA, DBMS, OS, CN, OOP, Java, JavaScript, React, Node.js, MongoDB, SQL or interview preparation.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const handleSend = async (prompt) => {
    if (!prompt.trim() || loading) return;

    const userMessage = {
      role: "user",
      content: prompt,
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const reply = await askAI(prompt);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: reply,
        },
      ]);
    } catch (error) {
        console.log("this error 1", error);
        console.log("this error 2",error.response);
        console.log("this error 3",error.response?.data);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "❌ Sorry, something went wrong while contacting the AI.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="ai-page">
        <div className="ai-container">
          <div className="ai-header">
            <h1>AI Tutor</h1>

            <p>
              Ask doubts about DSA, DBMS, OS, CN, OOP,
              Java, React, Node.js and interview
              preparation.
            </p>
          </div>

          <div className="chat-box">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                role={message.role}
                message={message.content}
              />
            ))}

            {loading && (
              <div className="loading-message">
                🤖 AI is thinking...
              </div>
            )}
          </div>

          <ChatInput
            onSend={handleSend}
            disabled={loading}
          />
        </div>
      </div>
    </>
  );
}

export default AITutor;