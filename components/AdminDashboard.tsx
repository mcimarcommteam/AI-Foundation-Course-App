
import React, { useState, useEffect } from 'react';
import { Users, Download, Search, Building2, GraduationCap, Mail, FileCheck, Phone, CheckCircle, Clock, XCircle, ChevronRight, BarChart3, MessageSquare, Save, X, Star, MessageCircle, AlertCircle, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { Certificate } from './Certificate';
import { COURSE_CONTENT } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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
  progress: number;
  completedModules: string[];
  moduleScores: Record<string, number>;
  certificateDownloaded: boolean;
  adminFeedback: string;
  studentFeedback?: StudentFeedback | null; 
}

export const AdminDashboard: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [feedbackInput, setFeedbackInput] = useState('');
  const [isOnline, setIsOnline] = useState(dbService.isOnline());

  useEffect(() => {
    // Subscribe to REAL-TIME updates from the Database Service
    const unsubscribe = dbService.subscribeToAllStudents((studentData) => {
        // Map DB format to UI format
        const processedStudents: Student[] = studentData.map(user => {
            const completed = user.progress?.completedModules || [];
            const progress = Math.round((completed.length / COURSE_CONTENT.length) * 100);
            
             // Construct mobile string
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
                progress: Math.min(100, progress),
                completedModules: completed,
                moduleScores: user.progress?.moduleScores || {},
                certificateDownloaded: user.progress?.certificateDownloaded || false,
                adminFeedback: user.progress?.adminFeedback || '',
                studentFeedback: user.feedback || null
            }
        });
        setStudents(processedStudents);
    });

    return () => unsubscribe();
  }, []);

  const filteredStudents = students.filter(s => 
    s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStudentClick = (student: Student) => {
      setSelectedStudent(student);
      setFeedbackInput(student.adminFeedback);
  };

  const handleSaveFeedback = async () => {
      if (!selectedStudent) return;

      // Optimistic update locally
      const updatedStudents = students.map(s => 
          s.id === selectedStudent.id ? { ...s, adminFeedback: feedbackInput } : s
      );
      setStudents(updatedStudents);
      setSelectedStudent({...selectedStudent, adminFeedback: feedbackInput});

      // Update in DB (Cloud or Local)
      await dbService.updateProgress(selectedStudent.email, { adminFeedback: feedbackInput });
  };

  const handleDownloadCSV = () => {
    const headers = ["Name,Email,Mobile,Level,Institution,Progress,Avg Score,Certificate,Date,Rating,Student Comment"];
    const rows = filteredStudents.map(s => {
        const scores = Object.values(s.moduleScores) as number[];
        const totalScore = scores.reduce((a: number, b: number) => a + b, 0);
        const avgScore = scores.length > 0 
            ? (totalScore / scores.length).toFixed(1) 
            : '0';
        const comment = s.studentFeedback?.comment ? `"${s.studentFeedback.comment.replace(/"/g, '""')}"` : "";
        return `${s.fullName},${s.email},${s.mobile || ''},${s.grade},${s.schoolName},${s.progress}%,${avgScore},${s.certificateDownloaded ? 'Yes' : 'No'},${s.registrationDate},${s.studentFeedback?.rating || ''},${comment}`;
    });
    const csvContent = "data:text/csv;charset=utf-8," + headers.concat(rows).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "student_database.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getChartData = (student: Student) => {
      return COURSE_CONTENT.map(m => ({
          name: m.weekRange,
          score: student.moduleScores[m.id] || 0
      }));
  };

  return (
    <div className="max-w-7xl mx-auto pb-20 relative">
      <header className="mb-8">
        <div className="flex justify-between items-start">
            <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-3">
                    <Building2 size={14} /> Company Admin
                </div>
                <h1 className="text-4xl font-bold text-slate-900 mb-2">Student Database</h1>
                <p className="text-slate-600">Monitor live student activity and progress globally.</p>
            </div>
            
            <div className="flex flex-col items-end gap-3">
                 <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border ${isOnline ? 'bg-green-100 text-green-700 border-green-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                    {isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}
                    {isOnline ? 'LIVE DATABASE ACTIVE' : 'OFFLINE MODE (LOCAL)'}
                 </div>
                 <button 
                    onClick={handleDownloadCSV}
                    className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors shadow-lg"
                 >
                    <Download size={18} /> Export CSV
                 </button>
            </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg"><Users size={24} /></div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Registrations</p>
              <h3 className="text-2xl font-bold text-slate-900">{students.length}</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 text-green-600 rounded-lg"><CheckCircle size={24} /></div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Certified</p>
              <h3 className="text-2xl font-bold text-slate-900">{students.filter(s => s.progress === 100).length}</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-100 text-yellow-600 rounded-lg"><Star size={24} /></div>
                <div>
                <p className="text-sm text-slate-500 font-medium">Avg Rating</p>
                <h3 className="text-2xl font-bold text-slate-900">
                    {(students.filter(s => s.studentFeedback).reduce((acc, s) => acc + (s.studentFeedback?.rating || 0), 0) / (students.filter(s => s.studentFeedback).length || 1)).toFixed(1)}/5
                </h3>
                </div>
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><GraduationCap size={24} /></div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Avg Completion</p>
              <h3 className="text-2xl font-bold text-slate-900">
                {Math.round(students.reduce((acc: number, s: Student) => acc + s.progress, 0) / (students.length || 1))}%
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center gap-4 bg-slate-50">
          <Search className="text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search by name, email, or company..." 
            className="bg-transparent border-none focus:ring-0 w-full text-slate-600 placeholder-slate-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold border-b border-slate-200">Name</th>
                <th className="p-4 font-semibold border-b border-slate-200">Institution</th>
                <th className="p-4 font-semibold border-b border-slate-200">Progress</th>
                <th className="p-4 font-semibold border-b border-slate-200">Score</th>
                <th className="p-4 font-semibold border-b border-slate-200">Rated</th>
                <th className="p-4 font-semibold border-b border-slate-200">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => {
                    const scores = Object.values(student.moduleScores) as number[];
                    const totalScore = scores.reduce((a: number, b: number) => a + b, 0);
                    const avgScore = scores.length > 0 
                    ? Math.round(totalScore / scores.length) 
                    : 0;
                    
                  return (
                    <tr key={student.id} className="hover:bg-slate-50 transition-colors group">
                        <td className="p-4">
                            <div className="font-medium text-slate-900">{student.fullName}</div>
                            <div className="text-xs text-slate-500">{student.email}</div>
                        </td>
                        <td className="p-4">
                            <span className="text-sm font-medium text-slate-800">{student.schoolName}</span>
                            <div className="text-xs text-slate-500">{student.grade}</div>
                        </td>
                        <td className="p-4">
                            <div className="flex items-center gap-2">
                                <div className="w-16 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                                    <div 
                                        className={`h-1.5 rounded-full ${student.progress === 100 ? 'bg-green-500' : 'bg-indigo-500'}`}
                                        style={{ width: `${student.progress}%` }}
                                    />
                                </div>
                                <span className="text-xs font-medium text-slate-600">{student.progress}%</span>
                            </div>
                        </td>
                        <td className="p-4">
                             <span className={`text-sm font-bold ${avgScore > 80 ? 'text-green-600' : avgScore > 50 ? 'text-yellow-600' : 'text-slate-400'}`}>
                                 {avgScore}%
                             </span>
                        </td>
                        <td className="p-4">
                             {student.studentFeedback ? (
                                 <div className="flex items-center gap-1 text-yellow-500" title="Feedback Submitted">
                                    <Star size={14} fill="currentColor" />
                                    <span className="text-sm font-bold text-slate-700">{student.studentFeedback.rating}</span>
                                 </div>
                             ) : (
                                <span className="text-slate-300 text-xs">-</span>
                             )}
                        </td>
                        <td className="p-4">
                            <button 
                                onClick={() => handleStudentClick(student)}
                                className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                View Details <ChevronRight size={16} />
                            </button>
                        </td>
                    </tr>
                )})
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    No students found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* STUDENT DETAIL SLIDE-OVER */}
      {selectedStudent && (
          <div className="fixed inset-0 z-50 flex justify-end">
              {/* Backdrop */}
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedStudent(null)} />
              
              {/* Panel */}
              <div className="relative w-full max-w-2xl bg-slate-50 h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                  <div className="bg-white p-6 border-b border-slate-200 flex justify-between items-start">
                      <div>
                          <h2 className="text-2xl font-bold text-slate-900">{selectedStudent.fullName}</h2>
                          <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                              <span className="flex items-center gap-1"><Mail size={14} /> {selectedStudent.email}</span>
                              <span className="flex items-center gap-1"><Phone size={14} /> {selectedStudent.mobile}</span>
                          </div>
                      </div>
                      <button onClick={() => setSelectedStudent(null)} className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-100 rounded-full transition-colors">
                          <X size={24} />
                      </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6 space-y-8">
                      
                      {/* Section 0: Student Feedback Display (New) */}
                      {selectedStudent.studentFeedback && (
                          <section className="bg-yellow-50 p-6 rounded-xl border border-yellow-200 shadow-sm">
                             <h3 className="text-lg font-bold text-yellow-800 mb-3 flex items-center gap-2">
                                <MessageCircle size={20} /> Student Feedback
                             </h3>
                             <div className="flex items-start gap-4">
                                <div className="flex flex-col items-center p-3 bg-white rounded-lg border border-yellow-100 shadow-sm">
                                    <span className="text-2xl font-bold text-yellow-500">{selectedStudent.studentFeedback.rating}</span>
                                    <div className="flex gap-0.5">
                                        {[1,2,3,4,5].map(s => (
                                            <Star key={s} size={10} className={s <= selectedStudent.studentFeedback!.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-200"} />
                                        ))}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-slate-700 italic text-sm mb-2">"{selectedStudent.studentFeedback.comment}"</p>
                                    <p className="text-xs text-slate-400">Submitted on {new Date(selectedStudent.studentFeedback.date).toLocaleDateString()}</p>
                                </div>
                             </div>
                          </section>
                      )}

                      {/* Section 1: Progress Tracker */}
                      <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                              <CheckCircle className="text-indigo-600" size={20} /> Module Progress Tracker
                          </h3>
                          <div className="space-y-3">
                              {COURSE_CONTENT.map((module, i) => {
                                  const isDone = selectedStudent.completedModules.includes(module.id);
                                  const score = selectedStudent.moduleScores[module.id];
                                  return (
                                      <div key={module.id} className="flex items-center gap-3 text-sm">
                                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border ${isDone ? 'bg-green-100 text-green-700 border-green-200' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                                              {i + 1}
                                          </div>
                                          <div className="flex-1 min-w-0">
                                              <p className={`truncate ${isDone ? 'text-slate-900 font-medium' : 'text-slate-500'}`}>{module.title}</p>
                                          </div>
                                          {score !== undefined && (
                                              <span className={`px-2 py-0.5 rounded text-xs font-bold ${score >= 80 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                  {score}%
                                              </span>
                                          )}
                                      </div>
                                  )
                              })}
                          </div>
                      </section>

                      {/* Section 2: Score Analysis */}
                      <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                              <BarChart3 className="text-purple-600" size={20} /> Score Analysis
                          </h3>
                          <div className="h-64 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={getChartData(selectedStudent)}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                        <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} />
                                        <YAxis domain={[0, 100]} fontSize={10} tickLine={false} axisLine={false} />
                                        <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border:'none', boxShadow:'0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                                        <Bar dataKey="score" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                          </div>
                      </section>

                      {/* Section 3: Instructor Feedback */}
                      <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                              <MessageSquare className="text-orange-500" size={20} /> Instructor Feedback
                          </h3>
                          <div className="space-y-3">
                              <p className="text-xs text-slate-500">Provide personal feedback or notes for this student.</p>
                              <textarea 
                                  value={feedbackInput}
                                  onChange={(e) => setFeedbackInput(e.target.value)}
                                  className="w-full p-4 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[100px]"
                                  placeholder="Enter feedback here..."
                              />
                              <button 
                                  onClick={handleSaveFeedback}
                                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-indigo-700 transition-colors"
                              >
                                  <Save size={16} /> Save Feedback
                              </button>
                          </div>
                      </section>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};
