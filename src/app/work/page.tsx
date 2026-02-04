"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import Link from "next/link";

export default function WorkPage() {
const experiences = [
    {
      company: "Kamoa App",
      role: "Senior Software Engineer",
      period: "March 2025 - Present",
      location: "Nairobi, Kenya",
      description: [
        "Collaborated with the Product Manager to kickstart a full app revamp, aligning business goals with technical strategy.",
        "Spearheading the development of a secure Partner Portal, enabling external lenders to access internal data.",
        "Designed and implemented robust API authentication and data access layers for external integrations.",
      ],
      stack: ["Typescript", "Serverless AWS", "React Native", "React"],
    },
    {
      company: "Jumba, Inc.",
      role: "Software Engineer II",
      period: "Aug 2023 - Dec 2024",
      location: "Nairobi, Kenya",
      description: [
        "Led the development of Jumba’s cross-platform B2B mobile app, transforming it from MVP to production-ready.",
        "Implemented advanced animations using Reanimated, improving UX and driving up engagement metrics.",
        "Streamlined CI/CD pipelines using GitHub Actions and EAS, cutting down release times.",
        "Set up performance monitoring, error tracking, and analytics instrumentation.",
      ],
      stack: ["React Native", "AWS", "TypeScript", "Expo", "CI/CD"],
    },
    {
      company: "Baobab Circle, Ltd",
      role: "Android Developer",
      period: "Feb 2022 - Aug 2023",
      location: "Remote",
      description: [
        "Owned the Android engineering stack for two consumer-facing healthcare apps.",
        "Led the migration of legacy Java codebases to modern Kotlin, introducing Jetpack Compose and MVVM.",
        "Optimized release workflows, integrating CI/CD for smoother testing and faster deployments.",
      ],
      stack: ["Kotlin", "Jetpack Compose", "MVVM", "CI/CD"],
    },
    {
      company: "Andela, Inc.",
      role: "Software Developer",
      period: "Jan 2019 - Nov 2019",
      location: "Nairobi, Kenya",
      description: [
        "Completed an intensive engineering fellowship, gaining real-world experience across the full stack.",
        "Developed and deployed RESTful APIs with a focus on clean architecture, modularity, and test coverage.",
        "Set up and maintained CI/CD pipelines using GitHub, CircleCI, and Heroku.",
      ],
      stack: ["React", "Node.js", "CI/CD", "PostgreSQL"],
    },
  ];

  return (
    <main className="min-h-screen pt-24 px-6 max-w-5xl mx-auto pb-20">
      <div className="mb-12">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-mono text-gray-500 hover:text-blue-600 transition-colors uppercase tracking-wider mb-8">
            <ArrowLeft className="size-4" /> Return to Base
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-50 mb-4">
            Work History
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
            A timeline of roles, responsibilities, and technical achievements.
        </p>
      </div>

      <div className="flex flex-col relative border-l border-gray-200 dark:border-gray-800 ml-3 md:ml-6 space-y-12">
        {experiences.map((exp, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-8 md:pl-12 group"
          >
             {/* Timeline Dot */}
             <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-gray-200 dark:bg-gray-800 group-hover:bg-blue-500 transition-colors ring-4 ring-white dark:ring-gray-950"></div>
             
             <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                 <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
                    {exp.company}
                 </h2>
                 <span className="font-mono text-xs text-gray-400 shrink-0 flex items-center gap-2">
                    <Calendar size={12} />
                    {exp.period}
                 </span>
             </div>
             
             <div className="mb-4">
                <div className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-1">
                    {exp.role}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-500 font-mono">
                    <MapPin size={12} />
                    {exp.location}
                </div>
             </div>
             
             <ul className="space-y-3 text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {exp.description.map((item, i) => (
                    <li key={i} className="flex gap-3">
                        <span className="text-blue-400 mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"></span>
                        <span>{item}</span>
                    </li>
                ))}
             </ul>
             
             <div className="flex flex-wrap gap-2">
                {exp.stack.map((tech) => (
                    <span key={tech} className="px-2.5 py-1 text-xs font-mono rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                        {tech}
                    </span>
                ))}
             </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
