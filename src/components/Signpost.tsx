"use client";

import { useEffect, useState } from "react";
import Doodle from "./Doodle";

interface SignpostProps {
    trigger?: "timer" | "scroll";
}

export default function Signpost({ trigger = "timer" }: SignpostProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isWiggling, setIsWiggling] = useState(false);
  const [wiggleCount, setWiggleCount] = useState(0);
  const [isFallen, setIsFallen] = useState(false);

  useEffect(() => {
    let cleanup: () => void = () => {};

    if (trigger === "timer") {
        const revealTimer = setTimeout(() => {
            setIsVisible(true);
        }, 2000);
        cleanup = () => clearTimeout(revealTimer);
    } else {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPosition = window.scrollY;
            
            if (totalHeight > 0 && scrollPosition / totalHeight > 0.2) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
                // Reset state when hidden so it can replay if approached again
                setWiggleCount(0);
                setIsFallen(false);
            }
        };
        
        window.addEventListener("scroll", handleScroll);
        handleScroll();
        cleanup = () => window.removeEventListener("scroll", handleScroll);
    }

    return cleanup;
  }, [trigger]);

  // Wiggle Logic
  useEffect(() => {
      if (!isVisible || isFallen) return;

      const interval = setInterval(() => {
          if (wiggleCount >= 1) {
              clearInterval(interval);
              // Small delay before falling
              setTimeout(() => setIsFallen(true), 1000);
              return;
          }

          setIsWiggling(true);
          setTimeout(() => setIsWiggling(false), 1000);
          setWiggleCount(prev => prev + 1);
      }, 3000); // Wiggle every 5s instead of 10s for faster feedback

      return () => clearInterval(interval);
  }, [isVisible, isFallen, wiggleCount]);

  // Determine classes for state
  // Visible: translate-y-0 opacity-100
  // Hidden: translate-y-full opacity-0
  // Fallen: translate-y-[70%] rotate-[15deg] (peeking)
  // Hover logic handled by group-hover in CSS, effectively resetting transform
  
  const getTransformClass = () => {
      if (!isVisible) return 'translate-y-full opacity-0';
      
      // If fallen, apply fell styling unless hovered (group-hover handles the reset in CSS?)
      // We'll rely on group-hover to override, but set the base state here.
      // Actually standard CSS group-hover overrides specific classes best if defined there.
      // Let's use conditioned classes.
      
      if (isFallen) {
          return 'translate-y-[60%] rotate-[25deg] opacity-90 group-hover:translate-y-0 group-hover:rotate-0 group-hover:opacity-100';
      }
      
      return 'translate-y-0 opacity-100';
  };

  return (
    <a
      href="mailto:willieswanjala@gmail.com"
      className={`group fixed bottom-[calc(var(--spacing)*-4)] left-10 z-[60] flex flex-col items-center pointer-events-auto transition-all duration-700 origin-bottom-left md:left-20 
        ${getTransformClass()}
        ${isWiggling ? 'animate-bounce' : ''} 
        hover:-translate-y-4 hover:rotate-2`}
      aria-label="Send me an email"
    >
        {/* The Sign Board */}
        <div className={`relative bg-[#fffdf5] p-3 shadow-md border-2 border-stone-800 rotate-[-2deg] rounded-sm min-w-[140px] text-center z-10 transition-transform group-hover:rotate-0 ${isWiggling ? 'rotate-3' : ''}`}>
             {/* Nails */}
             <div className="absolute top-1 left-2 w-1.5 h-1.5 rounded-full bg-stone-400 border border-stone-600"></div>
             <div className="absolute top-1 right-2 w-1.5 h-1.5 rounded-full bg-stone-400 border border-stone-600"></div>
             
             <div className="flex flex-col gap-0 relative">
                 <span className="font-handwriting font-bold text-2xl text-red-600 leading-none block">HIRE</span>
                 <span className="font-handwriting font-bold text-2xl text-red-600 leading-none block">ME!</span>
                 
                 {/* Underline doodle */}
                 <div className="absolute -bottom-2 left-0 w-full h-4 opacity-70">
                    <Doodle type="scribble" className="w-full h-full text-blue-500 rotate-180" />
                 </div>
             </div>
        </div>

        {/* The Stick */}
        <div className="w-4 h-32 bg-[#a16207] border-2 border-stone-800 -mt-2 rounded-sm shadow-sm relative z-0">
            {/* Wood grain details */}
             <div className="absolute top-4 left-1 w-1 h-8 bg-black/10 rounded-full"></div>
             <div className="absolute bottom-6 right-1 w-1 h-6 bg-black/10 rounded-full"></div>
        </div>
        
        {/* Grass / Base at the bottom to hide sticking out */}
        <div className="absolute -bottom-2 w-24 h-8 z-20 pointer-events-none">
             <Doodle type="scribble" className="w-full h-full text-green-600/60 scale-150" />
        </div>
        
         {/* Tooltip */}
      <span className="absolute left-full top-0 ml-2 px-2 py-1 bg-blue-900 text-white text-sm font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg pointer-events-none">
          Let's work together!
      </span>
    </a>
  );
}
