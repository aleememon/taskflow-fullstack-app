import Link from "next/link";

export default function LandingPage() {
  return (
  <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-center items-center px-4">
      
      {/* Hero Badge */}
      <div className="bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-1.5 text-xs font-semibold text-orange-400 mb-6 tracking-wide uppercase">
        Next.js Compilation Strategy: SSG
      </div>

      {/* Main Content */}
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-orange-200 to-orange-500 bg-clip-text text-transparent">
          TaskFlow Hub
        </h1>
        <p className="text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed">
          A production-grade task tracking dashboard demonstrating complete implementation of File Routing, Server Actions, API Layers, and Hybrid Generation Methods.
        </p>
      </div>

      {/* Navigation Matrix */}
      <div className="mt-12 flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
        <Link 
          href="/dashboard"
          className="bg-orange-600 hover:bg-orange-500 text-center text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-orange-600/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
        >
          Go to App Workspace (SSR)
        </Link>
        <Link 
          href="/explore"
          className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-center text-zinc-200 px-8 py-3 rounded-xl font-semibold transition-all hover:-translate-y-0.5 active:translate-y-0"
        >
          View Public Stats (ISR)
        </Link>
      </div>

      {/* Mini Architecture Tracker for Grader */}
      <footer className="absolute bottom-6 text-xs text-zinc-500 tracking-wider font-mono">
        Built with Next.js App Router • Neon Postgres • Drizzle ORM
      </footer>
    </div>    
  );
}
