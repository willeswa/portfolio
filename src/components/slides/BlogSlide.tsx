"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Quote } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import SlideNav from "../SlideNav";
import TechnicalGrid from "../TechnicalGrid";

interface BlogSlideProps {
  onPrev: () => void;
}

// Data Structure (Articles - Only Existing)
const BLOG_DATA = [
  {
    id: "sokomesh-whitepaper",
    title: "SokoMesh Whitepaper",
    subtitle: "Decentralized Connectivity",
    date: "Oct 2024",
    readTime: "15 min read",
    excerpt: "Exploring the architectural challenges of building mesh networks for offline-first peer-to-peer marketplaces in emerging economies.",
    tags: ["Distributed Systems", "Mesh", "Rust"],
    color: "from-pink-500",
    accent: "text-pink-600 dark:text-pink-500",
    bg: "bg-pink-500",
  },
  {
    id: "practical-serverless-patterns",
    title: "Serverless Patterns",
    subtitle: "Event-Driven EDA",
    date: "Aug 2024",
    readTime: "8 min read",
    excerpt: "A deep dive into idempotency keys, dead letter queues, and saga patterns when orchestrating Lambdas and EventBridge.",
    tags: ["AWS", "Serverless", "Architecture"],
    color: "from-teal-500",
    accent: "text-teal-600 dark:text-teal-500",
    bg: "bg-teal-500",
  }
];

export default function BlogSlide({ onPrev }: BlogSlideProps) {
  const [activeId, setActiveId] = useState(BLOG_DATA[0].id);
  const activePost = BLOG_DATA.find(p => p.id === activeId) || BLOG_DATA[0];

  return (
    <section className="w-screen h-screen flex flex-col relative overflow-hidden shrink-0 perspective-1000 bg-gray-50/50 dark:bg-black/80">
      
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
          <div className={cn("absolute inset-0 transition-opacity duration-1000 opacity-10 dark:opacity-20 bg-gradient-to-br via-transparent to-transparent", activePost.color)}></div>
          <TechnicalGrid />
      </div>

       {/* Slide Navigation - REPOSITIONED TO BOTTOM */}
      <div className="absolute bottom-6 left-0 w-full px-8 md:px-12 flex justify-between z-30 pointer-events-none">
          <div className="pointer-events-auto">
             <SlideNav direction="prev" label="Projects" onClick={onPrev} className="relative bottom-auto left-auto transform-none hover:transform-none" />
          </div>
      </div>


      {/* TOP: Detail Hero */}
      <div className="flex-1 relative z-10 flex items-center px-16 md:px-32 pt-12 pb-24">
        <AnimatePresence mode="wait">
            <motion.div
                key={activeId}
                initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-5xl"
            >
                <div className="flex items-center gap-4 mb-6 text-sm font-mono tracking-widest uppercase text-gray-400 dark:text-gray-500">
                    <span className={cn("w-2 h-2 rounded-full", activePost.bg)}></span>
                    <span>Transmission // {activePost.date}</span>
                </div>

                <h1 className="text-[5vw] leading-[1] font-bold font-mono text-gray-900 dark:text-white mb-6">
                    {activePost.title}
                </h1>
                
                <div className="flex items-center gap-6 mb-8">
                     <div className={cn("text-xl font-mono", activePost.accent)}>{activePost.subtitle}</div>
                     <div className="px-3 py-1 rounded-full border border-gray-200 dark:border-gray-800 text-xs font-mono text-gray-500 uppercase">{activePost.readTime}</div>
                </div>

                <div className="max-w-2xl">
                     <p className="text-xl text-gray-600 dark:text-gray-400 font-mono font-light leading-relaxed mb-8 border-l-4 border-gray-200 dark:border-gray-800 pl-6 italic">
                        "{activePost.excerpt}"
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                        {activePost.tags.map(tag => (
                            <span key={tag} className="text-xs font-mono text-gray-400 mr-4">#{tag}</span>
                        ))}
                    </div>

                    <Link href={`/thoughts/${activePost.id}`} className="group inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-black font-mono rounded-full transition-transform hover:scale-105">
                        Read Article <BookOpen className="w-4 h-4 ml-2" />
                    </Link>
                </div>
            </motion.div>
        </AnimatePresence>
      </div>


      {/* MIDDLE: Horizontal List (Matches WorkDeck Style) */}
      <div className="h-[20vh] border-t border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-black/90 backdrop-blur-md z-20 flex flex-col justify-center relative mb-24">
         <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
         
         <div className="px-16 md:px-32 flex gap-0 w-full overflow-x-auto no-scrollbar items-center">
            {BLOG_DATA.map((item, idx) => (
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
                        <Quote className={cn("w-4 h-4", activeId === item.id ? item.accent : "text-gray-400")} />
                     </div>
                     
                     <div className={cn("text-lg font-bold font-mono transition-colors line-clamp-1", activeId === item.id ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400")}>
                        {item.title}
                     </div>
                     <div className="text-xs text-gray-500 dark:text-gray-500 mt-1 font-mono">{item.subtitle}</div>

                      {/* Active Indicator Line */}
                      {activeId === item.id && (
                        <motion.div 
                            layoutId="activeBlogGlow"
                            className={cn("absolute bottom-0 left-0 w-full h-1", activePost.bg)}
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
