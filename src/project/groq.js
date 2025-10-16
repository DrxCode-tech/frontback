import React, { useState, useRef } from "react";  
import ReactMarkdown from "react-markdown";  
import { useEffect } from "react";
import remarkGfm from "remark-gfm";  

import {  
  AlignJustify,  
  MessageCircleMore,  
  BrainCircuit,  
  BrainCog,  
  Bot,  
  MessagesSquare,  
  ArrowUp,  
  Mic,  
  X,  
  Settings,  
  SunMedium,  
  Moon,
  Copy
} from "lucide-react";  
  
export default function App() {  
  const [dark, setDark] = useState(true);  
  const [messages, setMessages] = useState([]);  
  const [input, setInput] = useState("");  
  const [sideBar, setSideBar] = useState(false);  
  const [mic, setMic] = useState(true);  
  const [isListening, setIsListening] = useState(false);  
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);  
  const textareaRef = useRef(null);  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  
  // 🎙️ Start/stop speech recognition  
  const handleMic = () => {  
    if (!("webkitSpeechRecognition" in window)) {  
      alert("Sorry, your browser doesn't support speech recognition.");  
      return;  
    }  
  
    if (!recognitionRef.current) {  
      const recognition = new window.webkitSpeechRecognition();  
      recognition.continuous = false;  
      recognition.lang = "en-US";  
  
      recognition.onstart = () => setIsListening(true);  
      recognition.onend = () => setIsListening(false);  
  
      recognition.onresult = (event) => {  
        const transcript = event.results[0][0].transcript;  
        setInput((prev) => prev + " " + transcript);  
        setMic(false); // hide mic when speech detected  
      };  
  
      recognitionRef.current = recognition;  
    }  
  
    if (isListening) {  
      recognitionRef.current.stop();  
    } else {  
      recognitionRef.current.start();  
    }  
  };  
  
  const toggle = () => setDark(!dark);  
  const sideBarToggle = () => setSideBar(!sideBar);  
  
  const sendMessage = async () => {  
    if (!input.trim()) return;  
    // Display user message  
    setMessages([...messages, { text: input, sender: "user" }]);  
    const userInput = input;  
    setInput("");  
    if (textareaRef.current) {  
      textareaRef.current.style.height = "auto";  
    }  
    setMic(true);  
  
    try {  
      // Send to backend  
      const res = await fetch("https://frontback-livid.vercel.app/api/ai/xi", {  
        method: "POST",  
        headers: {  
        "Content-Type": "application/json",  
        },  
        body: JSON.stringify({ txt: userInput }),  
      });  
  
      const data = await res.json();  
  
      if (data.reply) {  
        setMessages((prev) => [  
          ...prev,  
          { text: data.reply, sender: "ai" },  
        ]);  
      } else {  
        setMessages((prev) => [  
          ...prev,  
          { text: "⚠️ No reply from XI.", sender: "ai" },  
        ]);  
      }  
    } catch (err) {  
      console.error("Error:", err);  
      setMessages((prev) => [  
        ...prev,  
         { text: "❌ Server error. Please try again.", sender: "ai" },  
      ]);  
    }  
  };  
  const handleChange = (e) => {  
    setInput(e.target.value);  
  };  
  const handleInput = (e) => {  
    const value = e.target.value;  
    setInput(value);  
    setMic(value.trim() === ""); // mic only visible when no text  
    if (textareaRef.current) {  
      textareaRef.current.style.height = "auto";  
      textareaRef.current.style.height = `${Math.min(  
        textareaRef.current.scrollHeight,  
        160 // 40 * 4px line height = Tailwind’s h-40  
      )}px`;  
    }  
  };  
    
  return (  
    <div className={`${dark ? "dark" : ""}`}>  
      <div  
        className="h-screen w-full text-gray-900 dark:text-gray-100 flex flex-col pt-14"  
        style={  
          dark  
            ? { background: "radial-gradient(circle at top right,#1b1b1b,black)" }  
            : { background: "white" }  
        }  
      >  
        {/* HEADER */}  
        <header className="fixed top-0 left-0 w-full flex justify-between items-center bg-white/40 dark:bg-transparent p-5 border-b border-gray-700/50 backdrop-blur-3xl ">  
          <AlignJustify  
            onClick={sideBarToggle}  
            size={25}  
            className="text-gray-600 font-bold cursor-pointer"  
          />  
          <h1 className="font-extrabold text-3xl tracking-tight bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">  
            XI  
          </h1>  
        </header>  
  
        {/* CHAT BODY */}  
        <main className="flex-1 overflow-y-auto p-5 space-y-4">  
          {messages.length === 0 ? (  
            <p className="animate-fade-in text-center text-gray-500 mt-20">  
              👋 Hi there! I’m <span className="text-blue-400 font-bold">XI</span>. <br />  
              Ask me anything.  
            </p>  
          ) : (  
            messages.map((msg, i) => (  
              <div  
                key={i}  
                className={` p-3 rounded-2xl overflow-y-auto shadow-md ${  
                  msg.sender === "user"  
                    ? "bg-blue-600 max-w-[80%] text-white self-end ml-auto"  
                    : "bg-gray-500 dark:bg-gray-800 max-w-full text-gray-200 self-start"  
                }`}  
              >  
                <div className="prose prose-invert max-w-none break-words [&_pre]:bg-gray-900 [&_pre]:p-3 [&_pre]:rounded-lg [&_pre]:overflow-x-auto">  
                  <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                  code({ node, inline, className, children, ...props }) {
                    const codeText = String(children).replace(/\n$/, "");
                    const isCodeBlock = !inline;

                    const copyToClipboard = async () => {
                      try {
                        await navigator.clipboard.writeText(codeText);
                        alert("✅ Copied to clipboard!");
                      } catch (err) {
                      alert("❌ Failed to copy");
                    }
                  };

                  return isCodeBlock ? (
                    <div className="relative group">
                      <pre className="bg-gray-900 p-3 rounded-lg overflow-x-auto">
                        <code className={className} {...props}>
                          {codeText}
                        </code>
                      </pre>
                      <button
                        onClick={copyToClipboard}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 rounded-md bg-gray-800 hover:bg-gray-700"
                      >
                        <Copy size={16} className="text-gray-300" />
                      </button>
                    </div>
                    ) : (
                      <code className="bg-gray-800 px-1 py-0.5 rounded">{children}</code>
                    );
                  },
                  }}>{msg.text}</ReactMarkdown> 
                </div>  
                
              </div >  
            ))  
          )}  
          <div ref={messagesEndRef} />
        </main>  
        <div className='h-[10%] w-full' ></div>  
        {/* INPUT BAR */}  
        <footer className="p-4 border-t border-gray-700/50 bg-black/30 backdrop-blur-md fixed bottom-0 left-0 w-full">  
          <div className="flex items-center gap-3 bg-gray-900 rounded-2xl px-3 py-2">  
            <textarea  
              ref={textareaRef}  
              placeholder="Ask XI..."  
              value={input}  
              onChange={handleInput}  
              rows={1} // ensures it starts small  
              style={{ minHeight: "2rem" }} // keeps a nice small base height  
              className='max-h-40 flex-1 resize-none bg-transparent overflow-y-auto outline-none text-white leading-[1.6em] py-2'  
              ></textarea>  
            {mic && (  
              <div  
                tabIndex="0"  
                onClick={handleMic}  
                className={`rounded-full border p-2 transition duration-300 outline-none cursor-pointer ${  
                  isListening  
                    ? "border-blue-400 bg-blue-900/30 text-blue-400"  
                    : "border-gray-700 text-gray-400 "  
                }`}  
              >  
                <Mic />  
              </div>  
            )}  
            <div  
              tabIndex="0"  
              onClick={sendMessage}  
              className="rounded-full border border-gray-700 hover:border-blue-400 hover:bg-blue-900/30 text-gray-400 hover:text-blue-400 transition duration-200 outline-none p-2 cursor-pointer"  
            >  
              <ArrowUp />  
            </div>  
          </div>  
        </footer>  
  
        {/* SIDEBAR */}  
        <div  
          className={`fixed top-0 left-0 flex flex-col h-screen bg-white/40 dark:bg-black/30 border-r border-gray-600 rounded-tr-2xl rounded-br-2xl shadow-2xl duration-300 overflow-hidden ${  
            sideBar ? "w-[65%] p-4" : "w-0"  
          } backdrop-blur-md ${sideBar ? "overflow-y-scroll" : "overflow-hidden"}`}  
        >  
          <div  
            onClick={sideBarToggle}  
            className="w-full flex justify-end items-end p-1 bg-transparent text-gray-700 dark:text-gray-400 font-bold cursor-pointer"  
          >  
            <X />  
          </div>  
  
          <div className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent flex items-center gap-4 mb-5 font-bold p-2 rounded-2xl hover:text-gray-500 cursor-pointer">  
            <MessagesSquare size={25} className="text-gray-700 dark:text-white" />{" "}  
            New Chat  
          </div>  
  
          <div className="max-w-60 text-gray-700 dark:text-gray-400 flex items-center gap-4 mb-5 font-medium p-2 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-800 hover:border hover:border-gray-500 dark:hover:border-gray-200 hover:text-black dark:hover:text-white transition-colors duration-300 cursor-pointer">  
            <Bot size={25} /> Chat Bot  
          </div>  
  
          <div className="max-w-60 text-gray-700 dark:text-gray-400 flex items-center gap-4 mb-5 font-medium p-2 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-800 hover:border hover:border-gray-500 dark:hover:border-gray-200 hover:text-black dark:hover:text-white transition-colors duration-300 cursor-pointer">  
            <BrainCog size={25} /> LLM-4  
          </div>  
  
          <div className="max-w-60 text-gray-700 dark:text-gray-400 flex items-center gap-4 mb-5 font-medium p-2 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-800 hover:border hover:border-gray-500 dark:hover:border-gray-200 hover:text-black dark:hover:text-white transition-colors duration-300 cursor-pointer">  
            <BrainCircuit size={25} /> LLM-5  
          </div>  
  
          <hr className="bg-gray-300 dark:bg-gray-600 p-0.5" />  
  
          <div className="flex flex-col justify-end items-start w-full flex-1">  
            <div className="max-w-60 text-gray-700 dark:text-gray-400 flex items-center gap-4 mb-5 font-medium p-2 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-800 hover:border hover:border-gray-500 dark:hover:border-gray-200 hover:text-black dark:hover:text-white transition-colors duration-300 cursor-pointer">  
              <Settings size={25} /> Settings  
            </div>  
  
            <div className="flex gap-1">  
              {dark ? (  
                <div  
                  onClick={toggle}  
                  className="max-w-60 text-gray-700 dark:text-gray-400 flex items-center gap-4 mb-5 font-medium p-2 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-800 hover:border hover:border-gray-500 dark:hover:border-gray-200 hover:text-black dark:hover:text-white transition-colors duration-300 cursor-pointer"  
                >  
                  <SunMedium /> Light  
                </div>  
              ) : (  
                <div  
                  onClick={toggle}  
                  className="max-w-60 text-gray-700 dark:text-gray-400 flex items-center gap-4 mb-5 font-medium p-2 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-800 hover:border hover:border-gray-500 dark:hover:border-gray-200 hover:text-black dark:hover:text-white transition-colors duration-300 cursor-pointer"  
                >  
                  <Moon /> Dark  
                </div>  
              )}  
            </div>  
          </div>  
        </div>  
      </div>  
    </div>  
  );  
}
