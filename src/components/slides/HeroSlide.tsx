import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import TechnicalGrid from "../TechnicalGrid";

interface HeroSlideProps {
  onExplore: () => void;
}

const LATEST_ARTICLES = [
  { title: "SokoMesh Whitepaper", id: "sokomesh-whitepaper" },
  { title: "Serverless Patterns", id: "practical-serverless-patterns" },
];

export default function HeroSlide({ onExplore }: HeroSlideProps) {
  return (
    <section className="w-screen h-screen flex flex-col justify-center px-8 md:px-24 max-w-[100vw] relative shrink-0 bg-gray-50 dark:bg-black overflow-hidden">
      
      <TechnicalGrid />
      
      <div className="flex w-full max-w-7xl mx-auto relative z-10 items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="font-mono text-blue-600 dark:text-blue-500 mb-6 tracking-widest text-sm uppercase">
              Senior Software Engineer
            </div>
            <h1 className="font-display text-[12vw] leading-[0.8] font-bold tracking-tighter text-gray-900 dark:text-white mb-8">
              GODFREY<br />
              <span className="text-gray-400 dark:text-gray-700">WANJALA</span>
            </h1>

            <div className="md:w-3/4 text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-mono font-light leading-relaxed mb-12">
              Architecting high-performance <span className="text-gray-900 dark:text-gray-200 font-medium">mobile systems</span> and <span className="text-gray-900 dark:text-gray-200 font-medium">serverless infrastructure</span>.
            </div>

            <div className="flex gap-8 items-center">
              <button onClick={onExplore} className="group flex items-center gap-3 text-lg font-medium font-mono text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Explore Work <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="h-px w-12 bg-gray-300 dark:bg-gray-800"></div>
              <div className="flex gap-6">
                <a href="https://github.com/willeswa/" target="_blank" className="text-gray-400 hover:text-black dark:hover:text-white transition-colors"><Github /></a>
                <a href="http://linkedin.com/in/wanjala-dev" target="_blank" className="text-gray-400 hover:text-blue-600 dark:hover:text-white transition-colors"><Linkedin /></a>
                <a href="mailto:gwiliez@gmail.com" className="text-gray-400 hover:text-black dark:hover:text-white transition-colors"><Mail /></a>
              </div>
            </div>
          </motion.div>

          {/* Latest Signal (Vertical List on Right) */}
          <div className="hidden lg:flex flex-col gap-6 items-start border-l border-gray-200 dark:border-gray-800 pl-8 ml-12">
              <div className="text-xs font-mono text-gray-400 uppercase tracking-widest">Latest Signal</div>
              <div className="flex flex-col gap-4">
                  {LATEST_ARTICLES.map((article) => (
                      <Link key={article.id} href={`/thoughts/${article.id}`} className="group relative pl-4">
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full group-hover:bg-blue-500 transition-colors"></div>
                          <div className="text-sm font-mono text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors">
                              {article.title}
                          </div>
                      </Link>
                  ))}
              </div>
               <Link href="/thoughts" className="text-xs font-mono text-blue-500 hover:underline mt-2">
                   View Archives -&gt;
               </Link>
          </div>
      </div>

    </section>
  );
}
