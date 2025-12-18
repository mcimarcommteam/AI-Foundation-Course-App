
import React, { useState, useMemo, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ModuleView } from './components/ModuleView';
import { AITutor } from './components/AITutor';
import { RegistrationForm } from './components/RegistrationForm';
import { AdminDashboard } from './components/AdminDashboard';
import { Certificate } from './components/Certificate';
import { COURSE_CONTENT } from './constants';
import { PartyPopper, ShieldAlert, Menu, LogOut } from 'lucide-react';
import { dbService } from './services/db';
import { MCILogo } from './components/MCILogo';

const ADMIN_EMAIL = 'mcimarcommteam@gmail.com';

const App: React.FC = () => {
  // App State
  const [currentModuleId, setCurrentModuleId] = useState<string>(COURSE_CONTENT[0].id);
  const [activeTab, setActiveTab] = useState<'course' | 'tutor' | 'admin'>('course');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Progress State
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());
  const [completedSimulations, setCompletedSimulations] = useState<Set<string>>(new Set());
  const [moduleScores, setModuleScores] = useState<Record<string, number>>({});
  const [certificateDownloaded, setCertificateDownloaded] = useState(false);
  const [adminFeedback, setAdminFeedback] = useState<string>('');
  
  // User/Auth State
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [studentProfile, setStudentProfile] = useState<any>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // --- 1. INITIALIZATION & AUTH ---
  useEffect(() => {
    const activeUserEmail = localStorage.getItem('ai_course_active_user');
    if (activeUserEmail) {
        loadUserData(activeUserEmail);
    } else {
        setIsCheckingAuth(false);
    }
  }, []);

  // --- 2. DATA LOADING LOGIC ---
  const loadUserData = async (email: string) => {
      if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
          setUserEmail(email);
          setStudentProfile({
              fullName: 'MCI Administrator',
              email: email,
              grade: 'Admin',
              schoolName: 'Management Career Institute'
          });
          setCompletedModules(new Set());
          setCompletedSimulations(new Set());
          setModuleScores({});
          setActiveTab('admin');
          setIsCheckingAuth(false);
          return;
      }

      const userData = await dbService.getUser(email);
      if (userData) {
          setUserEmail(email);
          setStudentProfile(userData.profile);
          const loadedModules = new Set<string>(userData.progress?.completedModules || []);
          const loadedSims = new Set<string>(userData.progress?.completedSimulations || []);
          setCompletedModules(loadedModules);
          setCompletedSimulations(loadedSims);
          setModuleScores(userData.progress?.moduleScores || {});
          setCertificateDownloaded(userData.progress?.certificateDownloaded || false);
          setAdminFeedback(userData.progress?.adminFeedback || '');

          const firstIncomplete = COURSE_CONTENT.find(m => !loadedModules.has(m.id));
          if (firstIncomplete) {
              setCurrentModuleId(firstIncomplete.id);
          } else {
              setCurrentModuleId(COURSE_CONTENT[COURSE_CONTENT.length - 1].id);
          }
      } else {
          localStorage.removeItem('ai_course_active_user');
          setUserEmail(null);
      }
      setIsCheckingAuth(false);
  };

  // --- 3. DATA SAVING LOGIC ---
  useEffect(() => {
      if (!userEmail || userEmail.toLowerCase() === ADMIN_EMAIL.toLowerCase()) return; 
      const progressData = {
          completedModules: Array.from(completedModules),
          completedSimulations: Array.from(completedSimulations),
          moduleScores: moduleScores,
          certificateDownloaded: certificateDownloaded,
          adminFeedback: adminFeedback 
      };
      dbService.updateProgress(userEmail, progressData);
  }, [completedModules, completedSimulations, moduleScores, certificateDownloaded, adminFeedback, userEmail]);

  const handleRegistrationComplete = (email: string) => {
    loadUserData(email);
  };

  /**
   * FIX: Robust State-Based Logout
   * This clears all sensitive data and resets the React state tree 
   * to bring the user back to the Landing Page (RegistrationForm) immediately.
   */
  const handleLogout = () => {
    // Clear Session
    localStorage.removeItem('ai_course_active_user');
    
    // Reset App State (Soft Reset)
    setUserEmail(null);
    setStudentProfile(null);
    setIsMobileMenuOpen(false);
    
    // Clean up course-specific states to ensure next login is fresh
    setCompletedModules(new Set());
    setCompletedSimulations(new Set());
    setModuleScores({});
    setCertificateDownloaded(false);
    setAdminFeedback('');
    setActiveTab('course');
    setCurrentModuleId(COURSE_CONTENT[0].id);

    // Scroll to top
    window.scrollTo(0, 0);
  };

  const currentModule = COURSE_CONTENT.find(m => m.id === currentModuleId) || COURSE_CONTENT[0];
  const currentModuleIndex = COURSE_CONTENT.findIndex(m => m.id === currentModuleId);
  const hasNextModule = currentModuleIndex < COURSE_CONTENT.length - 1;
  const hasPrevModule = currentModuleIndex > 0;

  const handleNextModule = () => {
      if (hasNextModule) {
          setCurrentModuleId(COURSE_CONTENT[currentModuleIndex + 1].id);
          window.scrollTo(0, 0);
      }
  };

  const handlePrevModule = () => {
      if (hasPrevModule) {
          setCurrentModuleId(COURSE_CONTENT[currentModuleIndex - 1].id);
          window.scrollTo(0, 0);
      }
  };

  const handleModuleComplete = (score: number) => {
      setCompletedModules(prev => {
          const next = new Set(prev);
          next.add(currentModuleId);
          return next;
      });
      setModuleScores(prev => ({ ...prev, [currentModuleId]: score }));
  };

  const toggleModuleCompletion = () => {
       setCompletedModules(prev => {
          const next = new Set(prev);
          if (next.has(currentModuleId)) next.delete(currentModuleId);
          else next.add(currentModuleId);
          return next;
      });
  }

  const handleSimulationComplete = (simulationId: string) => {
    setCompletedSimulations(prev => {
      const next = new Set(prev);
      next.add(simulationId);
      return next;
    });
  };

  const handleCertificateDownload = () => setCertificateDownloaded(true);

  const progressPercentage = useMemo(() => {
    if (COURSE_CONTENT.length === 0) return 0;
    return Math.round((completedModules.size / COURSE_CONTENT.length) * 100);
  }, [completedModules]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  if (isCheckingAuth) {
      return (
        <div className="h-screen bg-[#1e3a8a] flex flex-col items-center justify-center text-white gap-4">
          <MCILogo className="h-20 w-auto mb-4 animate-pulse" variant="light" />
          <div className="flex items-center gap-2 font-bold tracking-widest text-xs uppercase opacity-75">
            <LogOut size={16} className="animate-spin" /> Initializing MCI AI Engine...
          </div>
        </div>
      );
  }

  if (!userEmail) {
      return <RegistrationForm onRegistrationComplete={handleRegistrationComplete} />;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-50 overflow-hidden">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-[#1e3a8a] text-white p-4 flex items-center justify-between shrink-0 shadow-md z-30 relative">
         <MCILogo className="h-8 w-auto" variant="light" />
         <div className="flex items-center gap-2">
             <button 
                onClick={handleLogout} 
                className="p-2 hover:bg-red-500/20 rounded-lg text-red-200 transition-colors" 
                title="Sign Out to Landing Page"
              >
                 <LogOut size={20} />
             </button>
             <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 hover:bg-white/10 rounded-lg">
                 <Menu size={24} />
             </button>
         </div>
      </div>

      <Sidebar 
        currentModuleId={currentModuleId} 
        onSelectModule={(id) => { setCurrentModuleId(id); closeMobileMenu(); }} 
        activeTab={activeTab}
        onSelectTab={(tab) => { setActiveTab(tab); closeMobileMenu(); }}
        completedModules={completedModules}
        completedSimulations={completedSimulations}
        progressPercentage={progressPercentage}
        userEmail={userEmail}
        onLogout={handleLogout}
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
      />
      
      <main className="md:ml-64 flex-1 h-full overflow-y-auto w-full relative" id="main-scroll-container">
        {progressPercentage === 100 && activeTab === 'course' && (
             <div className="sticky top-0 z-20 bg-[#1e3a8a] text-white px-4 md:px-8 py-3 shadow-md flex justify-between items-center animate-in slide-in-from-top border-b border-blue-900">
                <div className="flex items-center gap-2 font-bold text-amber-400 text-sm md:text-base">
                   <PartyPopper size={20} />
                   <span>Course Completed!</span>
                </div>
                <button 
                   onClick={() => document.getElementById('certificate-section')?.scrollIntoView({ behavior: 'smooth' })} 
                   className="bg-amber-400 text-[#1e3a8a] px-4 py-1.5 rounded-full text-xs md:text-sm font-bold hover:bg-amber-300 transition-colors shadow-sm"
                >
                   Get Certificate
                </button>
             </div>
        )}

        <div className="p-4 md:p-8">
            {progressPercentage === 100 && activeTab === 'course' && (
              <div id="certificate-section" className="mb-12 bg-gradient-to-r from-[#1e3a8a] to-blue-900 rounded-2xl p-6 md:p-8 text-white shadow-xl border border-blue-800 relative overflow-hidden animate-in fade-in slide-in-from-top-4">
                 <div className="absolute top-0 right-0 -mt-10 -mr-10 bg-amber-400 w-40 h-40 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                 <div className="relative z-10 text-center">
                    <div className="inline-block p-3 bg-white/10 rounded-full mb-4">
                      <PartyPopper size={48} className="text-amber-400" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">Congratulations, {studentProfile?.fullName || 'Student'}!</h2>
                    <p className="text-blue-200 text-base md:text-lg mb-8 max-w-2xl mx-auto">
                      You have successfully completed the AI Foundations Course.
                    </p>
                    
                    {adminFeedback && (
                         <div className="mb-6 bg-white/10 p-4 rounded-xl text-left border-l-4 border-amber-400">
                             <h4 className="font-bold text-amber-300 text-sm uppercase mb-1">Instructor Feedback</h4>
                             <p className="text-white italic">"{adminFeedback}"</p>
                         </div>
                    )}

                    <div className="bg-white/5 rounded-xl p-4 md:p-8 backdrop-blur-sm border border-white/10 max-w-3xl mx-auto overflow-x-auto">
                        <Certificate 
                            studentName={studentProfile?.fullName || 'Student'}
                            courseName="AI Fundamental Course"
                            completionDate={new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            score={progressPercentage}
                            onDownload={handleCertificateDownload}
                        />
                    </div>
                 </div>
              </div>
            )}

            {activeTab === 'course' && (
                <ModuleView 
                  module={currentModule} 
                  isCompleted={completedModules.has(currentModule.id)}
                  onModuleComplete={handleModuleComplete}
                  onToggleCompletion={toggleModuleCompletion}
                  onNext={handleNextModule}
                  onPrev={handlePrevModule}
                  hasNext={hasNextModule}
                  hasPrev={hasPrevModule}
                  completedSimulations={completedSimulations}
                  onSimulationComplete={handleSimulationComplete}
                />
            )}
            
            {activeTab === 'tutor' && (
                <AITutor currentModuleTitle={currentModule.title} />
            )}

            {activeTab === 'admin' && (
                userEmail?.toLowerCase() === ADMIN_EMAIL.toLowerCase() ? (
                  <AdminDashboard />
                ) : (
                  <div className="flex flex-col items-center justify-center h-[500px] text-center p-8 bg-white rounded-2xl shadow-sm border border-slate-200">
                    <div className="bg-red-50 p-6 rounded-full mb-6 animate-in zoom-in">
                        <ShieldAlert size={64} className="text-red-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-[#1e3a8a] mb-4">Access Restricted</h2>
                    <button onClick={() => setActiveTab('course')} className="mt-8 px-6 py-2 bg-[#1e3a8a] text-white rounded-lg font-bold">
                        Return to Course
                    </button>
                  </div>
                )
            )}
        </div>
      </main>
    </div>
  );
};

export default App;
