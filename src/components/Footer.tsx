import { MapPin } from "lucide-react";

export default function Footer() {
  return (
    <div className="relative z-10 w-full px-6 py-6 md:px-12 flex justify-between items-end border-t border-white/5 bg-background-dark/30 backdrop-blur-sm mt-auto">
      <div className="flex flex-col gap-1">
        <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold">
          Tech Stack
        </p>
        <div className="flex items-center gap-3 text-xs text-white/60 font-mono">
          <span>React</span>
          <span className="text-primary">•</span>
          <span>Node.js</span>
          <span className="text-primary">•</span>
          <span>TypeScript</span>
          <span className="text-primary">•</span>
          <span>AWS</span>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-8 hidden md:flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
        <div className="w-[1px] h-8 bg-gradient-to-b from-transparent to-primary animate-pulse"></div>
        <span className="text-[10px] uppercase tracking-[0.2em] text-white">
          Scroll
        </span>
      </div>

      <div className="text-right flex flex-col gap-1">
        <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold">
          Location
        </p>
        <p className="text-xs text-white/60 font-mono flex items-center justify-end gap-2">
          Nairobi, Kenya
          <MapPin className="size-[14px] text-primary" />
        </p>
      </div>
    </div>
  );
}
