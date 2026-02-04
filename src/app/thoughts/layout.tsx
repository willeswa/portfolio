import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ThoughtsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen pt-24 px-6 max-w-4xl mx-auto pb-20 font-[family-name:var(--font-space)]">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-wider mb-12 no-underline">
            <ArrowLeft className="w-4 h-4" /> Return to Base
        </Link>
        <div className="prose prose-lg dark:prose-invert prose-headings:font-[family-name:var(--font-space)]">
            {children}
        </div>
    </div>
  );
}
