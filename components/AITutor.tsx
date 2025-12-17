
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Search, BrainCircuit } from 'lucide-react';
import { Message } from '../types';
import { sendMessageToGemini } from '../services/gemini';

interface AITutorProps {
  currentModuleTitle: string;
}

export const AITutor: React.FC<AITutorProps> = ({ currentModuleTitle }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: `Hi! I'm your AI Tutor. We are currently studying "${currentModuleTitle}". Ask me anything!` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Toggles for specialized modes
  const [useSearch, setUseSearch] = useState(false);
  const [useThinking, setUseThinking] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
     setMessages([
        { role: 'model', text: `I see you switched topics to "${currentModuleTitle}". How can I help you with this?` }
     ])
  }, [currentModuleTitle]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Determine mode
    let mode: 'standard' | 'search' | 'thinking' = 'standard';
    if (useSearch) mode = 'search';
    else if (useThinking) mode = 'thinking';

    const responseText = await sendMessageToGemini(input, currentModuleTitle, mode);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-3xl mx-auto bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="bg-[#1e3a8a] p-4 flex items-center justify-between shadow-md z-10">
        <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-full">
                <Bot className="w-5 h-5 text-[#1e3a8a]" />
            </div>
            <div>
                <h2 className="text-white font-bold">Gemini Tutor</h2>
                <p className="text-blue-200 text-xs">
                    {useThinking ? 'Deep Thinking (Pro)' : useSearch ? 'Web Grounding (Flash)' : 'Standard (Flash)'}
                </p>
            </div>
        </div>
      </div>
      
      {/* Controls */}
      <div className="bg-blue-50 p-2 flex gap-2 border-b border-blue-100 justify-center">
          <button 
            onClick={() => { setUseSearch(!useSearch); setUseThinking(false); }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-colors ${useSearch ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'}`}
          >
              <Search size={12} /> Search the Web
          </button>
          <button 
            onClick={() => { setUseThinking(!useThinking); setUseSearch(false); }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-colors ${useThinking ? 'bg-purple-600 text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'}`}
          >
              <BrainCircuit size={12} /> Deep Reason (Think)
          </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-blue-100 text-[#1e3a8a]' : 'bg-amber-100 text-amber-600'}`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div
              className={`max-w-[80%] rounded-2xl px-5 py-3 text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-[#1e3a8a] text-white rounded-tr-none'
                  : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex items-start gap-3">
                 <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-amber-100 text-amber-600">
                    <Sparkles size={16} className="animate-pulse" />
                </div>
                <div className="bg-white text-slate-500 border border-slate-100 px-5 py-3 rounded-2xl rounded-tl-none text-sm italic">
                    {useThinking ? 'Thinking deeply (this may take a moment)...' : useSearch ? 'Searching Google...' : 'Thinking...'}
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-slate-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={useSearch ? "Ask for recent news..." : useThinking ? "Ask a complex problem..." : "Ask about this module..."}
            className="flex-1 border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] bg-slate-50"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-[#1e3a8a] text-white p-3 rounded-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
