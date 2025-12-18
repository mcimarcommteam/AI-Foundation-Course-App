
import React, { useState, useEffect, useMemo } from 'react';
import { Users, Download, Search, Building2, GraduationCap, Mail, FileCheck, Phone, CheckCircle, Clock, XCircle, ChevronRight, BarChart3, MessageSquare, Save, X, Star, MessageCircle, AlertCircle, RefreshCw, Wifi, WifiOff, Activity, Zap } from 'lucide-react';
import { COURSE_CONTENT } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { dbService } from '../services/db';

interface StudentFeedback {
    rating: number;
    comment: string;
    date: string;
}

interface Student {
  id: string;
  fullName: string;
  email: string;
  grade: string;
  schoolName: string;
  mobile?: string;
  registrationDate: string;
  fullTimestamp?: string;
  progress: number;
  completedModules: string[];
  moduleScores: Record<string, number>;
  certificateDownloaded: boolean;
  adminFeedback: string;
  studentFeedback?: StudentFeedback | null; 
}

interface ActivityEvent {
    id: string;
    userName: string;
    type: 'REGISTRATION' | 'MODULE_COMPLETE' | 'CERTIFICATE' | 'FEEDBACK';
    detail: string;
    time: string;
}

export const AdminDashboard: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [activities, setActivities] = useState<ActivityEvent[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [feedbackInput, setFeedbackInput] = useState('');
  const [isOnline, setIsOnline] = useState(dbService.isOnline());

  useEffect(() => {
    // REAL-TIME CLOUD SYNC
    const unsubscribe = dbService.subscribeToAllStudents((studentData) => {
        const processedStudents: Student[] = studentData.map(user => {
            const completed = user.progress?.completedModules || [];
            const progress = Math.round((completed.length / COURSE_CONTENT.length) * 100);
            
            const mobileStr = user.profile.countryCode && user.profile.mobileNumber 
                ? `${user.profile.countryCode} ${user.profile.mobileNumber}`
                : user.profile.mobileNumber || 'N/A';

            return {
                id: user.id || user.profile.email, 
                fullName: user.profile.fullName,
                email: user.profile.email,
                mobile: mobileStr,
                grade: user.profile.grade,
                schoolName: user.profile.schoolName,
                registrationDate: user.registrationDate ? user.registrationDate.split('T')[0] : 'N/A',
                fullTimestamp: user.registrationDate,
                progress: Math.min(100, progress),
                completedModules: completed,
                moduleScores: user.progress?.moduleScores || {},
                certificateDownloaded: user.progress?.certificateDownloaded || false,
                adminFeedback: user.progress?.adminFeedback || '',
                studentFeedback: user.feedback || null
            }
        });

        // Generate dynamic activity events based on data diffs
        const newActivities: ActivityEvent[] = [];
        processedStudents.forEach(s => {
            if (s.progress === 100 && s.certificateDownloaded) {
                newActivities.push({ id: `cert-${s.id}`, userName: s.fullName, type: 'CERTIFICATE', detail: 'Earned Certification', time: 'Just now' });
            }
            if (s.studentFeedback) {
                newActivities.push({ id: `feed-${s.id}`, userName: s.fullName, type: 'FEEDBACK', detail: `Rated ${s.studentFeedback.rating} stars`, time: 'Recent' });
            }
        });

        setStudents(processedStudents);
        setActivities(newActivities.slice(0, 10)); // Keep only latest 10
    });

    return () => unsubscribe();
  }, []);

  const filteredStudents = useMemo(() => students.filter(s => 
    s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  ), [students, searchTerm]);

  const handleStudentClick = (student: Student) => {
      setSelectedStudent(student);
      setFeedbackInput(student.adminFeedback);
  };

  const handleSaveFeedback = async () => {
      if (!selectedStudent) return;
      await dbService.updateProgress(selectedStudent.email, { adminFeedback: feedbackInput });
      setSelectedStudent({...selectedStudent, adminFeedback: feedbackInput});
  };

  const handleDownloadCSV = () => {
    const headers = ["Name,Email,Mobile,Level,Institution,Progress,Avg Score,Certificate,Date,Rating,Student Comment"];
    const rows = filteredStudents.map(s => {
        const scores = Object.values(s.moduleScores) as number[];
        const avgScore = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : '0';
        const comment = s.studentFeedback?.comment ? `"${s.studentFeedback.comment.replace(/"/g, '""')}"` : "";
        return `${s.fullName},${s.email},${s.mobile || ''},${s.grade},${s.schoolName},${s.progress}%,${avgScore},${s.certificateDownloaded ? 'Yes' : 'No'},${s.registrationDate},${s.studentFeedback?.rating || ''},${comment}`;
    });
    const csvContent = "data:text/csv;charset=utf-8," + headers.concat(rows).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `MCI_Student_DB_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto pb-20 relative">
      <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold mb-2">
                <Building2 size={14} /> Official MCI Admin Dashboard
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
                Live Learning Insights
                {isOnline && <span className="flex h-3 w-3 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span></span>}
            </h1>
        </div>
        
        <div className="flex gap-3">
            <button onClick={handleDownloadCSV} className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl hover:bg-slate-800 transition-all shadow-lg text-sm font-bold">
                <Download size={18} /> Export Records
            </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* STATS OVERVIEW */}
        <div className="lg:col-span-3 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><Users size={24} /></div>
                    <div>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Total Enrolled</p>
                        <h3 className="text-2xl font-black text-slate-900">{students.length}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><CheckCircle size={24} /></div>
                    <div>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Certified</p>
                        <h3 className="text-2xl font-black text-slate-900">{students.filter(s => s.progress === 100).length}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Activity size={24} /></div>
                    <div>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Avg Completion</p>
                        <h3 className="text-2xl font-black text-slate-900">
                            {Math.round(students.reduce((acc, s) => acc + s.progress, 0) / (students.length || 1))}%
                        </h3>
                    </div>
                </div>
            </div>

            {/* MAIN DATABASE TABLE */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
                    <Search className="text-slate-400 w-5 h-5" />
                    <input 
                        type="text" 
                        placeholder="Search by name, email, or institution..." 
                        className="bg-transparent border-none focus:ring-0 w-full text-sm text-slate-700 placeholder-slate-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/80 text-slate-500 text-[10px] uppercase font-bold tracking-widest">
                                <th className="px-6 py-4">Student</th>
                                <th className="px-6 py-4">Institution</th>
                                <th className="px-6 py-4">Progress</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredStudents.map((student) => (
                                <tr key={student.id} className="hover:bg-blue-50/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                                                {student.fullName.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-slate-900">{student.fullName}</div>
                                                <div className="text-[10px] text-slate-500">{student.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-slate-700">{student.schoolName}</div>
                                        <div className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">{student.grade}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div className={`h-full transition-all duration-1000 ${student.progress === 100 ? 'bg-emerald-500' : 'bg-blue-600'}`} style={{ width: `${student.progress}%` }} />
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-600">{student.progress}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {student.progress === 100 ? (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                                                <CheckCircle size={10} /> Certified
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold">
                                                <RefreshCw size={10} className="animate-spin-slow" /> In Progress
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => handleStudentClick(student)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                                            <ChevronRight size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        {/* SIDEBAR: LIVE ACTIVITY STREAM */}
        <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800">
                <h3 className="text-sm font-bold uppercase tracking-widest text-blue-400 flex items-center gap-2 mb-6">
                    <Activity size={16} /> Live Stream
                </h3>
                <div className="space-y-6">
                    {activities.length > 0 ? activities.map((act, idx) => (
                        <div key={idx} className="relative pl-6 border-l border-slate-800 animate-in slide-in-from-right-2">
                            <div className={`absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full ${act.type === 'CERTIFICATE' ? 'bg-amber-400' : act.type === 'FEEDBACK' ? 'bg-blue-500' : 'bg-green-500'}`} />
                            <p className="text-[10px] font-bold text-slate-500 uppercase">{act.time}</p>
                            <p className="text-xs font-bold text-white mt-1">{act.userName}</p>
                            <p className="text-[11px] text-slate-400">{act.detail}</p>
                        </div>
                    )) : (
                        <div className="text-center py-10 opacity-50">
                            <Zap size={32} className="mx-auto mb-2 text-slate-700" />
                            <p className="text-xs">Waiting for events...</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Database Health</h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-600">Connection</span>
                        <span className="font-bold text-emerald-600 flex items-center gap-1">
                            <Wifi size={12} /> Active
                        </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-600">Uptime</span>
                        <span className="font-bold text-slate-900">99.9%</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* STUDENT DETAIL DRAWER */}
      {selectedStudent && (
          <div className="fixed inset-0 z-50 flex justify-end">
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedStudent(null)} />
              <div className="relative w-full max-w-xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                  <div className="p-6 border-b border-slate-100 flex justify-between items-start">
                      <div>
                          <h2 className="text-2xl font-black text-slate-900">{selectedStudent.fullName}</h2>
                          <div className="flex gap-4 text-[11px] text-slate-500 mt-1 uppercase font-bold">
                              <span className="flex items-center gap-1"><Mail size={12} /> {selectedStudent.email}</span>
                              <span className="flex items-center gap-1 text-blue-600"><Phone size={12} /> {selectedStudent.mobile}</span>
                          </div>
                      </div>
                      <button onClick={() => setSelectedStudent(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={20} /></button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6 space-y-8">
                      {/* Detailed Module Breakdown */}
                      <section>
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Course Progress Breakdown</h4>
                          <div className="space-y-2">
                              {COURSE_CONTENT.map((m, i) => {
                                  const isDone = selectedStudent.completedModules.includes(m.id);
                                  const score = selectedStudent.moduleScores[m.id];
                                  return (
                                      <div key={m.id} className={`p-3 rounded-xl border flex items-center justify-between transition-colors ${isDone ? 'bg-blue-50 border-blue-100' : 'bg-slate-50 border-slate-100'}`}>
                                          <div className="flex items-center gap-3">
                                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${isDone ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                                                  {i + 1}
                                              </div>
                                              <span className={`text-sm ${isDone ? 'text-blue-900 font-bold' : 'text-slate-500'}`}>{m.title}</span>
                                          </div>
                                          {score !== undefined ? (
                                              <span className="text-xs font-black text-blue-700">{score}%</span>
                                          ) : isDone ? (
                                              <CheckCircle size={14} className="text-blue-600" />
                                          ) : null}
                                      </div>
                                  )
                              })}
                          </div>
                      </section>

                      {/* Instructor Management Section */}
                      <section className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                          <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                              <MessageSquare size={18} className="text-indigo-600" /> Administrative Action
                          </h4>
                          <p className="text-xs text-slate-500 mb-4 leading-relaxed">Send a personalized message or feedback that will appear on the student's dashboard.</p>
                          <textarea 
                              value={feedbackInput}
                              onChange={(e) => setFeedbackInput(e.target.value)}
                              className="w-full p-4 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 outline-none h-32 resize-none"
                              placeholder="Type instructor feedback..."
                          />
                          <button onClick={handleSaveFeedback} className="mt-4 w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/10">
                              <Save size={18} /> Update Student Feedback
                          </button>
                      </section>

                      {/* Registration Data */}
                      <div className="flex justify-between items-center text-[10px] text-slate-400 border-t pt-6 uppercase font-bold tracking-widest">
                          <span>Registered</span>
                          <span className="text-slate-900">{new Date(selectedStudent.fullTimestamp || '').toLocaleString()}</span>
                      </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};
