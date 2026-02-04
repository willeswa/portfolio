"use client";

import SpotlightCard from "@/components/SpotlightCard";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Link from "next/link";

export default function ProjectsPage() {
  const projects = [
    {
      title: "SokoMesh",
      description: "An offline-first marketplace protocol enabling commerce in disconnected environments via P2P Bluetooth mesh.",
      tech: ["Android", "Kotlin", "Bluetooth Low Energy", "Room DB"],
      links: {
        demo: "/thoughts/sokomesh-whitepaper", // Linking to whitepaper since it's an internal project
      }
    },
    {
        title: "Kamoa Partner Portal",
        description: "Secure B2B gateway allowing external lenders to integrate with Kamoa's credit scoring engine.",
        tech: ["Next.js", "AWS API Gateway", "Cognito", "DynamoDB"],
        links: {
            // demo: "https://kamoa.app" 
        }
    },
    {
      title: "Jumba Supply Chain",
      description: "Cross-platform mobile application for construction material procurement and delivery tracking.",
      tech: ["React Native", "Expo", "Reanimated", "Supabase"],
      links: {
        demo: "https://jumba.com"
      }
    },
     {
      title: "Portfolio v1",
      description: "My previous personal website exploring 'sketchbook' aesthetics and interactive draggable components.",
      tech: ["Next.js", "Tailwind", "Framer Motion"],
      links: {
        repo: "https://github.com/willeswa/portfolio"
      }
    }
  ];

  return (
    <main className="min-h-screen pt-24 px-6 max-w-6xl mx-auto pb-20">
       <div className="mb-12">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-mono text-gray-500 hover:text-blue-600 transition-colors uppercase tracking-wider mb-8">
            <ArrowLeft className="size-4" /> Return to Base
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-50 mb-4">
            Built Projects
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
            Selected engineering works and architectural implementations.
        </p>
      </div>

      <motion.div 
        initial="initial"
        animate="animate"
        variants={{
          animate: { transition: { staggerChildren: 0.1 } }
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {projects.map((project, index) => (
          <motion.div key={index} variants={{
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 }
          }} className="h-full">
            <SpotlightCard className="h-full p-6 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {project.title}
                    </h2>
                </div>
                <div className="flex gap-3">
                    {project.links.repo && (
                        <a href={project.links.repo} target="_blank" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors relative z-10">
                            <Github size={18} />
                        </a>
                    )}
                        {project.links.demo && (
                        <a href={project.links.demo} target="_blank" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative z-10">
                            <ExternalLink size={18} />
                        </a>
                    )}
                </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-grow leading-relaxed">
                    {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((t) => (
                        <span key={t} className="px-2 py-1 text-xs font-mono bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded border border-gray-200 dark:border-gray-700">
                            {t}
                        </span>
                    ))}
                </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}
