"use client";

import { useEffect, useRef } from "react";

export default function InkCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const pointsRef = useRef<{ x: number; y: number; age: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener("resize", updateSize);

    const onMouseMove = (e: MouseEvent) => {
      positionRef.current = { x: e.clientX, y: e.clientY };
      pointsRef.current.push({ x: e.clientX, y: e.clientY, age: 0 });
    };
    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw points
      ctx.beginPath();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      
        for (let i = 0; i < pointsRef.current.length; i++) {
        const point = pointsRef.current[i];
        point.age += 1;
        
        if (point.age > 15) { // Shorter trail (was 40)
            pointsRef.current.splice(i, 1);
            i--;
            continue;
        }
      }

      // Get current ink color from CSS variable for theme support
      const style = getComputedStyle(document.body);
      const inkColor = style.getPropertyValue('--color-ink').trim() || '#0044cc';

      if (pointsRef.current.length > 1) {
        ctx.beginPath();
        // Move to the first point
        ctx.moveTo(pointsRef.current[0].x, pointsRef.current[0].y);

        for (let i = 1; i < pointsRef.current.length; i++) {
            const point = pointsRef.current[i];
             // Initial opacity is high, fades out as age increases
            const opacity = 1 - (point.age / 15);
            ctx.lineWidth = 2 * opacity; // Thinner line (was 3)
             // Use dynamic color with opacity
             // We need to convert hex/named highlight to rgba if possible, 
             // but simpler is to rely on the fact most browsers support #RRGGBBAA or using canvas globalAlpha
             
             // Simplest robust way: set globalAlpha and strokeStyle separately
             ctx.globalAlpha = opacity;
             ctx.strokeStyle = inkColor;
             
            ctx.lineTo(point.x, point.y);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", updateSize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
        ref={canvasRef} 
        className="pointer-events-none fixed inset-0 z-50"
    />
  );
}
