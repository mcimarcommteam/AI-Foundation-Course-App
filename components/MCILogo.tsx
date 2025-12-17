import React from 'react';

interface MCILogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const MCILogo: React.FC<MCILogoProps> = ({ className = "h-12 w-auto", ...props }) => {
  const blue = "#1e3a8a"; // Dark blue
  const yellow = "#fbbf24"; // Brand yellow
  const orange = "#f59e0b"; // Darker yellow for accents

  return (
    <svg viewBox="0 0 600 130" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="MCI Logo" {...props}>
      {/* Icon Section - Adjusted to match the 'Growth Graph' look */}
      <g transform="translate(10, 10)">
        {/* Left Pillar - Short */}
        <rect x="30" y="60" width="8" height="30" rx="1" fill={yellow} />
        {/* Right Pillar - Tall */}
        <rect x="70" y="30" width="8" height="60" rx="1" fill={yellow} />
        
        {/* The Swoosh Arrow */}
        {/* Starts left-mid, dips to top of left pillar (dot), swoops up past right pillar */}
        <path 
            d="M 5 50 Q 34 85 85 15" 
            stroke={blue} 
            strokeWidth="7" 
            strokeLinecap="round" 
            fill="none"
        />
        
        {/* Arrow Head */}
        <path 
            d="M 68 15 L 85 15 L 85 32" 
            stroke={blue} 
            strokeWidth="7" 
            strokeLinecap="round" 
            strokeLinejoin="round"
        />
        
        {/* Connection Dot on Left Pillar - White fill with Yellow stroke */}
        <circle cx="34" cy="60" r="5" fill="white" stroke={yellow} strokeWidth="2.5" />
      </g>

      {/* Text Section */}
      <g transform="translate(120, 0)">
        {/* MANAGEMENT - Heavy Bold Yellow */}
        <text x="0" y="55" fontFamily="sans-serif" fontWeight="900" fontSize="52" fill={yellow} letterSpacing="-1">
            MANAGEMENT
        </text>
        
        {/* CAREER INSTITUTE - Medium Blue, Wide Spacing */}
        <text x="2" y="90" fontFamily="sans-serif" fontWeight="600" fontSize="28" fill={blue} letterSpacing="4">
            CAREER INSTITUTE
        </text>
        
        {/* Tagline - Blue / Yellow / Blue */}
        <text x="2" y="118" fontFamily="sans-serif" fontWeight="800" fontSize="15" letterSpacing="1.5">
            <tspan fill={blue}>LEARN.</tspan>
            <tspan dx="12" fill={orange}>EXECUTE.</tspan>
            <tspan dx="12" fill={blue}>GROW.</tspan>
        </text>
      </g>
    </svg>
  );
};