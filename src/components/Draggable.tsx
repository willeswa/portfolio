"use client";

import React, { useEffect, useRef, useState } from "react";

interface DraggableProps {
  children: React.ReactNode;
  className?: string; // Wrapper class
  defaultPosition?: { x: number; y: number };
}

export default function Draggable({ children, className = "", defaultPosition = { x: 0, y: 0 } }: DraggableProps) {
  const [position, setPosition] = useState(defaultPosition);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const positionStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging || !dragStartRef.current || !positionStartRef.current) return;

      const deltaX = e.clientX - dragStartRef.current.x;
      const deltaY = e.clientY - dragStartRef.current.y;

      setPosition({
        x: positionStartRef.current.x + deltaX,
        y: positionStartRef.current.y + deltaY,
      });
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      dragStartRef.current = null;
      positionStartRef.current = null;
    };

    if (isDragging) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
    }

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isDragging]);

  const handlePointerDown = (e: React.PointerEvent) => {
    // Ignore drag if clicking on interactive elements
    const target = e.target as HTMLElement;
    if (target.closest('a') || target.closest('button')) {
        return;
    }

    // Prevent default touch actions (scrolling) only if we are initiating a drag
    e.currentTarget.setPointerCapture(e.pointerId);
    e.preventDefault(); 
    
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    positionStartRef.current = position;
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      className={`touch-none cursor-grab active:cursor-grabbing ${className} ${isDragging ? 'z-50 scale-105 shadow-2xl' : 'z-[5] transition-shadow duration-300'}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: isDragging ? 'none' : undefined, // Critical: disable CSS transitions during drag to prevent lag
      }}
    >
      {children}
    </div>
  );
}
