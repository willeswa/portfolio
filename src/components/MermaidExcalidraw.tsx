"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const Excalidraw = dynamic(
  () => import("@excalidraw/excalidraw").then((mod) => mod.Excalidraw),
  { ssr: false }
);

interface MermaidExcalidrawProps {
  code: string;
}

const MermaidExcalidraw: React.FC<MermaidExcalidrawProps> = ({ code }) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-[500px] w-full bg-gray-100 flex items-center justify-center">Loading...</div>;
  }

  const testElement = {
    type: "rectangle",
    version: 1,
    versionNonce: 0,
    isDeleted: false,
    id: "rect-1",
    fillStyle: "hachure",
    strokeWidth: 1,
    strokeStyle: "solid",
    roughness: 1,
    opacity: 100,
    angle: 0,
    x: 100,
    y: 100,
    strokeColor: "#000000",
    backgroundColor: "transparent",
    width: 100,
    height: 100,
    seed: 1,
    groupIds: [],
    roundness: null,
    boundElements: [],
    updated: 1,
    link: null,
    locked: false,
  };

  return (
    <div className="h-[500px] w-full border border-gray-200 rounded-lg overflow-hidden my-8">
      <Excalidraw
        initialData={{
            elements: [testElement as any],
            appState: { viewBackgroundColor: "#ffffff" }
        }}
        viewModeEnabled={true}
      />
    </div>
  );
};

export default MermaidExcalidraw;
