import { ChatMessage } from "@/types/chat";
import MessageBubble from "./MessageBubble";

interface Props {
  messages: ChatMessage[];
  streamingId: string | null;
}

export default function MessageList({ messages, streamingId }: Props) {
  return (
    <div className="flex flex-col">
      {messages.map((msg) => (
        <MessageBubble
          key={msg.id}
          message={msg}
          isStreaming={streamingId === msg.id}
        />
      ))}
    </div>
  );
}
