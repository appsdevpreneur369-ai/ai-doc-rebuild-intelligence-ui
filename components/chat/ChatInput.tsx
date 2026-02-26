"use client";

import { useRef } from "react";

interface Props {
  onSend: (text: string) => void;
}

export default function ChatInput({ onSend }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const value = textareaRef.current?.value.trim();
    if (!value) return;

    onSend(value);
    if (textareaRef.current) {
      textareaRef.current.value = "";
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  return (
    <div className="px-4 pb-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end bg-[#2F2F2F] border border-[#3F3F46] rounded-[24px] px-4 py-2">
          <textarea
            ref={textareaRef}
            rows={1}
            onInput={handleResize}
            onKeyDown={handleKeyDown}
            placeholder="Message AI Contact Center..."
            className="flex-1 bg-transparent outline-none resize-none 
                       text-[10px] leading-[22px] 
                       placeholder:text-[#9CA3AF]"
          />

          <button
            onClick={handleSend}
            className="ml-3 text-[#9CA3AF] hover:text-white transition"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
