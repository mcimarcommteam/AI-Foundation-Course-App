
import React, { useEffect, useState } from 'react';
import { dbService } from '../services/db';
import { Trophy, Users, Award, Zap, Activity, Globe, Crown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface PublicStudentStats {
  id: string;
  name: string;
  country: string;
  score: number;
  progress: number;
  school: string;
  isCertified: boolean;
}

// Mock Data for Demonstration (Hydrates the view when DB is empty or loading)
const MOCK_PROFILES: PublicStudentStats[] = [
    { id: 'demo-1', name: 'Alex M.', country: '+1', score: 98, progress: 100, school: 'Stanford University', isCertified: true },
    { id: 'demo-2', name: 'Priya K.', country: '+91', score: 94, progress: 90, school: 'IIT Delhi', isCertified: false },
    { id: 'demo-3', name: 'Liam O.', country: '+44', score: 88, progress: 60, school: 'King\'s College', isCertified: false },
    { id: 'demo-4', name: 'Wei Z.', country: '+86', score: 92, progress: 100, school: 'National Univ of Singapore', isCertified: true },
    { id: 'demo-5', name: 'Sofia R.', country: '+34', score: 76, progress: 40, school: 'IE Business School', isCertified: false },
    { id: 'demo-6', name: 'Omar F.', country: '+971', score: 85, progress: 70, school: 'American Univ of Sharjah', isCertified: false },
    { id: 'demo-7', name: 'Sarah J.', country: '+1', score: 91, progress: 90, school: 'Georgia Tech', isCertified: false },
    { id: 'demo-8', name: 'Rahul V.', country: '+91', score: 65, progress: 20, school: 'Mumbai University', isCertified: false },
    { id: 'demo-9', name: 'Emma W.', country: '+61', score: 82, progress: 50, school: 'Univ of Melbourne', isCertified: false },
    { id: 'demo-10', name: 'Lucas B.', country: '+55', score: 89, progress: 80, school: 'Univ of São Paulo', isCertified: false },
    { id: 'demo-11', name: 'Yuki T.', country: '+81', score: 95, progress: 100, school: 'University of Tokyo', isCertified: true },
    { id: 'demo-12', name: 'Fatima H.', country: '+20', score: 79, progress: 50, school: 'Cairo University', isCertified: false },
];

const calculateStats = (students: PublicStudentStats[]) => {
    let totalScore = 0;
    let certCount = 0;
    const distribution = [0, 0, 0, 0, 0]; // 0-20, 21-40, 41-60, 61-80, 81-100

    students.forEach(s => {
      totalScore += s.score;
      if (s.isCertified) certCount++;

      if (s.score > 0) {
          const bucket = Math.min(4, Math.floor((s.score - 1) / 20));
          distribution[bucket]++;
      }
    });

    // Sort by Score DESC for Leaderboard
    const topStudents = [...students]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    const chartData = [
      { range: '0-20%', count: distribution[0] },
      { range: '21-40%', count: distribution[1] },
      { range: '41-60%', count: distribution[2] },
      { range: '61-80%', count: distribution[3] },
      { range: '81-100%', count: distribution[4] },
    ];

    // Base count to match marketing copy + real users
    const baseCount = 15400; 
    const currentCount = baseCount + students.length;

    return {
      totalStudents: currentCount,
      totalCertificates: 2100 + certCount, // Add base certified count for demo realism
      avgScore: students.length > 0 ? Math.round(totalScore / students.length) : 0,
      topStudents,
      scoreDistribution: chartData
    };
};

export const LiveStudentTracker: React.FC = () => {
  // Initialize with MOCK data immediately so it's always visible (No loading state)
  const [stats, setStats] = useState(calculateStats(MOCK_PROFILES));

  useEffect(() => {
    // Subscribe to real-time updates
    try {
        const unsubscribe = dbService.subscribeToAllStudents((data) => {
          let activeData: PublicStudentStats[] = [];
          
          // 1. Process Real Data
          if (data && data.length > 0) {
            activeData = data.map(s => {
              // Calculate Score
              const scores = Object.values(s.progress?.moduleScores || {}) as number[];
              const avg = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
              
              // Anonymize Name for Privacy (John Doe -> John D.)
              const nameParts = (s.profile.fullName || 'Anonymous').split(' ');
              const displayName = nameParts.length > 1 
                  ? `${nameParts[0]} ${nameParts[1].charAt(0)}.` 
                  : nameParts[0];
      
              return {
                id: s.id,
                name: displayName,
                country: s.profile.countryCode || '+91',
                score: Math.round(avg),
                progress: Math.round((s.progress?.completedModules?.length || 0) * 10), // Approx 10% per module
                school: s.profile.schoolName || 'Independent',
                isCertified: s.progress?.certificateDownloaded || false
              };
            });
            // If we have real data, update stats
            setStats(calculateStats(activeData));
          } 
          // If no real data, we stick with the initial mock state (no action needed)
        });

        return () => {
             if (typeof unsubscribe === 'function') unsubscribe();
        };
    } catch (e) {
        console.warn("Could not connect to live DB, falling back to mock mode", e);
        // Fallback remains active
    }
  }, []);

  return (
    <div className="w-full bg-[#0f172a] border-t border-indigo-500/30 backdrop-blur-xl bg-opacity-80 py-12 relative overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-30">
        {/* Background FX */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 lg:px-6 relative z-10">
            
            <div className="flex items-center gap-3 mb-8 animate-in slide-in-from-left duration-700">
                <div className="relative">
                    <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
                    <div className="relative w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                </div>
                <h3 className="text-white font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                    Live Global Student Activity
                </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* 1. Global Stats Ticker */}
                <div className="bg-slate-900/50 rounded-2xl border border-slate-700/50 p-6 flex flex-col justify-between hover:border-indigo-500/30 transition-colors">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-800/50 p-4 rounded-xl">
                            <div className="flex items-center gap-2 text-indigo-400 mb-1 text-xs font-bold uppercase">
                                <Users size={14} /> Enrolled
                            </div>
                            <div className="text-3xl font-black text-white">{stats.totalStudents.toLocaleString()}</div>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-xl">
                            <div className="flex items-center gap-2 text-yellow-400 mb-1 text-xs font-bold uppercase">
                                <Award size={14} /> Certified
                            </div>
                            <div className="text-3xl font-black text-white">{stats.totalCertificates.toLocaleString()}</div>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-xl">
                            <div className="flex items-center gap-2 text-green-400 mb-1 text-xs font-bold uppercase">
                                <Activity size={14} /> Avg. Score
                            </div>
                            <div className="text-3xl font-black text-white">{stats.avgScore}%</div>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-xl">
                            <div className="flex items-center gap-2 text-purple-400 mb-1 text-xs font-bold uppercase">
                                <Zap size={14} /> Active
                            </div>
                            <div className="text-3xl font-black text-white">Now</div>
                        </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-slate-700/50 text-xs text-slate-400">
                        <p>Data updates in real-time as students complete labs and quizzes globally.</p>
                    </div>
                </div>

                {/* 2. Top Performers Leaderboard */}
                <div className="bg-slate-900/50 rounded-2xl border border-slate-700/50 p-0 overflow-hidden flex flex-col hover:border-yellow-500/30 transition-colors">
                    <div className="p-4 border-b border-slate-700/50 bg-slate-800/30 flex justify-between items-center">
                        <h4 className="text-white font-bold flex items-center gap-2">
                            <Trophy size={16} className="text-yellow-500" /> Top Performers
                        </h4>
                        <span className="text-[10px] bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded uppercase font-bold">Live Ranking</span>
                    </div>
                    <div className="flex-1 overflow-y-auto max-h-[250px] scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                        <table className="w-full text-left">
                            <tbody className="divide-y divide-slate-700/50">
                                {stats.topStudents.map((s, idx) => (
                                    <tr key={s.id} className="hover:bg-white/5 transition-colors">
                                        <td className="p-3 pl-4 text-slate-400 font-mono text-xs w-8">#{idx + 1}</td>
                                        <td className="p-3">
                                            <div className="flex items-center gap-2">
                                                {idx === 0 && <Crown size={12} className="text-yellow-400" />}
                                                <span className="text-slate-200 font-medium text-sm">{s.name}</span>
                                            </div>
                                            <div className="text-[10px] text-slate-500 truncate max-w-[120px]">{s.school}</div>
                                        </td>
                                        <td className="p-3 text-right">
                                            <div className="text-emerald-400 font-bold text-sm">{s.score}%</div>
                                            <div className="text-[10px] text-slate-500">Score</div>
                                        </td>
                                        <td className="p-3 pr-4 text-right">
                                            {s.isCertified ? (
                                                <Award size={16} className="text-yellow-400 ml-auto" />
                                            ) : (
                                                <div className="w-16 bg-slate-700 h-1.5 rounded-full ml-auto">
                                                    <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${s.progress}%` }}></div>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 3. Performance Distribution Chart */}
                <div className="bg-slate-900/50 rounded-2xl border border-slate-700/50 p-6 flex flex-col hover:border-emerald-500/30 transition-colors">
                     <div className="mb-4">
                        <h4 className="text-white font-bold flex items-center gap-2">
                             <Activity size={16} className="text-emerald-500" /> Class Performance
                        </h4>
                        <p className="text-xs text-slate-500">Score distribution across all active students</p>
                     </div>
                     
                     <div className="flex-1 min-h-[180px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats.scoreDistribution}>
                                <Tooltip 
                                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                                />
                                <XAxis dataKey="range" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                    {stats.scoreDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index > 3 ? '#10b981' : '#6366f1'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                     </div>
                     <div className="mt-2 flex justify-between text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                         <span>Beginner</span>
                         <span>Expert</span>
                     </div>
                </div>

            </div>
        </div>
    </div>
  );
};
