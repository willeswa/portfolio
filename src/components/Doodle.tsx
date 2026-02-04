"use client";

import { useEffect, useState } from "react";

type DoodleType = "star" | "spiral" | "arrow" | "circle" | "underline" | "scribble" | "sparkle";

interface DoodleProps {
  type: DoodleType;
  className?: string;
  color?: string;
  delay?: number;
}

export default function Doodle({ type, className = "", color = "currentColor", delay = 0 }: DoodleProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const paths: Record<DoodleType, string> = {
    star: "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z",
    spiral: "M12 12C12 12 14 10 14 8C14 6 12 4 10 4C8 4 6 6 6 8C6 10 8 12 10 12C14 12 16 10 16 8C16 4 12 0 8 0", // Simplified
    arrow: "M2 12H22M22 12L16 6M22 12L16 18",
    circle: "M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z",
    underline: "M2 12C15 2 35 25 98 12",
    scribble: "M3 12C5 10 7 14 9 12C11 10 13 14 15 12C17 10 19 14 21 12",
    sparkle: "M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z",
  };

  const pathLength = 100; // Approximate for CSS animation

  return (
    <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={`inline-block ${className}`}
        style={{ overflow: 'visible' }}
    >
      <path
        d={paths[type]}
        style={{
          strokeDasharray: pathLength,
          strokeDashoffset: isVisible ? 0 : pathLength,
          transition: "stroke-dashoffset 1s ease-out", // "Draw" the shape
        }}
      />
    </svg>
  );
}
