import { ChatMessage } from "@/types/chat";
import ReactMarkdown from "react-markdown";

interface Props {
  message: ChatMessage;
  isStreaming: boolean;
}

export default function MessageBubble({ message, isStreaming }: Props) {
  const isUser = message.role === "user";

  return (
    <div className="w-full px-4 py-1">
      <div
        className={`max-w-3xl mx-auto flex ${
          isUser ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`
            ${
              isUser
                ? "bg-[#2F2F2F] text-white rounded-2xl rounded-br-md px-3 py-2"
                : "text-[#ECECF1]"
            }
          max-w-[75%] text-[11px] leading-6
          `}
        >
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => (
                <h1 className="text-[16px] font-semibold mb-2" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-[15px] font-semibold mb-2" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-[14px] font-semibold mb-2" {...props} />
              ),
              p: ({ node, ...props }) => <p className="mb-2" {...props} />,
              blockquote: ({ node, ...props }) => (
                <blockquote
                  className="border-l-2 border-[#3F3F46] pl-3 text-[#A1A1AA] italic mb-2"
                  {...props}
                />
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>

          {isStreaming && (
            <span className="ml-1 animate-pulse text-[#A1A1AA]">▍</span>
          )}
        </div>
      </div>
    </div>
  );
}
