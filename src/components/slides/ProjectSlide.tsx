"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, BrainCircuit, CreditCard, FileText } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import SlideNav from "../SlideNav";
import TechnicalGrid from "../TechnicalGrid";

interface ProjectSlideProps {
  onNext: () => void;
  onPrev: () => void;
}

// Data Structure (Real Projects)
const PROJECT_DATA = [
  {
    id: "wealthwise",
    title: "WealthWise",
    subtitle: "AI-Powered Personal Finance",
    category: "Fintech / AI",
    description: "A cross-platform app automating personal finance decisions using Gemini AI. Features budgeting, spending tracking, and personalized insights.",
    stack: ["React Native", "Expo", "Gemini AI", "React"],
    icon: BrainCircuit,
    color: "from-purple-500",
    accent: "text-purple-600 dark:text-purple-500",
    bg: "bg-purple-500",
  },
  {
    id: "somadocs",
    title: "SomaDocs",
    subtitle: "RAG Document Assistant",
    category: "AI / Productivity",
    description: "Intelligent document assistant using Retrieval-Augmented Generation (RAG). Reads and interprets uploaded docs for Q&A.",
    stack: ["Next.js", "LangChain", "OpenAI", "React"],
    icon: FileText,
    color: "from-blue-500",
    accent: "text-blue-600 dark:text-blue-500",
    bg: "bg-blue-500",
  },
  {
      id: "ping-mybills",
      title: "Ping Mybills",
      subtitle: "Expense Tracker",
      category: "Android Mobile",
      description: "Cleanly architected Android app for managing bills and expenses. Leverages Hilt, Room, and Jetpack Compose.",
      stack: ["Kotlin", "Jetpack Compose", "MVVM", "Room"],
      icon: CreditCard,
      color: "from-emerald-500",
      accent: "text-emerald-600 dark:text-emerald-500",
      bg: "bg-emerald-500",
  }
];

export default function ProjectSlide({ onNext, onPrev }: ProjectSlideProps) {
  const [activeId, setActiveId] = useState(PROJECT_DATA[0].id);
  const activeProject = PROJECT_DATA.find(p => p.id === activeId) || PROJECT_DATA[0];
  const Icon = activeProject.icon;

  return (
    <section className="w-screen h-screen flex flex-col relative overflow-hidden shrink-0 perspective-1000 bg-gray-50/50 dark:bg-black/80">
      
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
          <div className={cn("absolute inset-0 transition-opacity duration-1000 opacity-10 dark:opacity-20 bg-gradient-to-br via-transparent to-transparent", activeProject.color)}></div>
          <TechnicalGrid />
      </div>

       {/* Slide Navigation - REPOSITIONED TO BOTTOM */}
      <div className="absolute bottom-6 left-0 w-full px-8 md:px-12 flex justify-between z-30 pointer-events-none">
          <div className="pointer-events-auto">
             <SlideNav direction="prev" label="Career" onClick={onPrev} className="relative bottom-auto left-auto transform-none hover:transform-none" />
          </div>
          <div className="pointer-events-auto">
             <SlideNav direction="next" label="Articles" onClick={onNext} className="relative bottom-auto right-auto transform-none hover:transform-none" />
          </div>
      </div>


      {/* TOP: Detail Hero */}
      <div className="flex-1 relative z-10 flex items-center px-16 md:px-32 pt-12 pb-24">
        <AnimatePresence mode="wait">
            <motion.div
                key={activeId}
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-6xl"
            >
                <div className="flex items-center gap-4 mb-6 text-sm font-mono tracking-widest uppercase text-gray-400 dark:text-gray-500">
                    <span className={cn("w-2 h-2 rounded-full", activeProject.bg)}></span>
                    <span>Project Node // {activeProject.category}</span>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7">
                        <h2 className="text-[5vw] leading-[0.9] font-bold font-mono text-gray-900 dark:text-white mb-6 tracking-tight">
                            {activeProject.title}
                        </h2>
                        <h3 className={cn("text-2xl font-mono mb-6", activeProject.accent)}>
                            {activeProject.subtitle}
                        </h3>
                         <p className="text-xl text-gray-600 dark:text-gray-400 font-mono font-light leading-relaxed mb-8">
                            {activeProject.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-8">
                            {activeProject.stack.map(tech => (
                                <span key={tech} className="px-3 py-1 rounded-sm border border-gray-200 dark:border-gray-800 text-sm font-mono text-gray-600 dark:text-gray-300 bg-white/50 dark:bg-black/50">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <Link href={`/projects/${activeProject.id}`} className="group inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-black font-mono rounded-full transition-transform hover:scale-105">
                            View Deployment <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Right Side Visual/Icon */}
                    <div className="hidden lg:flex lg:col-span-5 justify-center">
                        <div className={cn("w-64 h-64 rounded-2xl flex items-center justify-center bg-gradient-to-br opacity-50 backdrop-blur-3xl", activeProject.color.replace('from-', 'from-').replace('500', '500/20 to-transparent'))}>
                            <Icon size={120} className={cn("opacity-80", activeProject.accent)} />
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
      </div>


      {/* MIDDLE: Horizontal List (Matches WorkDeck Style) */}
      <div className="h-[20vh] border-t border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-black/90 backdrop-blur-md z-20 flex flex-col justify-center relative mb-24">
         <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
         
         <div className="px-16 md:px-32 flex gap-0 w-full overflow-x-auto no-scrollbar items-center">
            {PROJECT_DATA.map((item, idx) => (
                <button
                    key={item.id}
                    onClick={() => setActiveId(item.id)}
                    className={cn(
                        "group relative min-w-[300px] text-left p-6 transition-all duration-300 border-l border-transparent hover:bg-gray-100 dark:hover:bg-white/5",
                        activeId === item.id ? "bg-gray-50 dark:bg-white/5 border-l-gray-300 dark:border-l-gray-700" : "opacity-50 hover:opacity-100"
                    )}
                >
                     <div className="flex justify-between items-start mb-2">
                        <div className="text-xs font-mono text-gray-400 dark:text-gray-600">0{idx + 1}</div>
                        <item.icon className={cn("w-4 h-4", activeId === item.id ? item.accent : "text-gray-400")} />
                     </div>
                     
                     <div className={cn("text-xl font-bold font-mono transition-colors", activeId === item.id ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400")}>
                        {item.title}
                     </div>
                     <div className="text-xs text-gray-500 dark:text-gray-500 mt-1 font-mono">{item.category}</div>

                      {/* Active Indicator Line */}
                      {activeId === item.id && (
                        <motion.div 
                            layoutId="activeProjectGlow"
                            className={cn("absolute bottom-0 left-0 w-full h-1", activeProject.bg)}
                        />
                     )}
                </button>
            ))}
            <div className="w-24 shrink-0"></div>
         </div>
      </div>

    </section>
  );
}
