"use client";

import { RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import mermaid from "mermaid";
import React, { useEffect, useRef, useState } from "react";
import { ReactZoomPanPinchContentRef, TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

mermaid.initialize({
  startOnLoad: false,
  theme: "default",
  securityLevel: "loose",
  fontFamily: "inherit",
});

interface MermaidProps {
  code: string;
}

const Mermaid: React.FC<MermaidProps> = ({ code }) => {
  const ref = useRef<HTMLDivElement>(null);
  const transformRef = useRef<ReactZoomPanPinchContentRef>(null);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (ref.current) {
      mermaid.run({
        nodes: [ref.current],
        suppressErrors: true,
      }).then(() => {
        setIsRendered(true);
      }).catch((err) => console.error("Mermaid failed to render", err));
    }
  }, [code]);

  return (
    <div className="mermaid-container my-8 relative group border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm font-mono">
      <TransformWrapper
        ref={transformRef}
        initialScale={1}
        minScale={0.5}
        maxScale={4}
        centerOnInit={true}
        wheel={{ step: 0.1 }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <div className="absolute top-2 right-2 z-10 flex gap-1 bg-white/90 backdrop-blur-sm p-1 rounded-md shadow border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={() => zoomIn()}
                className="p-1.5 hover:bg-gray-100 rounded text-gray-700"
                title="Zoom In"
              >
                <ZoomIn size={16} />
              </button>
              <button
                onClick={() => zoomOut()}
                className="p-1.5 hover:bg-gray-100 rounded text-gray-700"
                title="Zoom Out"
              >
                <ZoomOut size={16} />
              </button>
              <button
                onClick={() => resetTransform()}
                className="p-1.5 hover:bg-gray-100 rounded text-gray-700"
                title="Reset"
              >
                <RotateCcw size={16} />
              </button>
            </div>
            
            <div className="w-full flex justify-center bg-white p-4 cursor-grab active:cursor-grabbing min-h-[200px]">
                <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full flex items-center justify-center">
                    <div ref={ref} className="mermaid w-full flex justify-center">
                        {code}
                    </div>
                </TransformComponent>
            </div>
          </>
        )}
      </TransformWrapper>
    </div>
  );
};

export default Mermaid;
