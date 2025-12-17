
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Trophy, RefreshCw, Play, CheckCircle } from 'lucide-react';
import { SimulationConfig, Message } from '../types';
import { runSimulationTurn } from '../services/gemini';

interface InteractiveSimulationProps {
  config: SimulationConfig;
  isCompleted: boolean;
  onComplete: () => void;
}

export const InteractiveSimulation: React.FC<InteractiveSimulationProps> = ({ config, isCompleted, onComplete }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const startSimulation = () => {
      setMessages([{ role: 'model', text: config.initialMessage }]);
      setHasStarted(true);
      setIsSuccess(false);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading || isSuccess) return;

    const userMsg: Message = { role: 'user', text: input };
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput('');
    setIsLoading(true);

    const result = await runSimulationTurn(messages, input, config);
    
    setMessages(prev => [...prev, { role: 'model', text: result.text }]);
    
    if (result.isSuccess) {
        setIsSuccess(true);
        onComplete();
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
    }
  };

  if (!hasStarted) {
      return (
          <div className={`rounded-xl p-8 text-white shadow-xl border-2 relative overflow-hidden group transition-all ${isCompleted ? 'bg-gradient-to-br from-green-900 to-slate-900 border-green-500/50' : 'bg-gradient-to-br from-[#1e3a8a] to-blue-900 border-blue-500/30'}`}>
              <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-20 group-hover:opacity-30 transition-opacity ${isCompleted ? 'bg-green-500' : 'bg-blue-500'}`}></div>
              
              <div className="relative z-10 text-center">
                  <div className={`inline-block p-4 rounded-full mb-4 ring-1 ${isCompleted ? 'bg-green-500/20 ring-green-400/50' : 'bg-blue-500/20 ring-blue-400/50'}`}>
                      {isCompleted ? <Trophy size={48} className="text-green-300" /> : <Bot size={48} className="text-amber-400" />}
                  </div>
                  
                  {isCompleted && (
                      <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-bold border border-green-500/30">
                          <CheckCircle size={14} /> Mission Completed
                      </div>
                  )}

                  <h3 className="text-2xl font-bold mb-2">Interactive Challenge</h3>
                  <p className="text-blue-200 mb-6 max-w-lg mx-auto">
                      {config.objective}
                  </p>
                  <button 
                    onClick={startSimulation}
                    className={`${isCompleted ? 'bg-green-600 hover:bg-green-500 shadow-green-500/30' : 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/30'} px-8 py-3 rounded-full font-bold shadow-lg transition-all flex items-center gap-2 mx-auto`}
                  >
                      <Play size={20} fill="currentColor" /> {isCompleted ? 'Replay Mission' : 'Start Mission'}
                  </button>
              </div>
          </div>
      );
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg border-2 overflow-hidden flex flex-col h-[500px] ${isCompleted ? 'border-green-200' : 'border-blue-100'}`}>
        {/* Header */}
        <div className={`p-4 border-b flex justify-between items-center ${isCompleted ? 'bg-green-50 border-green-100' : 'bg-blue-50 border-blue-100'}`}>
            <div>
                <div className="flex items-center gap-2">
                    <h4 className={`font-bold text-sm uppercase tracking-wide ${isCompleted ? 'text-green-900' : 'text-[#1e3a8a]'}`}>Mission Objective</h4>
                    {isCompleted && <CheckCircle size={14} className="text-green-600" />}
                </div>
                <p className={`${isCompleted ? 'text-green-700' : 'text-blue-700'} text-xs`}>{config.objective}</p>
            </div>
            <button 
                onClick={startSimulation}
                className="text-slate-400 hover:text-[#1e3a8a] transition-colors"
                title="Reset Simulation"
            >
                <RefreshCw size={18} />
            </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {messages.map((msg, idx) => (
                <div key={idx} className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-[#1e3a8a] text-white' : 'bg-amber-100 text-amber-600'}`}>
                        {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                        msg.role === 'user' 
                        ? 'bg-[#1e3a8a] text-white rounded-tr-none' 
                        : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                    }`}>
                        {msg.text}
                    </div>
                </div>
            ))}
            {isLoading && (
                 <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-amber-100 text-amber-600">
                        <Sparkles size={16} className="animate-pulse" />
                    </div>
                    <div className="bg-white text-slate-500 px-4 py-2 rounded-2xl rounded-tl-none text-xs italic border border-slate-200">
                        Thinking...
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Success Overlay */}
        {isSuccess && (
            <div className="bg-green-50 p-4 border-t border-green-200 flex items-center gap-3 animate-in slide-in-from-bottom-5">
                <div className="bg-green-100 p-2 rounded-full text-green-600">
                    <Trophy size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-green-800">Mission Accomplished!</h4>
                    <p className="text-xs text-green-700">You successfully completed the interactive challenge.</p>
                </div>
            </div>
        )}

        {/* Input Area */}
        {!isSuccess && (
            <div className="p-3 bg-white border-t border-slate-200">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your response..."
                        className="flex-1 border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                        autoFocus
                    />
                    <button
                        onClick={handleSend}
                        disabled={isLoading || !input.trim()}
                        className="bg-[#1e3a8a] text-white p-2 rounded-lg hover:bg-blue-800 disabled:opacity-50 transition-colors"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
        )}
    </div>
  );
};
