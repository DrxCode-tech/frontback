import { useState } from "react";

function XI() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDark = () => setDarkMode(!darkMode);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-all duration-500">
        
        {/* 🌐 Navbar */}
        <nav className="bg-gray-900 dark:bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
          <h1 className="text-2xl font-bold">Groq Dashboard</h1>

          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-blue-400">Home</a>
            <a href="#" className="hover:text-blue-400">Models</a>
            <a href="#" className="hover:text-blue-400">About</a>

            {/* 🌗 Toggle Button */}
            <button
              onClick={toggleDark}
              className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md"
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
        </nav>

        {/* 🧠 Hero Section */}
        <header className="text-center py-12 bg-white dark:bg-gray-800 shadow-md">
          <h2 className="text-4xl font-bold mb-3">Welcome to Groq AI</h2>
          <p className="text-lg mb-4">
            Generate intelligent responses with FastAPI + React integration.
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
            Try Now
          </button>
        </header>

        {/* 🧾 Stats Section */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6">
          {[
            { num: "12", label: "Active Models" },
            { num: "270+", label: "Users Connected" },
            { num: "99.9%", label: "Uptime" },
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 text-center">
              <h3 className="text-2xl font-bold">{stat.num}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </section>

        {/* 💬 Chat Section */}
        <section className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mt-6">
          <h3 className="text-2xl font-bold mb-4">Chat with Groq</h3>
          <textarea
            className="w-full border border-gray-300 dark:border-gray-700 bg-transparent rounded-md p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
            placeholder="Type your prompt..."
          ></textarea>
          <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
            Generate
          </button>
        </section>

        {/* 📦 Cards Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {[
            { title: "Model Speed", desc: "Groq delivers responses faster than traditional LLMs." },
            { title: "API Security", desc: "Your API key and data remain secure using backend verification." },
            { title: "Integrations", desc: "Works smoothly with React, FastAPI, Node.js, and MongoDB." },
          ].map((card, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
              <h4 className="text-lg font-bold mb-2">{card.title}</h4>
              <p>{card.desc}</p>
            </div>
          ))}
        </section>

        {/* ⚙️ Footer */}
        <footer className="bg-gray-900 text-white text-center py-4 mt-6 dark:bg-gray-800">
          <p className="text-sm">
            © {new Date().getFullYear()} Groq AI Dashboard. Built with ❤️ by Anietie & Joseph.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default XI;