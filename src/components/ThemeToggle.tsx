"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isBlueprint, setIsBlueprint] = useState(false);

  useEffect(() => {
    // Check local storage or preference
    const stored = localStorage.getItem("theme");
    if (stored === "blueprint") {
      setIsBlueprint(true);
      document.documentElement.classList.add("blueprint");
    }
  }, []);

  const toggleTheme = () => {
    const newVal = !isBlueprint;
    setIsBlueprint(newVal);
    
    if (newVal) {
      document.documentElement.classList.add("blueprint");
      localStorage.setItem("theme", "blueprint");
    } else {
      document.documentElement.classList.remove("blueprint");
      localStorage.setItem("theme", "paper");
    }
  };

  return (
    <button 
      onClick={toggleTheme}
      className="fixed bottom-6 right-8 z-[100] group"
      aria-label="Toggle Blueprint Mode"
    >
      <div className={`relative p-2 rounded-full border-2 transition-all duration-300 ${isBlueprint ? 'bg-blue-900 border-white text-white' : 'bg-white border-blue-900 text-blue-900'}`}>
         {isBlueprint ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
         
      </div>
      
      <span className="absolute bottom-full right-0 mb-2 text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 px-2 py-1 rounded-sm pointer-events-none">
          {isBlueprint ? "Blueprint Mode" : "Paper Mode"}
      </span>
    </button>
  );
}
