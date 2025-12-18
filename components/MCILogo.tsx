
import React from 'react';

interface MCILogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  variant?: 'light' | 'dark'; // 'dark' = colored text for white bg, 'light' = white text for dark bg
}

export const MCILogo: React.FC<MCILogoProps> = ({ className = "h-12 w-auto", variant = 'dark', ...props }) => {
  // Brand Colors
  const brandBlue = "#1e3a8a"; 
  const brandYellow = "#fbbf24"; 
  const brandOrange = "#f59e0b";

  // Dynamic Colors based on variant
  const primaryColor = variant === 'light' ? '#ffffff' : brandBlue;
  const secondaryColor = brandYellow; 

  return (
    <svg viewBox="0 0 600 130" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="MCI Logo" {...props}>
      {/* Icon Section */}
      <g transform="translate(10, 10)">
        {/* Pillars - Always Brand Yellow/Gold as they pop well on both backgrounds */}
        <rect x="30" y="60" width="8" height="30" rx="1" fill={brandYellow} />
        <rect x="70" y="30" width="8" height="60" rx="1" fill={brandYellow} />
        
        {/* Swoosh Arrow - Adapts to variant */}
        <path 
            d="M 5 50 Q 34 85 85 15" 
            stroke={primaryColor} 
            strokeWidth="7" 
            strokeLinecap="round" 
            fill="none"
        />
        <path 
            d="M 68 15 L 85 15 L 85 32" 
            stroke={primaryColor} 
            strokeWidth="7" 
            strokeLinecap="round" 
            strokeLinejoin="round"
        />
        
        {/* Dot */}
        <circle cx="34" cy="60" r="5" fill={variant === 'light' ? brandBlue : 'white'} stroke={brandYellow} strokeWidth="2.5" />
      </g>

      {/* Text Section */}
      <g transform="translate(120, 0)">
        {/* MANAGEMENT - Always Brand Yellow/Gold */}
        <text x="0" y="55" fontFamily="sans-serif" fontWeight="900" fontSize="52" fill={brandYellow} letterSpacing="-1">
            MANAGEMENT
        </text>
        
        {/* CAREER INSTITUTE - Adapts to variant (White or Blue) */}
        <text x="2" y="90" fontFamily="sans-serif" fontWeight="600" fontSize="28" fill={primaryColor} letterSpacing="4">
            CAREER INSTITUTE
        </text>
        
        {/* Tagline */}
        <text x="2" y="118" fontFamily="sans-serif" fontWeight="800" fontSize="15" letterSpacing="1.5">
            <tspan fill={primaryColor}>LEARN.</tspan>
            <tspan dx="12" fill={brandOrange}>EXECUTE.</tspan>
            <tspan dx="12" fill={primaryColor}>GROW.</tspan>
        </text>
      </g>
    </svg>
  );
};
