"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import BlogSlide from "./slides/BlogSlide";
import HeroSlide from "./slides/HeroSlide";
import ProjectSlide from "./slides/ProjectSlide";
import WorkDeckSlide from "./slides/WorkDeckSlide";

export default function HorizontalDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 4;

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) setCurrentSlide(prev => prev + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(prev => prev - 1);
  };

  // Handle wheel for horizontal navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 20) {
        if (e.deltaY > 0) {
          nextSlide();
        } else if (e.deltaY < 0) {
          prevSlide();
        }
      }
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentSlide]);

  // Handle touch for mobile swipe
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };


  return (
    <div 
      className="h-screen w-screen overflow-hidden bg-gray-50 dark:bg-black relative select-none"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >

      {/* Global Coordinates / Context */}
      <div className="fixed top-8 left-8 z-50 font-mono text-xs text-gray-400 uppercase tracking-widest flex items-center gap-4">
        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
        <span className="hidden md:inline">System Online</span>
        <span className="text-gray-600">/</span>
        <span>Slide 0{currentSlide + 1}</span>
      </div>

      {/* Global Navigation Bubbles */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-4">
        {[0, 1, 2, 3].map((idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              currentSlide === idx ? "bg-gray-900 dark:bg-white scale-125" : "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400"
            )}
          />
        ))}
      </div>

      {/* Horizontal Slider Track */}
      <motion.div
        className="flex h-full w-[400vw]"
        animate={{ x: `-${currentSlide * 100}vw` }}
        transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
      >
        <HeroSlide onExplore={nextSlide} />
        <WorkDeckSlide onNext={nextSlide} onPrev={prevSlide} />
        <ProjectSlide onNext={nextSlide} onPrev={prevSlide} />
        <BlogSlide onPrev={prevSlide} />
      </motion.div>
    </div>
  );
}
