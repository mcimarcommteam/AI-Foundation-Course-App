import React, { useRef, useState } from 'react';
import { Download, Loader2, CheckCircle2 } from 'lucide-react';
import { MCILogo } from './MCILogo';

interface CertificateProps {
  studentName: string;
  courseName: string;
  completionDate: string;
  score: number;
  onDownload?: () => void;
}

export const Certificate: React.FC<CertificateProps> = ({ studentName, courseName, completionDate, score, onDownload }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (!svgRef.current) return;
    setIsGenerating(true);

    try {
      // 1. Serialize SVG
      const svgData = new XMLSerializer().serializeToString(svgRef.current);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      // 2. Load into Image
      const img = new Image();
      img.src = url;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      // 3. Draw to Canvas
      const canvas = document.createElement('canvas');
      canvas.width = 1200; // Match viewBox width
      canvas.height = 800; // Match viewBox height
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');

      // White background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.drawImage(img, 0, 0);

      // 4. Download
      const pngUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `MCI_Certificate_${studentName.replace(/\s+/g, '_')}.png`;
      link.href = pngUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
      
      // Notify parent
      if (onDownload) onDownload();
      
    } catch (e) {
      console.error("Certificate generation failed:", e);
      alert("Failed to generate certificate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative shadow-2xl rounded-lg overflow-hidden border border-slate-200 bg-white mb-6 transform transition-all hover:scale-[1.01]">
        <svg 
            ref={svgRef} 
            viewBox="0 0 1200 800" 
            className="w-full max-w-4xl h-auto"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{stopColor: '#fbbf24', stopOpacity: 1}} />
                    <stop offset="50%" style={{stopColor: '#f59e0b', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#fbbf24', stopOpacity: 1}} />
                </linearGradient>
            </defs>
            
            {/* Background Pattern */}
            <rect width="1200" height="800" fill="#ffffff" />
            
            {/* Ornate Border */}
            <rect x="20" y="20" width="1160" height="760" fill="none" stroke="#0f4c81" strokeWidth="4" />
            <rect x="35" y="35" width="1130" height="730" fill="none" stroke="url(#goldGradient)" strokeWidth="8" />
            
            {/* Corner Accents */}
            <path d="M 35 150 L 35 35 L 150 35" fill="none" stroke="#0f4c81" strokeWidth="15" />
            <path d="M 1165 150 L 1165 35 L 1050 35" fill="none" stroke="#0f4c81" strokeWidth="15" />
            <path d="M 35 650 L 35 765 L 150 765" fill="none" stroke="#0f4c81" strokeWidth="15" />
            <path d="M 1165 650 L 1165 765 L 1050 765" fill="none" stroke="#0f4c81" strokeWidth="15" />

            {/* Logo at Top - Centered */}
            <MCILogo x="350" y="60" width="500" height="120" />

            {/* Content - Vertical Spacing Adjusted */}
            <text x="600" y="230" textAnchor="middle" fontFamily="serif" fontSize="60" fontWeight="bold" fill="#0f4c81">
                Certificate of Completion
            </text>
            
            <text x="600" y="290" textAnchor="middle" fontFamily="sans-serif" fontSize="24" fill="#64748b">
                This is to certify that
            </text>

            <text x="600" y="360" textAnchor="middle" fontFamily="serif" fontSize="56" fontWeight="bold" fill="#1e293b" textDecoration="underline">
                {studentName}
            </text>

            <text x="600" y="420" textAnchor="middle" fontFamily="sans-serif" fontSize="24" fill="#64748b">
                has successfully completed the curriculum for
            </text>

            <text x="600" y="475" textAnchor="middle" fontFamily="sans-serif" fontSize="42" fontWeight="bold" fill="#fbbf24">
                {courseName}
            </text>
            
            <text x="600" y="525" textAnchor="middle" fontFamily="sans-serif" fontSize="22" fontWeight="bold" fill="#0f4c81">
                Final Score: {score}%
            </text>

            <line x1="300" y1="545" x2="900" y2="545" stroke="#cbd5e1" strokeWidth="1" />

            <text x="600" y="580" textAnchor="middle" fontFamily="sans-serif" fontSize="20" fill="#475569">
                Awarded on {completionDate}
            </text>
            
            {/* Signature Section - Moved UP to y=640 to prevent overlap with bottom border */}
            <g transform="translate(600, 650)">
                {/* Signature Line */}
                <line x1="-150" y1="0" x2="150" y2="0" stroke="#0f4c81" strokeWidth="2" />
                
                {/* Simulated Signature "Kunal Soni" */}
                <text x="0" y="-10" textAnchor="middle" fontFamily="'Brush Script MT', cursive" fontSize="48" fill="#0f4c81" fontStyle="italic">
                    Kunal Soni
                </text>

                {/* Name & Title */}
                <text x="0" y="25" textAnchor="middle" fontFamily="sans-serif" fontSize="18" fill="#0f4c81" fontWeight="bold">
                    Kunal Soni
                </text>
                <text x="0" y="45" textAnchor="middle" fontFamily="sans-serif" fontSize="14" fill="#64748b">
                    Head - Academics & Operations
                </text>
                <text x="0" y="65" textAnchor="middle" fontFamily="sans-serif" fontSize="12" fill="#94a3b8">
                    Management Career Institute
                </text>
            </g>
        </svg>
      </div>

      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className="flex items-center gap-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-70 disabled:cursor-wait"
      >
        {isGenerating ? <Loader2 className="animate-spin" /> : <Download />}
        {isGenerating ? 'Generating Certificate...' : 'Download Certificate'}
      </button>
      <p className="mt-4 text-sm text-slate-500">
        <CheckCircle2 size={16} className="inline mr-1 text-green-500"/>
        Official Verified Credential
      </p>
    </div>
  );
};