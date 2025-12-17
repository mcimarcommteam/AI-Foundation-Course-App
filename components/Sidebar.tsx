
import React, { useState } from 'react';
import { BookOpen, MessageCircle, CheckCircle2, Circle, ShieldCheck, LogOut, Globe, Mail, Phone, Trophy, MessageSquarePlus, X } from 'lucide-react';
import { COURSE_CONTENT } from '../constants';
import { MCILogo } from './MCILogo';
import { ContentType } from '../types';
import { FeedbackModal } from './FeedbackModal';

interface SidebarProps {
  currentModuleId: string;
  onSelectModule: (id: string) => void;
  onSelectTab: (tab: 'course' | 'tutor' | 'admin') => void;
  activeTab: 'course' | 'tutor' | 'admin';
  completedModules: Set<string>;
  completedSimulations: Set<string>;
  progressPercentage: number;
  userEmail: string;
  onLogout: () => void;
  isOpen: boolean; // Mobile open state
  onClose: () => void; // Mobile close handler
}

const ADMIN_EMAIL = 'mcimarcommteam@gmail.com';

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentModuleId, 
  onSelectModule, 
  onSelectTab, 
  activeTab,
  completedModules,
  completedSimulations,
  progressPercentage,
  userEmail,
  onLogout,
  isOpen,
  onClose
}) => {
  const isAdmin = userEmail === ADMIN_EMAIL;
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  return (
    <>
    <FeedbackModal 
        isOpen={isFeedbackOpen} 
        onClose={() => setIsFeedbackOpen(false)} 
        userEmail={userEmail}
    />
    
    {/* Mobile Overlay */}
    {isOpen && (
      <div 
        className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
        onClick={onClose}
      />
    )}

    {/* Sidebar Container */}
    <div className={`
        fixed left-0 top-0 h-screen w-64 bg-[#1e3a8a] text-white shadow-2xl z-50 flex flex-col 
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0
    `}>
      {/* Brand Header */}
      <div className="p-4 border-b border-blue-800 bg-white flex justify-between items-center min-h-[90px] relative">
        <MCILogo className="h-16 w-full" />
        {/* Mobile Close Button */}
        <button 
            onClick={onClose}
            className="md:hidden absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full"
        >
            <X size={20} />
        </button>
      </div>

      {/* Course Progress Bar (Top) */}
      <div className="px-5 py-4 border-b border-blue-800 bg-blue-950/50">
        <div className="flex justify-between items-end mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200">Course Progress</span>
            <span className="text-xs font-bold text-amber-400">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-blue-950 rounded-full h-2 overflow-hidden border border-blue-800 shadow-inner">
            <div 
                className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(251,191,36,0.4)]"
                style={{ width: `${progressPercentage}%` }}
            ></div>
        </div>
      </div>

      <div className="p-4 border-b border-blue-800">
          <div className="flex gap-2 bg-blue-800 p-1 rounded-lg">
              <button 
                onClick={() => onSelectTab('course')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm rounded-md transition-colors ${activeTab === 'course' ? 'bg-white text-[#1e3a8a] font-bold' : 'text-blue-300 hover:text-white'}`}
              >
                  <BookOpen size={16} /> Course
              </button>
              <button 
                 onClick={() => onSelectTab('tutor')}
                 className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm rounded-md transition-colors ${activeTab === 'tutor' ? 'bg-white text-[#1e3a8a] font-bold' : 'text-blue-300 hover:text-white'}`}
              >
                  <MessageCircle size={16} /> Tutor
              </button>
          </div>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <h2 className="text-xs uppercase text-blue-300 font-semibold mb-3 tracking-wider">Weekly Modules</h2>
        <ul className="space-y-2">
          {COURSE_CONTENT.map((module) => {
            const isCompleted = completedModules.has(module.id);
            const isActive = currentModuleId === module.id && activeTab === 'course';
            
            // Check for completed simulations in this module
            const hasInteractive = module.content.some(c => c.type === ContentType.INTERACTIVE);
            const isInteractiveCompleted = hasInteractive && module.content.every((c, idx) => {
                if (c.type !== ContentType.INTERACTIVE) return true;
                return completedSimulations.has(`${module.id}-sim-${idx}`);
            });

            return (
              <li key={module.id}>
                <button
                  onClick={() => {
                      onSelectModule(module.id);
                      onSelectTab('course');
                  }}
                  className={`w-full text-left px-3 py-3 rounded-lg text-sm transition-all flex items-start gap-3 group relative ${
                    isActive
                      ? 'bg-amber-400 text-[#1e3a8a] font-bold shadow-md'
                      : 'text-blue-200 hover:bg-blue-800 hover:text-white'
                  }`}
                >
                  {/* Status Icon */}
                  <div className="mt-0.5 shrink-0">
                    {isCompleted ? (
                      <CheckCircle2 size={16} className={isActive ? "text-[#1e3a8a]" : "text-amber-400"} />
                    ) : (
                      <Circle size={16} className={isActive ? "text-[#1e3a8a]/50" : "text-blue-500"} />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <span className={`font-mono text-xs block mb-0.5 ${isActive ? 'text-[#1e3a8a]/70' : 'text-blue-400'}`}>
                      {module.weekRange}
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="line-clamp-2 leading-tight">{module.title}</span>
                        {isInteractiveCompleted && (
                            <div title="Simulation Completed" className="shrink-0 bg-white/20 p-0.5 rounded-full">
                                <Trophy size={12} className={isActive ? "text-[#1e3a8a]" : "text-amber-400"} />
                            </div>
                        )}
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User & Contact Footer */}
      <div className="bg-blue-950 border-t border-blue-900">
        
        {/* User Profile */}
        <div className="p-4 pb-2">
            <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-[#1e3a8a] font-bold shrink-0">
                    {userEmail.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-end mb-1">
                    <p className="text-sm font-medium truncate" title={userEmail}>{userEmail.split('@')[0]}</p>
                    </div>
                    <div className="text-xs text-blue-400 truncate">
                      Student
                    </div>
                </div>
            </div>
            
            {/* Feedback Button */}
            {!isAdmin && (
                <button 
                    onClick={() => setIsFeedbackOpen(true)}
                    className="w-full mb-3 flex items-center justify-center gap-2 py-2 text-xs rounded border border-blue-800 bg-blue-900/50 text-blue-200 hover:bg-amber-400 hover:text-[#1e3a8a] hover:border-amber-400 transition-colors font-medium"
                >
                    <MessageSquarePlus size={14} /> Give Feedback
                </button>
            )}

            <div className="flex gap-2">
                {isAdmin && (
                    <button 
                        onClick={() => onSelectTab(activeTab === 'admin' ? 'course' : 'admin')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs rounded border transition-colors ${
                            activeTab === 'admin' 
                            ? 'bg-amber-400 border-amber-400 text-[#1e3a8a] font-bold' 
                            : 'border-blue-800 text-blue-400 hover:bg-blue-900 hover:text-white'
                        }`}
                    >
                        <ShieldCheck size={14} /> 
                        {activeTab === 'admin' ? 'Exit' : 'Admin'}
                    </button>
                )}
                
                <button
                    onClick={onLogout}
                    className="flex-1 px-3 py-2 text-xs rounded border border-blue-800 text-blue-400 hover:bg-red-900/50 hover:text-red-200 hover:border-red-800 transition-colors flex items-center justify-center gap-2"
                    title="Sign Out"
                >
                    <LogOut size={14} /> Sign Out
                </button>
            </div>
        </div>

        {/* Contact Info */}
        <div className="px-4 py-3 bg-[#0f172a] text-[10px] text-blue-400 border-t border-blue-900 space-y-1.5">
            <a href="https://www.mciskills.com/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
                <Globe size={10} /> www.mciskills.com
            </a>
            <a href="mailto:sales@mciskills.com" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
                <Mail size={10} /> sales@mciskills.com
            </a>
            <a href="https://wa.me/919977220325" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
                <Phone size={10} /> +91 9977220325
            </a>
        </div>
      </div>
    </div>
    </>
  );
};
