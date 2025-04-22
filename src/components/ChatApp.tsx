import { useState, useEffect, useRef, useCallback, useMemo } from "react";

export default function ChatApp() {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState(""); // 🔥 Track input value
  const chatRef = useRef<HTMLDivElement | null>(null);

  const addMessage = useCallback(() => {
    if (message.trim() !== "") {
      setMessages((prev) => [...prev, message]);
      setMessage(""); // 🔥 Clear input after sending
    }
  }, [message]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const formattedMessages = useMemo(() => {
    return messages.map((msg, i) => `User: ${msg}`);
  }, [messages]);

  return (
    <div className="p-4 border w-80">
      <div ref={chatRef} className="h-40 overflow-y-auto border p-2">
        {formattedMessages.map((msg, i) => (
          <div key={i} className="p-1 border-b">
            {msg}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)} // 🔥 Update input state
        className="border p-2 w-full mt-2"
      />
      <button
        onClick={addMessage}
        className="p-2 bg-blue-500 text-white w-full mt-2"
      >
        Send
      </button>
    </div>
  );
}
