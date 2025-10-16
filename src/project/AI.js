import React, { useState, useRef, useEffect } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [messages, setMessages] = useState(["Welcome to Groq Chat!"]);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add a test message
  const sendMessage = () => {
    setMessages([...messages, "New message at " + new Date().toLocaleTimeString()]);
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
        
        {/* 🟦 Sidebar */}
        <div className={`bg-gray-800 dark:bg-gray-700 text-white w-64 p-6 transition-all duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} fixed h-full`}>
          <h2 className="text-xl font-bold mb-4">Sidebar</h2>
          <ul className="space-y-3">
            <li className="hover:text-blue-400 cursor-pointer">Dashboard</li>
            <li className="hover:text-blue-400 cursor-pointer">Models</li>
            <li className="hover:text-blue-400 cursor-pointer">Settings</li>
          </ul>
        </div>

        {/* 🟩 Main Content */}
        <div className={`flex-1 ml-64 p-6 transition-all duration-300 ${sidebarOpen ? "" : "ml-0"}`}>
          {/* Navbar */}
          <nav className="flex justify-between items-center mb-6">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              {sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-md"
            >
              {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
            </button>
          </nav>

          {/* Hero with radial gradient */}
          <div className="h-48 w-full rounded-xl bg-gradient-radial from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold mb-6">
            Radial Gradient Hero
          </div>

          {/* Chat Area */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-6 max-w-xl">
            <h3 className="font-bold mb-2 text-gray-800 dark:text-gray-100">Chat Box</h3>
            <div className="h-48 overflow-y-auto border border-gray-300 dark:border-gray-700 rounded-md p-2 mb-2">
              {messages.map((msg, i) => (
                <p key={i} className="mb-1 opacity-0 animate-fadeIn">{msg}</p>
              ))}
              <div ref={messagesEndRef}></div>
            </div>
            <button
              onClick={sendMessage}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;