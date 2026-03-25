import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Sparkles, X, Bot } from 'lucide-react';

const AIChatbot: React.FC = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hello! I'm your Aqua AI assistant. How can I help you with your onboarding today?" }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput('');
    // Mock AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: "I'm here to help! What specifically do you need assistance with regarding your onboarding?" }]);
    }, 1000);
  };

  return (
    <div className="glass-card p-6 rounded-3xl flex flex-col h-[500px]">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
          <Bot className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-medium">Aqua AI Assistant</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 custom-scrollbar">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white/5 text-slate-200'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask me anything..."
          className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-indigo-500/50"
        />
        <button onClick={handleSend} className="p-3 bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-all">
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AIChatbot;
