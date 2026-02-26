"use client";

import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { ChatMessage } from "@/types/chat";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import useAutoScroll from "@/hooks/useAutoScroll";

export default function ChatLayout() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [streamingId, setStreamingId] = useState<string | null>(null);
  const bottomRef = useAutoScroll(messages);
  const wsRef = useRef<WebSocket | null>(null);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: uuidv4(),
      role: "user",
      content: text,
    };

    const assistantId = uuidv4();

    const assistantMessage: ChatMessage = {
      id: assistantId,
      role: "assistant",
      content: "",
    };

    // Add user + empty assistant message
    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setStreamingId(assistantId);

    // 🔥 Create WebSocket connection
    const ws = new WebSocket("ws://localhost:8001/ws/chat");
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          session_id: "007",
          message: text,
        }),
      );
    };

    ws.onmessage = (event) => {
      if (event.data === "[DONE]") {
        setStreamingId(null);
        ws.close();
        return;
      }

      // Try parsing JSON (audio message)
      try {
        const parsed = JSON.parse(event.data);

        if (parsed.type === "audio") {
          const audio = new Audio("http://localhost:8001" + parsed.audio_url);
          audio.play().catch((err) => console.error("Audio play error:", err));
          return;
        }
      } catch {
        // Not JSON → normal token stream
      }

      // Append streaming token
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId
            ? { ...msg, content: msg.content + event.data }
            : msg,
        ),
      );
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
      setStreamingId(null);
    };

    ws.onclose = () => {
      wsRef.current = null;
    };
  };

  return (
    <main className="flex flex-col h-full bg-[#212121] text-[#ECECF1]">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto pt-6">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h1 className="text-[28px] font-semibold tracking-tight">
                AI Contact Center Agent
              </h1>
              <p className="mt-3 text-sm text-[#9CA3AF]">
                How can I help you today?
              </p>
            </div>
          </div>
        ) : (
          <MessageList messages={messages} streamingId={streamingId} />
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <ChatInput onSend={handleSend} />
    </main>
  );
}
  