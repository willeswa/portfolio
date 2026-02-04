import Link from "next/link";

export default function ThoughtsPage() {
  return (
    <div className="w-full">

      
      <h1 className="text-6xl font-black mb-16 underline decoration-4 decoration-purple-400 decoration-2 underline-offset-8 rotate-1 tracking-tight">
        Thoughts
      </h1>
      
      <div className="grid gap-10">
        {/* Post 1 */}
        <Link href="/thoughts/practical-serverless-patterns" className="group block rotate-1 hover:rotate-0 transition-transform pl-4 border-l-4 border-purple-200 hover:border-purple-400 pl-4 py-2">
            <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-1 gap-2">
                 <h2 className="text-3xl font-black group-hover:text-blue-800 transition-colors uppercase tracking-tight transform -skew-x-3">Mastering Serverless Patterns</h2>
                 <span className="font-bold text-xl text-red-400 rotate-[-2deg]">Jan 8, 2026</span>
            </div>
            <p className="text-2xl opacity-90 mt-2 leading-none text-blue-900/80 font-medium">
                Taming DynamoDB Streams with TypeScript: Singleton, Adapter, and Observer.
            </p>
        </Link>

        {/* Post 2 */}
        <Link href="/thoughts/sokomesh-whitepaper" className="group block rotate-[-1deg] hover:rotate-0 transition-transform pl-4 border-l-4 border-blue-200 hover:border-blue-400 pl-4 py-2">
            <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-1 gap-2">
                 <h2 className="text-3xl font-black group-hover:text-blue-800 transition-colors uppercase tracking-tight transform -skew-x-3">SokoMesh Whitepaper</h2>
                 <span className="font-bold text-xl text-red-400 rotate-[-2deg]">Jan 25, 2025</span>
            </div>
            <p className="text-2xl opacity-90 mt-2 leading-none text-blue-900/80 font-medium">
                A Decentralized Offline-First Marketplace for Last-Mile Commerce.
            </p>
        </Link>
      </div>
    </div>
  );
}
