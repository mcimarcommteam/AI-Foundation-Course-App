
import React, { useState } from 'react';
import { 
  School, User, Mail, Loader2, ShieldCheck, 
  Sparkles, Brain, Zap, Globe, Phone, 
  Award, ArrowRight, Video, Rocket, Star, CheckCircle2,
  TrendingUp, Users, Target
} from 'lucide-react';
import { MCILogo } from './MCILogo';
import { dbService } from '../services/db';
import { LiveStudentTracker } from './LiveStudentTracker';

interface RegistrationFormProps {
  onRegistrationComplete: (email: string) => void;
}

const ADMIN_EMAIL = 'mcimarcommteam@gmail.com';

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ onRegistrationComplete }) => {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    grade: '',
    schoolName: '',
    countryCode: '+91',
    mobileNumber: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAdminMode, setIsAdminMode] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const emailKey = formData.email.trim().toLowerCase();

    // SECURITY CHECK: Strictly disallow Admin Email in Student Login/Registration flows
    if (!isAdminMode && emailKey === ADMIN_EMAIL.toLowerCase()) {
        setError('This email is reserved for Administrators only. Please switch to Admin Access if you are the owner.');
        setIsLoading(false);
        return;
    }

    // 1. Handle Admin
    if (isAdminMode) {
        if (emailKey !== ADMIN_EMAIL.toLowerCase()) {
            setError('Access Denied: You are not authorized to access the Admin Portal.');
            setIsLoading(false);
            return;
        }
        localStorage.setItem('ai_course_active_user', emailKey); // Admins session is local
        await new Promise(resolve => setTimeout(resolve, 800));
        onRegistrationComplete(emailKey);
        return;
    }

    // 2. Simulate Network Delay for UX
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 3. Database Logic using Service (Supports Cloud & Local)
    try {
        const existingUser = await dbService.getUser(emailKey);

        if (isLoginMode) {
            if (existingUser) {
                localStorage.setItem('ai_course_active_user', emailKey);
                onRegistrationComplete(emailKey);
            } else {
                setError('Account not found. Please register first.');
            }
        } else {
            if (existingUser) {
                setError('Account already exists. Please switch to Login.');
            } else {
                const newUser = {
                    profile: { ...formData, email: emailKey },
                    progress: { completedModules: [], completedSimulations: [], moduleScores: {}, certificateDownloaded: false, adminFeedback: '' },
                    registrationDate: new Date().toISOString()
                };
                
                await dbService.saveUser(emailKey, newUser);
                
                localStorage.setItem('ai_course_active_user', emailKey);
                onRegistrationComplete(emailKey);
            }
        }
    } catch (err) {
        console.error(err);
        setError("Connection error. Please try again.");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0B1120] font-sans text-slate-300 selection:bg-indigo-500 selection:text-white flex flex-col items-center relative overflow-x-hidden">
      
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-indigo-900/20 to-transparent pointer-events-none" />
      <div className="absolute -top-[10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Navbar / Logo Area */}
      <nav className="w-full max-w-7xl px-6 py-8 flex justify-between items-center z-10">
         <div className="bg-white/5 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 shadow-lg">
             <MCILogo className="h-10 w-auto" />
         </div>
         <div className="hidden md:flex items-center gap-6 text-sm font-medium">
             <div className="flex items-center gap-2 text-yellow-400">
                 <Star size={16} fill="currentColor" />
                 <span>4.9/5 Average Rating</span>
             </div>
             <div className="flex items-center gap-2 text-green-400">
                 <Users size={16} />
                 <span>15,000+ Students Enrolled</span>
             </div>
         </div>
      </nav>

      {/* Main Content Container */}
      <div className="relative w-full max-w-6xl px-4 pb-20 flex flex-col lg:flex-row items-start justify-center gap-12 lg:gap-20 mt-4 lg:mt-10">
        
        {/* LEFT SIDE: The Pitch */}
        <div className="lg:w-1/2 flex flex-col justify-center animate-in slide-in-from-left-4 duration-700">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold mb-6 w-fit">
                <Sparkles size={14} className="text-yellow-400" />
                <span>UPDATED FOR 2025: GEMINI 2.5 & VEO</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
                Don't just watch the AI revolution. <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-400">Lead it.</span>
            </h1>

            {/* Subhead */}
            <p className="text-lg text-slate-400 mb-8 leading-relaxed max-w-xl">
                The job market is shifting. 
                Join the <span className="text-white font-semibold">top 1% of professionals</span> mastering Generative AI. 
                Build real-world apps, generate cinematic video, and earn your official certification in just 10 weeks.
            </p>

            {/* Benefit Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400"><Rocket size={20} /></div>
                    <div>
                        <h3 className="text-white font-bold text-sm">Job-Ready Skills</h3>
                        <p className="text-xs text-slate-500">Practical labs, no theory fluff.</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400"><Video size={20} /></div>
                    <div>
                        <h3 className="text-white font-bold text-sm">Veo Video Studio</h3>
                        <p className="text-xs text-slate-500">Create films with text prompts.</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-pink-500/20 rounded-lg text-pink-400"><Brain size={20} /></div>
                    <div>
                        <h3 className="text-white font-bold text-sm">Thinking Models</h3>
                        <p className="text-xs text-slate-500">Master deep reasoning AI.</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400"><Award size={20} /></div>
                    <div>
                        <h3 className="text-white font-bold text-sm">Official Certificate</h3>
                        <p className="text-xs text-slate-500">Verified for LinkedIn.</p>
                    </div>
                </div>
            </div>

            {/* Social Proof Line */}
            <div className="flex items-center gap-4 py-4 border-t border-white/5">
                 <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0B1120] bg-slate-700 flex items-center justify-center text-xs font-bold text-white overflow-hidden">
                             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i*135}`} alt="Avatar" />
                        </div>
                    ))}
                    <div className="w-10 h-10 rounded-full border-2 border-[#0B1120] bg-indigo-600 flex items-center justify-center text-xs font-bold text-white">
                        +15k
                    </div>
                 </div>
                 <p className="text-sm text-slate-400">
                    Trusted by learners from <span className="text-white font-semibold">Google, Deloitte, & MIT</span>.
                 </p>
            </div>
        </div>

        {/* RIGHT SIDE: The Form */}
        <div className="lg:w-1/2 w-full max-w-md relative z-20">
            {/* Glowing Border Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl opacity-75 blur opacity-20 animate-pulse"></div>
            
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="px-8 pt-8 pb-6">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-slate-900">
                            {isAdminMode ? 'Admin Portal' : isLoginMode ? 'Welcome Back' : 'Secure Your Spot'}
                        </h2>
                        <p className="text-slate-500 text-sm mt-1">
                            {isAdminMode ? 'Authorized access only' : isLoginMode ? 'Login to continue your progress' : 'Free access. No credit card required.'}
                        </p>
                    </div>

                    <form onSubmit={handleAuth} className="space-y-4">
                        {/* Toggle Switch */}
                        {!isAdminMode && (
                            <div className="bg-slate-100 p-1 rounded-xl flex mb-6">
                                <button
                                    type="button"
                                    onClick={() => { setIsLoginMode(false); setError(''); }}
                                    className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${!isLoginMode ? 'bg-white text-indigo-900 shadow-sm ring-1 ring-black/5' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    New Student
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { setIsLoginMode(true); setError(''); }}
                                    className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${isLoginMode ? 'bg-white text-indigo-900 shadow-sm ring-1 ring-black/5' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    Student Login
                                </button>
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-3.5 text-slate-400 w-5 h-5 group-focus-within:text-indigo-600 transition-colors" />
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 bg-slate-50 outline-none transition-all"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        {!isLoginMode && !isAdminMode && (
                            <div className="space-y-4 animate-in slide-in-from-bottom-2 fade-in">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Full Name</label>
                                    <div className="relative group">
                                        <User className="absolute left-3 top-3.5 text-slate-400 w-5 h-5 group-focus-within:text-indigo-600 transition-colors" />
                                        <input
                                            type="text"
                                            name="fullName"
                                            required
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 bg-slate-50 outline-none"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </div>
                                
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Mobile</label>
                                    <div className="flex gap-2">
                                        <select
                                            name="countryCode"
                                            value={formData.countryCode}
                                            onChange={handleChange}
                                            className="w-24 pl-3 py-3 border border-slate-200 rounded-xl bg-slate-50 text-sm focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <option value="+91">+91</option>
                                            <option value="+1">+1</option>
                                            <option value="+44">+44</option>
                                            <option value="+971">+971</option>
                                        </select>
                                        <div className="relative flex-1 group">
                                            <Phone className="absolute left-3 top-3.5 text-slate-400 w-5 h-5 group-focus-within:text-indigo-600 transition-colors" />
                                            <input
                                                type="tel"
                                                name="mobileNumber"
                                                required
                                                value={formData.mobileNumber}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 bg-slate-50 outline-none"
                                                placeholder="9876543210"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Level</label>
                                        <select
                                            name="grade"
                                            required
                                            value={formData.grade}
                                            onChange={handleChange}
                                            className="w-full px-3 py-3 border border-slate-200 rounded-xl bg-slate-50 text-sm focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <option value="">Select...</option>
                                            <option value="10">Grade 10</option>
                                            <option value="11">Grade 11</option>
                                            <option value="12">Grade 12</option>
                                            <option value="University">University</option>
                                            <option value="Professional">Professional</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Institution</label>
                                        <input
                                            type="text"
                                            name="schoolName"
                                            required
                                            value={formData.schoolName}
                                            onChange={handleChange}
                                            className="w-full px-3 py-3 border border-slate-200 rounded-xl bg-slate-50 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                            placeholder="School/Org"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2 border border-red-100 animate-pulse">
                                <Zap size={16} /> {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full text-white font-bold py-4 rounded-xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2 text-lg mt-4 ${
                                isAdminMode 
                                ? 'bg-gradient-to-r from-purple-700 to-indigo-800' 
                                : 'bg-gradient-to-r from-indigo-600 to-blue-600'
                            }`}
                        >
                            {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : (
                                <>
                                    {isAdminMode ? 'Enter Dashboard' : isLoginMode ? 'Continue Learning' : 'Start My Free Course'} 
                                    <ArrowRight size={20}/>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            type="button"
                            onClick={() => {
                                setIsAdminMode(!isAdminMode);
                                setError('');
                                setFormData({ fullName: '', email: '', grade: '', schoolName: '', countryCode: '+91', mobileNumber: '' });
                                setIsLoginMode(false);
                            }}
                            className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            {isAdminMode ? 'Back to Student Access' : 'Admin Access'}
                        </button>
                    </div>
                </div>

                {/* Integrated Contact Footer */}
                <div className="bg-slate-50 border-t border-slate-100 p-5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center mb-3">Contact Admissions</p>
                    <div className="flex flex-col items-center justify-center gap-3 text-xs sm:text-sm font-medium text-slate-600">
                        <a href="https://www.mciskills.com/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-indigo-600 transition-colors group w-full justify-center hover:bg-white py-1 rounded-md">
                            <Globe size={14} className="text-indigo-500" /> www.mciskills.com
                        </a>
                        <div className="flex gap-4">
                            <a href="mailto:sales@mciskills.com" className="flex items-center gap-2 hover:text-indigo-600 transition-colors group hover:bg-white py-1 px-2 rounded-md">
                                <Mail size={14} className="text-indigo-500" /> Email Support
                            </a>
                            <a href="https://wa.me/919977220325" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-indigo-600 transition-colors group hover:bg-white py-1 px-2 rounded-md">
                                <Phone size={14} className="text-indigo-500" /> +91 9977220325
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="mt-6 text-center text-slate-500 text-xs">
                 <p className="flex items-center justify-center gap-1">
                    <Target size={12} /> Goal: 100% Completion. 100% AI Literacy.
                 </p>
            </div>
        </div>
      </div>
      
      {/* Real-time Student Tracker Section */}
      <LiveStudentTracker />
      
    </div>
  );
};
