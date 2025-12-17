
import React, { useState, useMemo, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ModuleView } from './components/ModuleView';
import { AITutor } from './components/AITutor';
import { RegistrationForm } from './components/RegistrationForm';
import { AdminDashboard } from './components/AdminDashboard';
import { Certificate } from './components/Certificate';
import { COURSE_CONTENT } from './constants';
import { PartyPopper, ShieldAlert, Menu } from 'lucide-react';
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
    // Check if there is an active session in local storage (This remains local for session management)
    const activeUserEmail = localStorage.getItem('ai_course_active_user');
    
    if (activeUserEmail) {
        loadUserData(activeUserEmail);
    } else {
        // No active user found
        setIsCheckingAuth(false);
    }
  }, []);

  // --- 2. DATA LOADING LOGIC ---
  const loadUserData = async (email: string) => {
      // Admins do not have a record in DB generally, manual hydration
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
          
          // Auto-redirect to Admin Dashboard
          setActiveTab('admin');
          setIsCheckingAuth(false);
          return;
      }

      // Use DB Service to fetch user
      const userData = await dbService.getUser(email);

      if (userData) {
          // Hydrate State
          setUserEmail(email);
          setStudentProfile(userData.profile);
          
          const loadedModules = new Set<string>(userData.progress?.completedModules || []);
          const loadedSims = new Set<string>(userData.progress?.completedSimulations || []);
          const loadedScores = userData.progress?.moduleScores || {};
          const loadedCertStatus = userData.progress?.certificateDownloaded || false;
          const loadedFeedback = userData.progress?.adminFeedback || '';
          
          setCompletedModules(loadedModules);
          setCompletedSimulations(loadedSims);
          setModuleScores(loadedScores);
          setCertificateDownloaded(loadedCertStatus);
          setAdminFeedback(loadedFeedback);

          // Smart Navigation: Find first incomplete module
          const firstIncomplete = COURSE_CONTENT.find(m => !loadedModules.has(m.id));
          if (firstIncomplete) {
              setCurrentModuleId(firstIncomplete.id);
          } else {
              // If all done, go to last
              setCurrentModuleId(COURSE_CONTENT[COURSE_CONTENT.length - 1].id);
          }
      } else {
          // Session exists locally but not in DB (e.g. data wipe or new device with old cookies)
          localStorage.removeItem('ai_course_active_user');
          setUserEmail(null);
      }
      setIsCheckingAuth(false);
  };

  // --- 3. DATA SAVING LOGIC ---
  // Whenever progress changes, update the DB (Online or Offline)
  useEffect(() => {
      if (!userEmail) return;
      if (userEmail.toLowerCase() === ADMIN_EMAIL.toLowerCase()) return; 

      // Debounce slightly to prevent too many writes? No, for now direct write is safer for data integrity.
      const progressData = {
          completedModules: Array.from(completedModules),
          completedSimulations: Array.from(completedSimulations),
          moduleScores: moduleScores,
          certificateDownloaded: certificateDownloaded,
          adminFeedback: adminFeedback 
      };
      
      dbService.updateProgress(userEmail, progressData);

  }, [completedModules, completedSimulations, moduleScores, certificateDownloaded, adminFeedback, userEmail]);

  // --- 4. EVENT HANDLERS ---

  const handleRegistrationComplete = (email: string) => {
    loadUserData(email);
  };

  const handleLogout = () => {
    localStorage.removeItem('ai_course_active_user');
    setUserEmail(null);
    setStudentProfile(null);
    setCompletedModules(new Set());
    setCompletedSimulations(new Set());
    setModuleScores({});
    setCertificateDownloaded(false);
    setActiveTab('course');
    window.location.reload();
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
      // Mark as complete and save score
      setCompletedModules(prev => {
          const next = new Set(prev);
          next.add(currentModuleId);
          return next;
      });
      setModuleScores(prev => ({
          ...prev,
          [currentModuleId]: score
      }));
  };

  const toggleModuleCompletion = () => {
      // Manual override for dev/testing
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

  const handleCertificateDownload = () => {
      setCertificateDownloaded(true);
  }

  const progressPercentage = useMemo(() => {
    if (COURSE_CONTENT.length === 0) return 0;
    return Math.round((completedModules.size / COURSE_CONTENT.length) * 100);
  }, [completedModules]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // --- 5. RENDER ---

  if (isCheckingAuth) {
      return <div className="h-screen bg-slate-50 flex items-center justify-center text-[#1e3a8a]">Loading your progress...</div>;
  }

  // Gate the content behind registration
  if (!userEmail) {
      return <RegistrationForm onRegistrationComplete={handleRegistrationComplete} />;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-50 overflow-hidden">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-[#1e3a8a] text-white p-4 flex items-center justify-between shrink-0 shadow-md z-30 relative">
         <MCILogo className="h-8 w-auto" />
         <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 hover:bg-white/10 rounded-lg">
             <Menu size={24} />
         </button>
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
      
      {/* Main Content Area */}
      {/* Adjusted margin: md:ml-64 on desktop, no margin on mobile */}
      <main className="md:ml-64 flex-1 h-full overflow-y-auto w-full relative" id="main-scroll-container">
        
        {/* Sticky Header for Certificate Access */}
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
            {/* Completion Banner */}
            {progressPercentage === 100 && activeTab === 'course' && (
              <div id="certificate-section" className="mb-12 bg-gradient-to-r from-[#1e3a8a] to-blue-900 rounded-2xl p-6 md:p-8 text-white shadow-xl border border-blue-800 relative overflow-hidden animate-in fade-in slide-in-from-top-4">
                 <div className="absolute top-0 right-0 -mt-10 -mr-10 bg-amber-400 w-40 h-40 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                 <div className="relative z-10 text-center">
                    <div className="inline-block p-3 bg-white/10 rounded-full mb-4">
                      <PartyPopper size={48} className="text-amber-400" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">Congratulations, {studentProfile?.fullName || 'Student'}!</h2>
                    <p className="text-blue-200 text-base md:text-lg mb-8 max-w-2xl mx-auto">
                      You have successfully completed the AI Foundations Course. You've mastered everything from Machine Learning to Ethics. We are proud of you!
                    </p>
                    
                    {adminFeedback && (
                         <div className="mb-6 bg-white/10 p-4 rounded-xl text-left border-l-4 border-amber-400">
                             <h4 className="font-bold text-amber-300 text-sm uppercase mb-1">Instructor Feedback</h4>
                             <p className="text-white italic">"{adminFeedback}"</p>
                         </div>
                    )}

                    <div className="bg-white/5 rounded-xl p-4 md:p-8 backdrop-blur-sm border border-white/10 max-w-3xl mx-auto overflow-x-auto">
                        <h3 className="text-xl font-semibold mb-6 text-amber-300">Your Official Certificate</h3>
                        <div className="min-w-[600px]">
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
                    <p className="text-slate-600 max-w-md text-lg leading-relaxed">
                        This dashboard is strictly reserved for MCI Administrators.<br/>
                        Your account <span className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded text-slate-800">{userEmail}</span> does not have the required permissions.
                    </p>
                    <button 
                        onClick={() => setActiveTab('course')}
                        className="mt-8 px-6 py-2 bg-[#1e3a8a] text-white rounded-lg font-bold hover:bg-blue-800 transition-colors shadow-lg"
                    >
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
