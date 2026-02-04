"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import SlideNav from "../SlideNav";
import TechnicalGrid from "../TechnicalGrid";

interface WorkDeckSlideProps {
  onNext: () => void;
  onPrev: () => void;
}

// Data Structure (Resume Ingested)
const CAREER_DATA = [
  {
    id: "kamoa",
    role: "Senior Software Engineer",
    company: "Kamoa App",
    year: "2025",
    period: "Mar 2025 - Present",
    location: "Nairobi, Kenya",
    description: "Spearheading the Partner Portal development and architecting secure API layers for external lenders. Leading mobile app revamp strategies.",
    stack: ["TypeScript", "Serverless AWS", "React Native", "React"],
    color: "from-blue-500",
    accent: "text-blue-600 dark:text-blue-500",
    bg: "bg-blue-500",
  },
  {
    id: "jumba",
    role: "Software Engineer II",
    company: "Jumba, Inc.",
    year: "2023",
    period: "Aug 2023 - Dec 2024",
    location: "Nairobi, Kenya",
    description: "Led development of the B2B mobile app for construction supply chain. Implemented advanced animations and streamlined CI/CD pipelines.",
    stack: ["React Native", "AWS", "TypeScript", "Reanimated"],
    color: "from-orange-500",
    accent: "text-orange-600 dark:text-orange-500",
    bg: "bg-orange-500",
  },
  {
    id: "baobab",
    role: "Android Developer",
    company: "Baobab Circle",
    year: "2022",
    period: "Feb 2022 - Aug 2023",
    location: "Remote",
    description: "Owned the Android engineering stack for two healthcare apps. Migrated legacy Java to Kotlin/Compose and improved patient engagement.",
    stack: ["Kotlin", "Jetpack Compose", "MVVM", "CI/CD"],
    color: "from-emerald-500",
    accent: "text-emerald-600 dark:text-emerald-500",
    bg: "bg-emerald-500",
  },
  {
      id: "andela",
      role: "Software Developer",
      company: "Andela",
      year: "2019",
      period: "Jan 2019 - Nov 2019",
      location: "Nairobi, Kenya",
      description: "Completed intensive fellowship. Developed RESTful APIs and maintained CI/CD pipelines while collaborating in agile distributed teams.",
      stack: ["REST API", "CircleCI", "Heroku", "Clean Arch"],
      color: "from-indigo-500",
      accent: "text-indigo-600 dark:text-indigo-500",
      bg: "bg-indigo-500",
  }
];

export default function WorkDeckSlide({ onNext, onPrev }: WorkDeckSlideProps) {
  const [activeId, setActiveId] = useState(CAREER_DATA[0].id);
  const activeRole = CAREER_DATA.find(r => r.id === activeId) || CAREER_DATA[0];

  return (
    <section className="w-screen h-screen flex flex-col relative overflow-hidden shrink-0 perspective-1000 bg-gray-50/50 dark:bg-black/80">
      
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
          <div className={cn("absolute inset-0 transition-opacity duration-1000 opacity-10 dark:opacity-20 bg-gradient-to-br via-transparent to-transparent", activeRole.color)}></div>
          <TechnicalGrid />
      </div>

       {/* Slide Navigation - REPOSITIONED TO BOTTOM */}
      <div className="absolute bottom-6 left-0 w-full px-8 md:px-12 flex justify-between z-30 pointer-events-none">
          <div className="pointer-events-auto">
             <SlideNav direction="prev" label="Identity" onClick={onPrev} className="relative bottom-auto left-auto transform-none hover:transform-none" />
          </div>
          <div className="pointer-events-auto">
             <SlideNav direction="next" label="Projects" onClick={onNext} className="relative bottom-auto right-auto transform-none hover:transform-none" />
          </div>
      </div>

      {/* TOP: Detail Hero (Immersive View) */}
      <div className="flex-1 relative z-10 flex items-center px-16 md:px-32 pt-12 pb-24">
        <AnimatePresence mode="wait">
            <motion.div
                key={activeId}
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                transition={{ duration: 0.5, ease: "circOut" }}
                className="w-full max-w-5xl"
            >
                {/* Holographic Header */}
                <div className="flex items-center gap-4 mb-4 text-sm font-mono tracking-widest uppercase text-gray-400 dark:text-gray-500">
                    <span className={cn("w-2 h-2 rounded-full", activeRole.bg)}></span>
                    <span>System Log // {activeRole.year}</span>
                    <div className="h-px bg-gray-200 dark:bg-gray-800 flex-1"></div>
                    <span>{activeRole.location} <MapPin className="inline w-3 h-3 mb-1" /></span>
                </div>

                <h2 className="text-[5vw] leading-[0.9] font-bold font-mono text-gray-900 dark:text-white mb-6 tracking-tight">
                    {activeRole.company}
                </h2>

                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h3 className={cn("text-2xl md:text-3xl font-medium mb-4 font-mono", activeRole.accent)}>
                            {activeRole.role}
                        </h3>
                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-mono font-light leading-relaxed">
                            {activeRole.description}
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="p-1 px-4 border-l-2 bg-white/50 dark:bg-white/5 backdrop-blur-sm transition-colors duration-500" style={{ borderColor: 'var(--tw-border-opacity, 1) ' + activeRole.color.replace('from-', '') }}>
                             <span className={cn("text-xs font-mono uppercase block mb-2 font-bold", activeRole.accent)}>Technosphere</span>
                            <div className="flex flex-wrap gap-2">
                                {activeRole.stack.map(tech => (
                                    <span key={tech} className="px-3 py-1 rounded-sm border border-gray-200 dark:border-gray-800 text-sm font-mono text-gray-600 dark:text-gray-300 bg-white/50 dark:bg-black/50">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                        
                        <Link href="/work" className="group inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors border-b border-transparent hover:border-gray-900 dark:hover:border-white pb-1 font-mono text-sm">
                            Read Full Case Study <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Link>
                    </div>
                </div>

            </motion.div>
        </AnimatePresence>
      </div>


      {/* MIDDLE: Horizontal Timeline (LIFTED UP) */}
      <div className="h-[20vh] border-t border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-black/90 backdrop-blur-md z-20 flex flex-col justify-center relative mb-24">
         <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
         
         <div className="px-16 md:px-32 flex gap-0 w-full overflow-x-auto no-scrollbar items-center">
            {CAREER_DATA.map((item, idx) => (
                <button
                    key={item.id}
                    onClick={() => setActiveId(item.id)}
                    className={cn(
                        "group relative min-w-[250px] md:min-w-[300px] text-left p-6 transition-all duration-500 border-l border-transparent hover:bg-gray-100 dark:hover:bg-white/5",
                        activeId === item.id ? "bg-gray-50 dark:bg-white/5 border-l-gray-300 dark:border-l-gray-700" : "opacity-50 hover:opacity-100"
                    )}
                >
                     <div className="text-xs font-mono text-gray-400 dark:text-gray-600 mb-2">0{idx + 1}</div>
                     <div className={cn("text-2xl font-bold font-mono transition-colors", activeId === item.id ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-600")}>
                        {item.year}
                     </div>
                     <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 truncate font-mono">{item.company}</div>

                     {/* Active Indicator Line */}
                     {activeId === item.id && (
                        <motion.div 
                            layoutId="activeGlow"
                            className={cn("absolute bottom-0 left-0 w-full h-1", activeRole.bg)}
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
