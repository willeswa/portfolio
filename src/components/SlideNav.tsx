import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface SlideNavProps {
  direction: "prev" | "next";
  label: string;
  onClick: () => void;
  className?: string;
}

export default function SlideNav({ direction, label, onClick, className }: SlideNavProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "absolute bottom-[30vh] z-30 group flex items-center gap-4 text-gray-400 hover:text-black dark:hover:text-white transition-all duration-300",
        direction === "prev" ? "left-8 md:left-12 pr-4 pl-2 hover:-translate-x-2" : "right-8 md:right-12 pl-4 pr-2 hover:translate-x-2",
        className
      )}
    >
      {direction === "prev" && (
        <ArrowLeft size={32} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
      )}
      
      <div className={cn("hidden md:flex flex-col text-left", direction === "next" && "items-end text-right")}>
        <span className="text-[10px] font-mono uppercase tracking-widest opacity-60">
            {direction === "prev" ? "Previous" : "Next"}
        </span>
        <span className="text-sm font-mono font-bold uppercase tracking-wider">
            {label}
        </span>
      </div>

      {direction === "next" && (
        <ArrowRight size={32} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
      )}
    </button>
  );
}
