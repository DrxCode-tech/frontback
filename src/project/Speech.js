import { useState, useRef } from "react";

export default function ChatInput() {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  const handleSend = () => {
    if (!message.trim()) return;

    console.log("Sending:", message);
    setMessage(""); // clear message

    // reset height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleInput = (e) => {
    setMessage(e.target.value);

    // auto-resize height up to max
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        160 // Tailwind max-h-40 (40 * 4px)
      )}px`;
    }
  };

  return (
    <div className="flex items-end space-x-2 border p-2 rounded-xl bg-gray-800">
      <textarea
        ref={textareaRef}
        value={message}
        onChange={handleInput}
        placeholder="Type your message..."
        className="flex-1 resize-none overflow-y-auto max-h-40 outline-none bg-transparent text-gray-200 leading-[1.6em] py-2"
        rows={1} // ensures it starts small
        style={{ minHeight: "2rem" }} // keeps a nice small base height
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
      >
        Send
      </button>
    </div>
  );
}