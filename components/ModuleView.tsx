
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { WeekModule, ContentType, AIConfig } from '../types';
import { 
  CheckCircle, XCircle, Brain, FlaskConical, Pencil, ChevronRight, HelpCircle, 
  AlertTriangle, Image as ImageIcon, Loader2, Check, ExternalLink, Briefcase, 
  Lightbulb, Upload, Play, Wand2, Sparkles, RefreshCw, AlertCircle, 
  BarChart as ChartIcon, Clock, Hash, BookOpen, ChevronDown, Trophy, Share2, MoreHorizontal 
} from 'lucide-react';
import { generateImage, analyzeImage, generateVideo, editImage, sendMessageToGemini } from '../services/gemini';
import { InteractiveSimulation } from './InteractiveSimulation';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';

interface ModuleViewProps {
  module: WeekModule;
  isCompleted: boolean;
  onModuleComplete: (score: number) => void;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  completedSimulations: Set<string>;
  onSimulationComplete: (id: string) => void;
  onToggleCompletion: () => void;
}

// --- STYLED SUB-COMPONENTS (LABS) ---

const TechCardWrapper: React.FC<{ title: string; icon: React.ElementType; children: React.ReactNode }> = ({ title, icon: Icon, children }) => (
    <div className="bg-[#0f172a] rounded-xl overflow-hidden shadow-2xl border border-blue-900 my-6 transform transition-all hover:scale-[1.01]">
        <div className="bg-[#1e3a8a] p-3 border-b border-blue-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider font-bold">
                <Icon size={14} /> {title}
            </div>
            <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
            </div>
        </div>
        <div className="p-4 md:p-6 text-slate-200">
            {children}
        </div>
    </div>
);

const VisionLab: React.FC<{ placeholder: string }> = ({ placeholder }) => {
    const [image, setImage] = useState<string | null>(null);
    const [analysis, setAnalysis] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleAnalyze = async () => {
        if (!image) return;
        setLoading(true);
        const base64 = image.split(',')[1];
        const result = await analyzeImage(base64, "Describe this image in detail.");
        setAnalysis(result);
        setLoading(false);
    };

    return (
        <TechCardWrapper title="Vision_Analyzer_v2.5" icon={Brain}>
            <div className="flex flex-col gap-4">
                <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 text-center hover:bg-slate-800 transition-colors cursor-pointer relative bg-slate-900/50">
                    <input type="file" accept="image/*" onChange={handleUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>
                    {image ? (
                        <img src={image} alt="Upload" className="max-h-64 mx-auto rounded shadow-lg" />
                    ) : (
                        <div className="flex flex-col items-center text-slate-400">
                            <Upload size={32} className="mb-2" />
                            <span className="text-sm">Click to upload an image</span>
                        </div>
                    )}
                </div>
                
                <button 
                    onClick={handleAnalyze} 
                    disabled={!image || loading} 
                    className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 font-bold transition-all shadow-lg shadow-amber-900/20"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />} 
                    Analyze Image
                </button>
                
                {analysis && (
                    <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 text-sm leading-relaxed animate-in fade-in slide-in-from-bottom-2">
                        <h4 className="font-bold text-amber-400 mb-2 font-mono text-xs uppercase">Output Stream:</h4>
                        <p>{analysis}</p>
                    </div>
                )}
            </div>
        </TechCardWrapper>
    );
};

const VideoLab: React.FC<{ placeholder: string }> = ({ placeholder }) => {
    const [prompt, setPrompt] = useState('');
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!prompt) return;
        setLoading(true);
        const url = await generateVideo(prompt);
        setVideoUrl(url);
        setLoading(false);
    };

    return (
        <TechCardWrapper title="Veo_Video_Studio" icon={Play}>
            <div className="flex flex-col gap-4">
                <textarea 
                    value={prompt} 
                    onChange={(e) => setPrompt(e.target.value)} 
                    placeholder={placeholder}
                    className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white placeholder-slate-500 resize-none"
                    rows={3}
                />
                <button onClick={handleGenerate} disabled={!prompt || loading} className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 font-bold shadow-lg shadow-amber-900/20">
                    {loading ? <Loader2 className="animate-spin" /> : <Play size={18} fill="currentColor" />} Generate Video
                </button>
                {loading && <p className="text-xs text-center text-slate-500 animate-pulse">Rendering on remote GPU cluster (approx 30s)...</p>}
                {videoUrl && (
                    <div className="rounded-lg overflow-hidden border border-slate-700 shadow-2xl">
                        <video controls src={videoUrl} className="w-full" autoPlay loop muted />
                    </div>
                )}
            </div>
        </TechCardWrapper>
    );
};

const EditorLab: React.FC<{ placeholder: string }> = ({ placeholder }) => {
    const [image, setImage] = useState<string | null>(null);
    const [prompt, setPrompt] = useState('');
    const [resultImage, setResultImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleEdit = async () => {
        if (!image || !prompt) return;
        setLoading(true);
        const base64 = image.split(',')[1];
        const result = await editImage(base64, prompt);
        setResultImage(result);
        setLoading(false);
    };

    return (
        <TechCardWrapper title="Magic_Editor_Canvas" icon={Wand2}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="flex flex-col gap-3">
                     <label className="text-xs font-bold text-slate-400 uppercase">Input Image</label>
                     <div className="border-2 border-dashed border-slate-700 rounded-lg h-40 flex items-center justify-center relative hover:bg-slate-800 transition-colors bg-slate-900/50">
                        <input type="file" accept="image/*" onChange={handleUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>
                        {image ? <img src={image} className="h-full w-full object-contain" /> : <Upload size={24} className="text-slate-500"/>}
                     </div>
                 </div>
                 
                 <div className="flex flex-col gap-3">
                    <label className="text-xs font-bold text-slate-400 uppercase">Prompt</label>
                    <textarea 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder={placeholder}
                        className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-white h-[100px] resize-none focus:ring-2 focus:ring-amber-500"
                    />
                     <button onClick={handleEdit} disabled={!image || !prompt || loading} className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 font-bold mt-auto">
                        {loading ? <Loader2 className="animate-spin" /> : <Wand2 size={18} />} Edit
                    </button>
                 </div>
            </div>
            {resultImage && (
                <div className="mt-6 border-t border-slate-700 pt-6">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-2">Result</p>
                    <img src={resultImage} alt="Edited" className="w-full rounded-lg border border-slate-700 shadow-xl" />
                </div>
            )}
        </TechCardWrapper>
    );
};

const ThinkingLab: React.FC<{ placeholder: string }> = ({ placeholder }) => {
    const [problem, setProblem] = useState('');
    const [solution, setSolution] = useState('');
    const [loading, setLoading] = useState(false);

    const handleThink = async () => {
        if (!problem) return;
        setLoading(true);
        const res = await sendMessageToGemini(problem, "Deep Reasoning Problem Solving", 'thinking');
        setSolution(res);
        setLoading(false);
    };

    return (
        <TechCardWrapper title="Deep_Thought_Process_v3" icon={Brain}>
            <div className="flex flex-col gap-4">
                <textarea 
                    value={problem} 
                    onChange={(e) => setProblem(e.target.value)} 
                    placeholder={placeholder}
                    className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:ring-2 focus:ring-amber-500 text-white placeholder-slate-500 font-mono text-sm"
                    rows={4}
                />
                <button onClick={handleThink} disabled={!problem || loading} className="bg-blue-600 hover:bg-blue-50 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 font-bold shadow-lg shadow-blue-900/20">
                    {loading ? <Loader2 className="animate-spin" /> : <Brain size={18} />} 
                    Run Deep Reasoning (32k Token Budget)
                </button>
                {solution && (
                     <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 mt-2 text-sm leading-relaxed whitespace-pre-wrap font-mono text-blue-100">
                        {solution}
                    </div>
                )}
            </div>
        </TechCardWrapper>
    );
};

const AIImage: React.FC<{ prompt: string }> = ({ prompt }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        const fetchImage = async () => {
            const url = await generateImage(prompt);
            if (mounted && url) setImageUrl(url);
            if (mounted) setLoading(false);
        };
        fetchImage();
        return () => { mounted = false; };
    }, [prompt]);

    return (
        <div className="mt-6 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 relative aspect-video flex items-center justify-center shadow-inner group">
            {loading ? (
                <div className="flex flex-col items-center gap-2 text-slate-400">
                    <Loader2 className="w-8 h-8 animate-spin" />
                    <span className="text-xs">Generating Illustration...</span>
                </div>
            ) : imageUrl ? (
                <>
                <img src={imageUrl} alt={prompt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-2 text-xs text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                    Generated by Gemini Nano: "{prompt}"
                </div>
                </>
            ) : (
                <span className="text-xs text-slate-400">Failed to load</span>
            )}
        </div>
    );
};

const BiasSimulator: React.FC = () => {
    const [ratio, setRatio] = useState(50); 
    const biasFactor = (ratio - 50) / 50; 
    const confidenceA = Math.min(95, Math.max(5, 50 + (biasFactor * 40)));
    const confidenceB = Math.min(95, Math.max(5, 50 - (biasFactor * 40)));

    const data = [
        { name: 'Group A', score: confidenceA, fill: '#1e3a8a' }, // Brand Blue
        { name: 'Group B', score: confidenceB, fill: '#fbbf24' }, // Brand Yellow
    ];

    return (
        <div className="bg-white p-4 md:p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="mb-6">
                <label className="block text-sm font-bold text-slate-700 mb-2">
                    Training Data Ratio (Historical Bias)
                </label>
                <div className="relative pt-6 pb-2">
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={ratio} 
                        onChange={(e) => setRatio(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-900"
                    />
                    <div className="flex justify-between text-xs font-bold text-slate-400 mt-2 uppercase tracking-wide">
                        <span>Mostly Group B</span>
                        <span className="text-blue-900">Balanced</span>
                        <span>Mostly Group A</span>
                    </div>
                </div>
            </div>

            <div className="h-64 w-full">
                <p className="text-center text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">AI "Hiring Confidence" Score</p>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                        <XAxis type="number" domain={[0, 100]} stroke="#64748b" fontSize={12} unit="%" />
                        <YAxis dataKey="name" type="category" width={80} stroke="#64748b" fontSize={12} />
                        <RechartsTooltip 
                            cursor={{fill: '#f1f5f9'}}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                        />
                        <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={40}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className={`mt-4 p-4 rounded-lg border flex items-start gap-3 transition-colors ${Math.abs(biasFactor) > 0.4 ? 'bg-red-50 border-red-200 text-red-800' : 'bg-green-50 border-green-200 text-green-800'}`}>
                {Math.abs(biasFactor) > 0.4 ? <AlertTriangle size={20} className="shrink-0 mt-0.5" /> : <CheckCircle size={20} className="shrink-0 mt-0.5" />}
                <div>
                    <h4 className="font-bold text-sm">{Math.abs(biasFactor) > 0.4 ? 'High Bias Detected!' : 'Balanced Model'}</h4>
                    <p className="text-xs mt-1 leading-relaxed">
                        {Math.abs(biasFactor) > 0.4 
                            ? "Because the training data is heavily skewed, the AI has learned to unfairly prefer one group over the other, even if candidates are equally qualified."
                            : "The training data is relatively balanced, so the AI is treating both groups fairly."}
                    </p>
                </div>
            </div>
        </div>
    );
};

// --- MAIN MODULE VIEW ---

export const ModuleView: React.FC<ModuleViewProps> = ({ module, isCompleted, onModuleComplete, onNext, onPrev, hasNext, hasPrev, completedSimulations, onSimulationComplete }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const moduleRef = useRef<HTMLDivElement>(null);
  
  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
      // Reset State on Module Change
      setQuizAnswers({});
      setQuizSubmitted(false);
      setScore(0);
      setScrollProgress(0);
      document.querySelector('#main-scroll-container')?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [module.id]);

  useEffect(() => {
    const main = document.querySelector('#main-scroll-container');
    if (!main) return;
    const handleScroll = () => {
        setScrollProgress((main.scrollTop / (main.scrollHeight - main.clientHeight)) * 100);
    };
    main.addEventListener('scroll', handleScroll);
    return () => main.removeEventListener('scroll', handleScroll);
  }, [module.id]);

  // Derived: Estimated Read Time (Average 200 words per minute + 5 mins per lab)
  const estimatedTime = useMemo(() => {
      let words = 0;
      let labs = 0;
      module.content.forEach(c => {
          words += c.body.split(' ').length;
          if (c.type === ContentType.LAB || c.type === ContentType.AI_LAB) labs++;
      });
      return Math.ceil(words / 200) + (labs * 5);
  }, [module]);

  const handleOptionSelect = (qIndex: number, optIndex: number) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({...prev, [qIndex]: optIndex}));
  };

  const submitQuiz = () => {
      let correct = 0;
      module.quizQuestions.forEach((q, i) => {
          if (quizAnswers[i] === q.correctIndex) correct++;
      });
      setScore(correct);
      setQuizSubmitted(true);
      const percentage = Math.round((correct / module.quizQuestions.length) * 100);
      onModuleComplete(percentage);
  };

  const resetQuiz = () => {
      setQuizAnswers({});
      setQuizSubmitted(false);
      setScore(0);
  }

  // --- RENDERING HELPERS ---

  const scrollToSection = (idx: number) => {
      const el = document.getElementById(`block-${idx}`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const getOptionClass = (qIndex: number, optIndex: number, correctIndex: number) => {
    if (!quizSubmitted) {
        return quizAnswers[qIndex] === optIndex
            ? 'bg-[#1e3a8a] border-[#1e3a8a] text-white shadow-md transform scale-[1.01]' // Selected Brand Blue
            : 'bg-white hover:bg-blue-50 border-slate-200 text-slate-700';
    }
    const isSelected = quizAnswers[qIndex] === optIndex;
    const isCorrectOption = correctIndex === optIndex;
    if (isCorrectOption) return 'bg-green-500 border-green-500 text-white font-medium shadow-md';
    if (isSelected && !isCorrectOption) return 'bg-red-500 border-red-500 text-white opacity-90';
    return 'bg-slate-100 border-slate-200 text-slate-400 opacity-50';
  };

  return (
    <div className="max-w-7xl mx-auto pb-20 relative" ref={moduleRef}>
      
      {/* 1. CINEMATIC HERO HEADER */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-[#1e3a8a] text-white mb-10 group border-b-4 border-amber-400">
          {/* Dynamic Backgrounds */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a] to-[#172554] opacity-90"></div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10 p-6 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div className="max-w-3xl">
                  <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-amber-400/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider border border-amber-400/30 text-amber-300 shadow-sm">
                          {module.weekRange}
                      </span>
                      {isCompleted && (
                          <span className="flex items-center gap-1.5 px-3 py-1 bg-green-500/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider text-green-300 border border-green-500/30">
                              <CheckCircle size={12} /> Completed
                          </span>
                      )}
                  </div>
                  <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight tracking-tight text-white">
                      {module.title}
                  </h1>
                  <p className="text-base md:text-lg text-blue-100 leading-relaxed font-light border-l-4 border-amber-400 pl-4">
                      {module.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 md:gap-6 mt-8 text-sm font-medium text-blue-200">
                      <div className="flex items-center gap-2">
                          <Clock size={16} className="text-amber-400" /> {estimatedTime} min read
                      </div>
                      <div className="flex items-center gap-2">
                          <Hash size={16} className="text-amber-400" /> {module.content.length} Sections
                      </div>
                      <div className="flex items-center gap-2">
                          <Trophy size={16} className="text-amber-400" /> +100 XP
                      </div>
                  </div>
              </div>

              {/* Action Button */}
              <div className="hidden md:block">
                  <button onClick={() => scrollToSection(0)} className="bg-amber-400 text-[#1e3a8a] px-6 py-3 rounded-xl font-bold hover:bg-amber-300 transition-colors shadow-lg flex items-center gap-2">
                      Start Learning <ChevronDown size={18} />
                  </button>
              </div>
          </div>
      </div>

      <div className="flex gap-8 items-start">
        
        {/* 2. MAIN CONTENT STREAM */}
        <div className="flex-1 min-w-0 space-y-10">
            {module.content.map((block, idx) => {
                const isFirst = idx === 0;
                
                // --- SPECIAL CONTENT RENDERERS ---

                // A. LABS & TOOLS
                if (block.type === ContentType.AI_LAB && block.aiConfig) {
                    return (
                        <div key={idx} id={`block-${idx}`} className="scroll-mt-24">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2.5 bg-gradient-to-br from-[#1e3a8a] to-blue-800 rounded-xl text-white shadow-lg shadow-blue-200">
                                    <Sparkles size={20} className="text-amber-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800">{block.heading}</h3>
                            </div>
                            <p className="text-slate-600 mb-6 text-lg leading-relaxed">{block.body}</p>
                            
                            {/* Render the specific lab component */}
                            {block.aiConfig.tool === 'VISION_ANALYZER' && <VisionLab placeholder={block.aiConfig.placeholder || ''} />}
                            {block.aiConfig.tool === 'VIDEO_GENERATOR' && <VideoLab placeholder={block.aiConfig.placeholder || ''} />}
                            {block.aiConfig.tool === 'IMAGE_EDITOR' && <EditorLab placeholder={block.aiConfig.placeholder || ''} />}
                            {block.aiConfig.tool === 'THINKING_PROBLEM' && <ThinkingLab placeholder={block.aiConfig.placeholder || ''} />}
                        </div>
                    );
                }

                // B. SIMULATIONS
                if (block.type === ContentType.INTERACTIVE && block.simulationConfig) {
                    return (
                        <div key={idx} id={`block-${idx}`} className="scroll-mt-24 my-8">
                           <InteractiveSimulation 
                                config={block.simulationConfig} 
                                isCompleted={completedSimulations.has(`${module.id}-sim-${idx}`)} 
                                onComplete={() => onSimulationComplete(`${module.id}-sim-${idx}`)} 
                           />
                        </div>
                    );
                }

                // C. DATA VIS
                if (block.type === ContentType.DATA_VISUALIZATION && block.dataVisConfig?.type === 'BIAS_SIMULATOR') {
                    return (
                        <div key={idx} id={`block-${idx}`} className="scroll-mt-24">
                            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                                <div className="p-4 md:p-6 border-b border-slate-100 bg-slate-50 flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 text-[#1e3a8a] rounded-lg">
                                        <ChartIcon size={20} />
                                    </div>
                                    <h3 className="font-bold text-xl text-slate-800">{block.heading}</h3>
                                </div>
                                <div className="p-4 md:p-6">
                                     <p className="mb-6 text-slate-600 leading-relaxed">{block.body}</p>
                                     <BiasSimulator />
                                </div>
                            </div>
                        </div>
                    )
                }

                // D. STANDARD CONTENT CARDS (Text, Case Study, etc)
                let Icon = BookOpen;
                let cardStyle = "bg-white border-slate-200 hover:border-blue-300";
                let iconBg = "bg-blue-50 text-[#1e3a8a]";

                if (block.type === ContentType.CASE_STUDY) { 
                    Icon = Briefcase; 
                    cardStyle = "bg-gradient-to-br from-blue-50 to-white border-blue-200 hover:border-blue-400"; 
                    iconBg = "bg-blue-100 text-[#1e3a8a]";
                }
                else if (block.type === ContentType.ACTIVITY) { 
                    Icon = Lightbulb; 
                    cardStyle = "bg-gradient-to-br from-amber-50 to-white border-amber-200 hover:border-amber-400"; 
                    iconBg = "bg-amber-100 text-amber-700";
                }
                else if (block.type === ContentType.LAB) {
                    Icon = FlaskConical;
                    cardStyle = "bg-slate-50 border-slate-200";
                    iconBg = "bg-white shadow-sm text-slate-700";
                }

                return (
                    <div key={idx} id={`block-${idx}`} className={`scroll-mt-24 rounded-2xl border p-4 md:p-8 shadow-sm transition-all duration-300 ${cardStyle}`}>
                        <div className="flex items-start gap-3 md:gap-5">
                            <div className={`p-2 md:p-3 rounded-xl shrink-0 ${iconBg}`}>
                                <Icon size={24} />
                            </div>
                            <div className="flex-1">
                                {block.heading && <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-3">{block.heading}</h3>}
                                <div className="prose prose-slate max-w-none text-slate-600 text-base md:text-lg leading-7 md:leading-8">
                                    <p className="whitespace-pre-line">{block.body}</p>
                                </div>
                                
                                {block.bullets && (
                                    <ul className="mt-6 space-y-3">
                                        {block.bullets.map((b, i) => (
                                            <li key={i} className="flex gap-3 items-start p-3 rounded-lg bg-white/50 border border-transparent hover:border-slate-200 transition-colors">
                                                <div className="mt-1.5 w-2 h-2 rounded-full bg-amber-400 shrink-0"/>
                                                <span className="text-slate-700 font-medium">{b}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {block.linkUrl && (
                                    <div className="mt-8">
                                        <a href={block.linkUrl} target="_blank" className="inline-flex items-center gap-2 bg-[#1e3a8a] text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-blue-900 hover:shadow-lg transition-all transform hover:-translate-y-0.5 w-full md:w-auto justify-center">
                                            <ExternalLink size={18} /> {block.linkText || "Launch External Resource"}
                                        </a>
                                    </div>
                                )}
                                
                                {block.imagePlaceholder && <AIImage prompt={block.imagePlaceholder} />}
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* 3. BOSS BATTLE QUIZ */}
            {module.quizQuestions.length > 0 && (
                <div id="module-quiz" className="mt-20 scroll-mt-24">
                     <div className="bg-gradient-to-br from-[#1e3a8a] to-blue-900 rounded-3xl p-1 overflow-hidden shadow-2xl">
                        <div className="bg-[#1e3a8a] rounded-[22px] p-4 md:p-12 relative overflow-hidden">
                             {/* Background Decoration */}
                             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                             
                             <div className="relative z-10">
                                 <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6 text-center md:text-left">
                                    <div>
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400 text-[#1e3a8a] rounded-full text-xs font-bold uppercase tracking-wider mb-3 shadow-md">
                                            <Trophy size={12} /> Challenge Mode
                                        </div>
                                        <h2 className="text-3xl font-bold text-white mb-2">Knowledge Check</h2>
                                        <p className="text-blue-200">Prove your mastery of {module.title}.</p>
                                    </div>
                                    {quizSubmitted && (
                                        <div className="flex flex-col items-center">
                                            <div className={`text-4xl font-black ${score >= module.quizQuestions.length * 0.7 ? 'text-green-400' : 'text-amber-400'}`}>
                                                {score}/{module.quizQuestions.length}
                                            </div>
                                            <span className="text-xs uppercase tracking-widest text-blue-200 font-bold">Score</span>
                                        </div>
                                    )}
                                 </div>

                                 <div className="space-y-6">
                                    {module.quizQuestions.map((q, i) => {
                                        return (
                                            <div key={i} className="bg-blue-900/50 rounded-xl p-4 md:p-6 border border-blue-700/50 hover:border-amber-400/50 transition-colors">
                                                <h3 className="font-bold text-lg text-white mb-4 flex gap-3">
                                                    <span className="text-amber-400">{i+1}.</span> {q.question}
                                                </h3>
                                                <div className="grid gap-3">
                                                    {q.options.map((opt, optI) => {
                                                        const optionClass = getOptionClass(i, optI, q.correctIndex);
                                                        return (
                                                            <button 
                                                                key={optI} 
                                                                onClick={() => handleOptionSelect(i, optI)} 
                                                                disabled={quizSubmitted}
                                                                className={`w-full text-left px-5 py-4 rounded-lg transition-all flex justify-between items-center ${optionClass}`}
                                                            >
                                                                <span className="text-sm md:text-base">{opt}</span>
                                                                {quizSubmitted && q.correctIndex === optI && <CheckCircle size={18} />}
                                                                {quizSubmitted && quizAnswers[i] === optI && quizAnswers[i] !== q.correctIndex && <XCircle size={18} />}
                                                            </button>
                                                        )
                                                    })}
                                                </div>
                                                
                                                {quizSubmitted && (
                                                    <div className={`mt-4 p-4 rounded-lg text-sm border-l-4 ${quizAnswers[i] === q.correctIndex ? 'border-green-500 bg-green-900/10 text-green-100' : 'border-red-500 bg-red-900/10 text-red-100'}`}>
                                                        <span className="block font-bold mb-1 opacity-75 uppercase text-xs">Explanation</span>
                                                        {q.explanation}
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                 </div>

                                 <div className="mt-10 flex justify-center">
                                     {quizSubmitted ? (
                                        <button onClick={resetQuiz} className="flex items-center gap-2 px-8 py-4 bg-slate-700 text-white rounded-xl font-bold hover:bg-slate-600 transition-colors w-full md:w-auto justify-center">
                                            <RefreshCw size={20} /> Retry Challenge
                                        </button>
                                     ) : (
                                        <button 
                                            onClick={submitQuiz} 
                                            disabled={Object.keys(quizAnswers).length < module.quizQuestions.length}
                                            className="bg-amber-400 text-[#1e3a8a] px-10 py-4 rounded-xl font-bold shadow-lg shadow-amber-900/20 hover:bg-amber-300 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:transform-none flex items-center gap-2 w-full md:w-auto justify-center"
                                        >
                                            Submit Final Answers <ChevronRight size={20} />
                                        </button>
                                     )}
                                 </div>
                             </div>
                        </div>
                     </div>
                </div>
            )}

            {/* 4. FOOTER NAVIGATION */}
            <div className="flex justify-between items-center pt-12 mt-12 border-t border-slate-200">
                <button onClick={onPrev} disabled={!hasPrev} className="group flex items-center gap-3 px-4 md:px-6 py-4 rounded-xl text-slate-500 hover:text-[#1e3a8a] hover:bg-blue-50 transition-all disabled:opacity-30">
                    <div className="p-2 rounded-full bg-slate-100 group-hover:bg-blue-100 transition-colors">
                        <ChevronRight size={20} className="rotate-180" />
                    </div>
                    <div className="text-left hidden md:block">
                        <span className="block text-xs font-bold uppercase tracking-wider opacity-70">Previous</span>
                        <span className="font-bold">Back</span>
                    </div>
                </button>

                <button onClick={onNext} disabled={!hasNext} className="group flex items-center gap-3 px-6 md:px-8 py-4 rounded-xl bg-[#1e3a8a] text-white shadow-xl hover:bg-blue-800 hover:shadow-2xl hover:-translate-y-1 transition-all disabled:opacity-50 disabled:transform-none disabled:shadow-none">
                    <div className="text-right">
                        <span className="block text-xs font-bold uppercase tracking-wider opacity-70">Next Module</span>
                        <span className="font-bold">Continue</span>
                    </div>
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>

        {/* 5. STICKY TABLE OF CONTENTS (Desktop) */}
        <div className="hidden lg:block w-72 shrink-0 sticky top-8 self-start">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 max-h-[calc(100vh-4rem)] overflow-y-auto">
                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Hash size={16} className="text-[#1e3a8a]" /> On this page
                </h4>
                <ul className="space-y-1">
                    {module.content.map((block, i) => (
                        <li key={i}>
                            <button 
                                onClick={() => scrollToSection(i)}
                                className="text-left w-full px-3 py-2 text-sm text-slate-500 hover:text-[#1e3a8a] hover:bg-blue-50 rounded-lg transition-colors truncate"
                            >
                                {block.heading || `Section ${i + 1}`}
                            </button>
                        </li>
                    ))}
                    {module.quizQuestions.length > 0 && (
                        <li>
                            <button 
                                onClick={() => document.getElementById('module-quiz')?.scrollIntoView({ behavior: 'smooth' })}
                                className="text-left w-full px-3 py-2 text-sm text-slate-500 hover:text-[#1e3a8a] hover:bg-blue-50 rounded-lg transition-colors font-bold mt-2 pt-2 border-t border-slate-100"
                            >
                                Challenge Mode
                            </button>
                        </li>
                    )}
                </ul>
                
                <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <h5 className="font-bold text-[#1e3a8a] text-xs uppercase mb-2">Module Stats</h5>
                    <div className="flex justify-between text-sm text-blue-800 mb-1">
                        <span>XP Earned</span>
                        <span className="font-bold">{isCompleted ? '100' : '0'}/100</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-1.5 overflow-hidden">
                        <div className={`h-full bg-amber-400 rounded-full transition-all duration-1000 ${isCompleted ? 'w-full' : 'w-0'}`}></div>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};
